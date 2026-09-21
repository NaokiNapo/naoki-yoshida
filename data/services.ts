export const problems = [
  {
    icon: "spark",
    title: "AIを仕事に取り入れてみたい",
    text: "ChatGPTなどは聞いたことがあるけれど、自分の仕事でどう使えばいいか分からない。",
  },
  {
    icon: "repeat",
    title: "毎日の作業をもっとラクにしたい",
    text: "転記、集計、メール、資料作成など、同じ作業に時間を取られている。",
  },
  {
    icon: "web",
    title: "ホームページを活かしたい",
    text: "作ったままになっている。問い合わせや集客につながる形に改善したい。",
  },
  {
    icon: "link",
    title: "SNSをうまく使いたい",
    text: "更新が続かない。ホームページや他の仕組みとうまくつなげたい。",
  },
  {
    icon: "chart",
    title: "数字やデータを見やすくしたい",
    text: "Excelや複数の資料に情報が散らばっていて、状況を把握するのに時間がかかる。",
  },
  {
    icon: "chat",
    title: "何ができるのか、まず相談したい",
    text: "具体的な方法は決まっていないけれど、今のやり方をもっと良くできないか考えたい。",
  },
] as const;

export const services = [
  {
    category: "AI活用",
    english: "AI SUPPORT",
    icon: "spark",
    title: "AIを、実際の仕事で使える形に。",
    text: "ChatGPTなどのAIを、日々の仕事やサービスの中でどう使えるか一緒に考えます。",
    examples: [
      "文章作成・情報整理",
      "問い合わせ対応",
      "社内業務の補助",
      "アイデア整理",
      "AIを組み込んだ仕組み",
    ],
  },
  {
    category: "業務の効率化・自動化",
    english: "AUTOMATION",
    icon: "repeat",
    title: "繰り返し作業を、\nできるだけ減らす。",
    text: "毎日の手作業を整理し、自動化できる部分を仕組みに変えます。",
    examples: [
      "Excel作業",
      "データ集計",
      "定型作業",
      "情報収集・定期更新",
      "各サービス間の連携",
    ],
  },
  {
    category: "Web・ホームページ",
    english: "WEB DESIGN & DEVELOPMENT",
    icon: "web",
    title: "作るだけでなく、\n使われるホームページへ。",
    text: "ホームページの制作から、公開後の更新・改善まで対応します。",
    examples: [
      "個人・店舗サイト",
      "サービス紹介サイト",
      "問い合わせ導線",
      "SEOの基本設定",
      "SNSとの連携",
    ],
  },
  {
    category: "データの整理・見える化",
    english: "DATA & INSIGHTS",
    icon: "chart",
    title: "バラバラな数字を、分かる形に。",
    text: "売上や利用状況などのデータを整理し、状況を把握しやすい形にします。",
    examples: [
      "Excel / CSV整理",
      "集計の自動化",
      "グラフ作成",
      "ダッシュボード",
      "分析・レポート作成",
    ],
  },
] as const;
