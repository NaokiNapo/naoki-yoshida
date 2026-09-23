import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler, escapeHtml } from "../lib/contact-handler.ts";
import { validateContact } from "../lib/contact.ts";

const valid = {
  name: "フォーム動作確認",
  email: "visitor@example.com",
  company: "",
  topic: "その他",
  message: "これは送信処理の単体テストです。",
  website: "",
  requestId: "12345678-1234-4234-8234-123456789abc",
};
const configured = {
  RESEND_API_KEY: "unit-test-placeholder",
  CONTACT_FROM_EMAIL: "sender@example.com",
  NODE_ENV: "test",
};
function request(
  input: unknown = valid,
  overrides: Record<string, string> = {},
) {
  return new Request("https://site.example/api/contact", {
    method: "POST",
    headers: {
      origin: "https://site.example",
      "content-type": "application/json",
      ...overrides,
    },
    body: JSON.stringify(input),
  });
}
const neverSend: typeof fetch = async () => {
  throw new Error("Unexpected network request");
};

test("required fields, invalid email, unknown topic and oversized values are rejected", () => {
  for (const changed of [
    { name: "" },
    { email: "bad" },
    { email: "a@b.com\r\nBcc: other@example.com" },
    { topic: "unknown" },
    { message: "" },
    { message: "a".repeat(5001) },
    { company: "a".repeat(151) },
    { name: "a".repeat(101) },
    { email: "x\0@y.com" },
  ]) {
    assert.equal(validateContact({ ...valid, ...changed }).valid, false);
  }
  assert.equal(
    validateContact({ ...valid, message: "a".repeat(5000) }).valid,
    true,
  );
  assert.equal(validateContact(null).valid, false);
});
test("all special HTML characters are escaped", () => {
  assert.equal(
    escapeHtml("<script>\"&'</script>"),
    "&lt;script&gt;&quot;&amp;&#39;&lt;/script&gt;",
  );
});
test("successful send fixes recipient, escapes HTML, sets reply-to and idempotency", async () => {
  const calls: { url: unknown; options: RequestInit | undefined }[] = [];
  const handler = createContactHandler({
    env: () => configured,
    fetch: async (url, options) => {
      calls.push({ url, options });
      return Response.json({ id: "test-message-id" });
    },
  });
  const payload = {
    ...valid,
    name: '<img src=x onerror="alert(1)">',
    message: "first\n<script>alert(1)</script>",
    to: "attacker@example.com",
  };
  const response = await handler(request(payload));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  const sent = JSON.parse(String(calls[0].options?.body));
  assert.deepEqual(sent.to, ["naoki25napo@gmail.com"]);
  assert.equal(sent.reply_to, valid.email);
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.equal(sent.from, "Naoki Yoshida Website <sender@example.com>");
  assert.ok(!sent.html.includes("<script>"));
  assert.ok(sent.html.includes("&lt;script&gt;"));
  assert.ok(sent.html.includes("<br />"));
  assert.ok(sent.text.includes("<script>"));
  await handler(request(payload));
  assert.equal(
    new Headers(calls[0].options?.headers).get("Idempotency-Key"),
    new Headers(calls[1].options?.headers).get("Idempotency-Key"),
  );
  await handler(request({ ...payload, message: "Changed content" }));
  assert.notEqual(
    new Headers(calls[1].options?.headers).get("Idempotency-Key"),
    new Headers(calls[2].options?.headers).get("Idempotency-Key"),
  );
});
test("invalid fields do not call Resend", async () => {
  const response = await createContactHandler({
    env: () => configured,
    fetch: neverSend,
  })(request({ ...valid, email: "invalid" }));
  assert.equal(response.status, 400);
  assert.ok((await response.json()).errors.email);
});
test("honeypot acknowledges without sending", async () => {
  const response = await createContactHandler({
    env: () => configured,
    fetch: neverSend,
  })(request({ ...valid, website: "bot.example" }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
});
test("cross-origin and missing origin are rejected", async () => {
  const handler = createContactHandler({
    env: () => configured,
    fetch: neverSend,
  });
  assert.equal(
    (await handler(request(valid, { origin: "https://other.example" }))).status,
    403,
  );
  assert.equal(
    (await handler(request(valid, { "sec-fetch-site": "cross-site" }))).status,
    403,
  );
  const missing = request();
  missing.headers.delete("origin");
  assert.equal((await handler(missing)).status, 403);
});
test("wrong content type and malformed JSON are rejected", async () => {
  const handler = createContactHandler({
    env: () => configured,
    fetch: neverSend,
  });
  assert.equal(
    (await handler(request(valid, { "content-type": "text/plain" }))).status,
    415,
  );
  const malformed = new Request("https://site.example/api/contact", {
    method: "POST",
    headers: {
      origin: "https://site.example",
      "content-type": "application/json",
    },
    body: "{",
  });
  assert.equal((await handler(malformed)).status, 400);
});
test("body limit is enforced without trusting content-length", async () => {
  const handler = createContactHandler({
    env: () => configured,
    fetch: neverSend,
  });
  assert.equal(
    (await handler(request({ ...valid, message: "x".repeat(33000) }))).status,
    413,
  );
  assert.equal(
    (await handler(request(valid, { "content-length": "50000" }))).status,
    413,
  );
});
test("request id is validated before sending", async () => {
  const handler = createContactHandler({
    env: () => configured,
    fetch: neverSend,
  });
  assert.equal(
    (await handler(request({ ...valid, requestId: "bad" }))).status,
    400,
  );
});
test("missing configuration is recoverable and development message is explicit", async () => {
  const development = createContactHandler({
    env: () => ({ NODE_ENV: "development" }),
    fetch: neverSend,
  });
  const response = await development(request());
  assert.equal(response.status, 503);
  assert.equal(
    (await response.json()).message,
    "メール送信設定がまだ完了していません。",
  );
  const production = createContactHandler({
    env: () => ({ NODE_ENV: "production" }),
    fetch: neverSend,
  });
  assert.equal((await production(request())).status, 503);
});
test("invalid sender configuration never sends", async () => {
  const handler = createContactHandler({
    env: () => ({ ...configured, CONTACT_FROM_EMAIL: "invalid" }),
    fetch: neverSend,
  });
  assert.equal((await handler(request())).status, 503);
});
test("provider errors, invalid response and timeouts do not report success", async () => {
  for (const provider of [
    async () =>
      Response.json({ message: "provider private details" }, { status: 403 }),
    async () => Response.json({}),
    async () => {
      throw new DOMException("timed out", "TimeoutError");
    },
  ]) {
    const response = await createContactHandler({
      env: () => configured,
      fetch: provider,
    })(request());
    assert.equal(response.status, 502);
    assert.ok(!(await response.text()).includes("provider private details"));
  }
});
test("rate limiting blocks the sixth request and expires", async () => {
  let clock = 0;
  const handler = createContactHandler({
    env: () => ({}),
    fetch: neverSend,
    now: () => clock,
  });
  for (let i = 0; i < 5; i++)
    assert.equal((await handler(request())).status, 503);
  const limited = await handler(request());
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("Retry-After"), "600");
  clock = 600001;
  assert.equal((await handler(request())).status, 503);
});
test("Vercel addresses receive independent limits", async () => {
  const handler = createContactHandler({
    env: () => ({ VERCEL: "1" }),
    fetch: neverSend,
  });
  for (let i = 0; i < 5; i++)
    await handler(request(valid, { "x-vercel-forwarded-for": "192.0.2.1" }));
  assert.equal(
    (await handler(request(valid, { "x-vercel-forwarded-for": "192.0.2.1" })))
      .status,
    429,
  );
  assert.equal(
    (await handler(request(valid, { "x-vercel-forwarded-for": "192.0.2.2" })))
      .status,
    503,
  );
});

test("uses the incoming Host when Next.js normalizes the internal URL", async () => {
  const handler = createContactHandler({
    env: () => ({ NODE_ENV: "development" }),
    fetch: neverSend,
  });
  const response = await handler(
    request(valid, {
      origin: "https://preview.example",
      host: "preview.example",
    }),
  );
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, "not_configured");
  assert.equal(
    (
      await handler(
        request(valid, {
          origin: "https://evil.example",
          host: "preview.example",
        }),
      )
    ).status,
    403,
  );
});
