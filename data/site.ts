export const site = {
  name: "Naoki Yoshida",
  url: "https://naoki-yoshida.vercel.app",
  title: "Naoki Yoshida | AI・自動化・Webの相談と制作",
  description:
    "AI活用、業務の自動化、ホームページ制作、データ活用など、仕事の困りごとを一緒に整理し、必要な形までサポートします。",
};

export type ContactChannel = {
  label: string;
  href: string;
  kind: "email" | "form" | "sns" | "line";
};

// 確認済みの連絡先だけを追加してください。先頭の項目が主CTAになります。
export const contactChannels: ContactChannel[] = [];

// GitHub / Privacyなど、公開するリンクを必要に応じて追加できます。
export const footerLinks: { label: string; href: string }[] = [];
