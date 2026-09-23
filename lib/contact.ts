export const contactTopics = [
  "AI活用について",
  "業務効率化・自動化",
  "ホームページ・Web",
  "データ活用",
  "その他",
] as const;
export const contactLimits = {
  name: 100,
  email: 254,
  company: 150,
  message: 5000,
} as const;
export type ContactFields = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
  website: string;
  requestId: string;
};
export type ContactErrors = Partial<
  Record<"name" | "email" | "company" | "topic" | "message", string>
>;
export const successMessage =
  "お問い合わせありがとうございます。内容を確認のうえ、ご連絡します。";
export const failureMessage =
  "送信できませんでした。時間をおいてもう一度お試しください。";
export function isEmail(value: string) {
  return (
    value.length <= contactLimits.email &&
    /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value) &&
    !Array.from(value).some(
      (character) =>
        character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127,
    )
  );
}
export function validateContact(input: unknown): {
  fields: ContactFields;
  errors: ContactErrors;
  valid: boolean;
} {
  const source =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};
  const text = (key: string) =>
    typeof source[key] === "string" ? source[key].trim() : "";
  const fields: ContactFields = {
    name: text("name"),
    email: text("email"),
    company: text("company"),
    topic: text("topic"),
    message: text("message"),
    website: text("website"),
    requestId: text("requestId"),
  };
  const errors: ContactErrors = {};
  if (
    !fields.name ||
    fields.name.length > contactLimits.name ||
    /[\r\n]/.test(fields.name) ||
    fields.name.includes("\x00")
  )
    errors.name = "お名前を100文字以内で入力してください。";
  if (!isEmail(fields.email))
    errors.email = "メールアドレスを正しく入力してください。";
  if (
    fields.company.length > contactLimits.company ||
    /[\r\n]/.test(fields.company) ||
    fields.company.includes("\x00")
  )
    errors.company = "会社名・屋号は150文字以内で入力してください。";
  if (!contactTopics.some((topic) => topic === fields.topic))
    errors.topic = "相談したい内容を選んでください。";
  if (
    !fields.message ||
    fields.message.length > contactLimits.message ||
    fields.message.includes("\x00")
  )
    errors.message = "メッセージを1〜5,000文字で入力してください。";
  return { fields, errors, valid: Object.keys(errors).length === 0 };
}
