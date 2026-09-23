"use client";
import { useRef, useState, type FormEvent } from "react";
import {
  contactLimits,
  contactTopics,
  failureMessage,
  successMessage,
  validateContact,
  type ContactErrors,
} from "../lib/contact";
import Icon from "./Icon";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const requestId = useRef("");
  const sending = useRef(false);
  const notice = useRef<HTMLDivElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const input = Object.fromEntries(new FormData(form));
    const checked = validateContact(input);
    setErrors(checked.errors);
    if (!checked.valid) {
      setStatus("error");
      setMessage("入力内容を確認してください。");
      const field = form.elements.namedItem(Object.keys(checked.errors)[0]);
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    sending.current = true;
    setStatus("sending");
    setMessage("");
    try {
      requestId.current ||= crypto.randomUUID();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checked.fields,
          requestId: requestId.current,
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: ContactErrors;
      };
      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatus("error");
        setMessage(result.message || failureMessage);
      } else {
        setStatus("success");
        setMessage(successMessage);
        form.reset();
        requestId.current = "";
      }
    } catch {
      setStatus("error");
      setMessage(failureMessage);
    } finally {
      sending.current = false;
      requestAnimationFrame(() =>
        notice.current?.focus({ preventScroll: true }),
      );
    }
  }
  const fieldError = (name: keyof ContactErrors) =>
    errors[name] ? (
      <p className="field-error" id={`${name}-error`}>
        {errors[name]}
      </p>
    ) : null;
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      noValidate
      aria-label="お問い合わせフォーム"
    >
      <div className="form-heading">
        <span>ご相談フォーム</span>
        <small>
          <span aria-hidden="true">＊</span> 必須項目
        </small>
      </div>
      <fieldset disabled={status === "sending"}>
        <legend className="sr-only">ご相談の内容</legend>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="contact-name">
              お名前 <span aria-hidden="true">＊</span>
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={contactLimits.name}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {fieldError("name")}
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">
              メールアドレス <span aria-hidden="true">＊</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={contactLimits.email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {fieldError("email")}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="contact-company">
            会社名 / 屋号 <small>任意</small>
          </label>
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
            maxLength={contactLimits.company}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {fieldError("company")}
        </div>
        <div className="form-field">
          <label htmlFor="contact-topic">
            相談したい内容 <span aria-hidden="true">＊</span>
          </label>
          <select
            id="contact-topic"
            name="topic"
            required
            defaultValue=""
            aria-invalid={!!errors.topic}
            aria-describedby={errors.topic ? "topic-error" : undefined}
          >
            <option value="" disabled>
              選んでください
            </option>
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {fieldError("topic")}
        </div>
        <div className="form-field">
          <label htmlFor="contact-message">
            メッセージ <span aria-hidden="true">＊</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            maxLength={contactLimits.message}
            placeholder={
              "まだ具体的に決まっていなくても大丈夫です。\n今困っていることや、こうなったら嬉しいことをご記入ください。"
            }
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? "message-hint message-error" : "message-hint"
            }
          />
          <p className="field-hint" id="message-hint">
            5,000文字以内でご記入ください。
          </p>
          {fieldError("message")}
        </div>
        <div className="form-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">
            この欄は空欄のままにしてください
          </label>
          <input
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            maxLength={200}
          />
        </div>
        <p className="form-privacy">
          ご記入いただいた情報は、ご相談への返信・対応のために使用します。
        </p>
        <button
          className="button button-primary form-submit"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              <span className="sending-dot" aria-hidden="true" />
              送信しています…
            </>
          ) : (
            <>
              この内容で相談する
              <Icon name="arrow" />
            </>
          )}
        </button>
      </fieldset>
      <div
        ref={notice}
        className={`form-notice ${status}`}
        role={status === "error" ? "alert" : "status"}
        aria-live={status === "error" ? "assertive" : "polite"}
        aria-atomic="true"
        tabIndex={-1}
      >
        {status === "sending" ? "送信しています…" : message}
      </div>
      <noscript>
        <p className="field-error">
          フォームを送信するにはJavaScriptを有効にしてください。メールでもご相談いただけます：
          <a href="mailto:naoki25napo@gmail.com">naoki25napo@gmail.com</a>
        </p>
      </noscript>
    </form>
  );
}
