export type PortfolioItem = {
  id: string;
  category: string;
  title: string;
  problem: string;
  action: string;
  outcome?: string;
  technologies: string[];
  detail: string;
  url?: string;
};

// 公開許可と事実確認ができた案件のみ追加します。空の間は準備中表示。
export const portfolio: PortfolioItem[] = [];

// 仮の分類ラベルです。実在する案件や成果を示すものではありません。
export const portfolioCategories = [
  "BI / Dashboard",
  "Data Analysis",
  "Automation",
  "Web Development",
  "AI Utilization",
] as const;
