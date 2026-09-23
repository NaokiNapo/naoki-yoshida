import { createHash, randomBytes } from "node:crypto";
import { failureMessage, isEmail, validateContact } from "./contact.ts";

type Environment = {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  NODE_ENV?: string;
  VERCEL?: string;
};
type Dependencies = {
  env: () => Environment;
  fetch: typeof globalThis.fetch;
  now?: () => number;
};
const recipient = "naoki25napo@gmail.com";
const maxBytes = 32768;
const windowMs = 10 * 60 * 1000;
const maxAttempts = 5;
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ] ?? character,
  );
}
async function readLimitedJson(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > maxBytes)
    throw new RangeError("body");
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RangeError("body");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(body)) as unknown;
}
export function createContactHandler(dependencies: Dependencies) {
  // Best-effort, per-instance limit. No external database or persistent IP storage.
  const attempts = new Map<string, { count: number; expires: number }>();
  const salt = randomBytes(16).toString("hex");
  const now = dependencies.now ?? Date.now;
  const reply = (
    body: Record<string, unknown>,
    status = 200,
    headers?: Record<string, string>,
  ) =>
    Response.json(body, {
      status,
      headers: { "Cache-Control": "no-store", ...headers },
    });
  return async function handleContact(request: Request): Promise<Response> {
    const origin = request.headers.get("origin");
    const requestUrl = new URL(request.url);
    const requestHost = request.headers.get("host") || requestUrl.host;
    const expectedOrigin = `${requestUrl.protocol}//${requestHost}`;
    if (
      origin !== expectedOrigin ||
      request.headers.get("sec-fetch-site") === "cross-site"
    )
      return reply({ message: failureMessage }, 403);
    if (!request.headers.get("content-type")?.startsWith("application/json"))
      return reply({ message: failureMessage }, 415);
    const env = dependencies.env();
    const address =
      env.VERCEL === "1"
        ? request.headers
            .get("x-vercel-forwarded-for")
            ?.split(",")[0]
            ?.trim() || "unknown"
        : "local";
    const key = createHash("sha256")
      .update(salt + address)
      .digest("hex");
    const time = now();
    for (const [id, item] of attempts)
      if (item.expires <= time) attempts.delete(id);
    const previous = attempts.get(key);
    if (previous && previous.count >= maxAttempts)
      return reply(
        { message: "続けて送信されています。10分ほどおいてお試しください。" },
        429,
        {
          "Retry-After": String(
            Math.max(1, Math.ceil((previous.expires - time) / 1000)),
          ),
        },
      );
    if (!previous && attempts.size >= 5000)
      return reply({ message: failureMessage }, 429, { "Retry-After": "600" });
    attempts.set(key, {
      count: (previous?.count ?? 0) + 1,
      expires: previous?.expires ?? time + windowMs,
    });
    let input: unknown;
    try {
      input = await readLimitedJson(request);
    } catch (error) {
      return reply(
        { message: "入力内容を確認して、もう一度お試しください。" },
        error instanceof RangeError ? 413 : 400,
      );
    }
    const { fields, errors, valid } = validateContact(input);
    // Bots receive a harmless acknowledgement; no email is sent.
    if (fields.website) return reply({ ok: true });
    if (!valid)
      return reply({ message: "入力内容を確認してください。", errors }, 400);
    if (!/^[a-f0-9-]{36}$/i.test(fields.requestId))
      return reply(
        { message: "ページを再読み込みして、もう一度お試しください。" },
        400,
      );
    const apiKey = env.RESEND_API_KEY?.trim();
    const sender = env.CONTACT_FROM_EMAIL?.trim();
    if (!apiKey || !sender || !isEmail(sender))
      return reply(
        {
          message:
            env.NODE_ENV === "development"
              ? "メール送信設定がまだ完了していません。"
              : failureMessage,
          code: "not_configured",
        },
        503,
      );
    const lines = [
      ["お名前", fields.name],
      ["メールアドレス", fields.email],
      ["会社名 / 屋号", fields.company || "未記入"],
      ["相談したい内容", fields.topic],
      ["メッセージ", fields.message],
    ];
    const payload = {
      from: `Naoki Yoshida Website <${sender}>`,
      to: [recipient],
      reply_to: fields.email,
      subject: `ホームページからのご相談：${fields.topic}`,
      text: lines.map(([label, value]) => `${label}\n${value}`).join("\n\n"),
      html:
        "<h1>ホームページからのお問い合わせ</h1>" +
        lines
          .map(
            ([label, value]) =>
              "<h2>" +
              label +
              "</h2><p>" +
              escapeHtml(value).replace(/\r?\n/g, "<br />") +
              "</p>",
          )
          .join(""),
    };
    const idempotency = createHash("sha256")
      .update(fields.requestId + JSON.stringify(payload))
      .digest("hex");
    try {
      const response = await dependencies.fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Idempotency-Key": `contact/${idempotency}`,
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000),
        },
      );
      if (!response.ok) return reply({ message: failureMessage }, 502);
      const data = (await response.json()) as { id?: unknown };
      if (typeof data.id !== "string" || !data.id)
        return reply({ message: failureMessage }, 502);
      return reply({ ok: true });
    } catch {
      return reply({ message: failureMessage }, 502);
    }
  };
}
