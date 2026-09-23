# 文章変更の照合記録（2026-09-23）

入力: Downloads/naoki_yoshida_hp_copy_edit_sheet.xlsx（ユーザー確認済み）
シート: 文章編集シート
全145行のうち、新しい文章（記入欄）に入力がある17行を採用。
変更区分が「変更なし」でも新しい文章を優先。Automationの行は同じ文言の再指定。
ふりがなのXML要素は本文に含めず、Excelの表示文字列を読み取っています。

| ID      | Excelの行 | 新しい文章                                                                                                              | 表示箇所              |
| ------- | --------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------- |
| TXT-006 | 10        | Freelance Engineer / Consultant                                                                                         | components/Hero.tsx   |
| TXT-007 | 11        | AIとシステムで、<br>仕事をもっとラクに、もっとシンプルに。                                                              | components/Hero.tsx   |
| TXT-008 | 12        | AIを、仕事にうまく取り入れてみたい。<br>日々の仕事を、もう少しラクにしたい。<br>ホームページやSNSを、もっと活かしたい。 | components/Hero.tsx   |
| TXT-012 | 16        | 「仕事をラクにしたい。」                                                                                                | components/Hero.tsx   |
| TXT-013 | 17        | WORK SMARTER                                                                                                            | components/Hero.tsx   |
| TXT-014 | 18        | 面倒な作業を、<br>もっとシンプルに。                                                                                    | components/Hero.tsx   |
| TXT-016 | 20        | 仕事がシンプルになる。                                                                                                  | components/Hero.tsx   |
| TXT-093 | 97        | AI Utilization                                                                                                          | data/portfolio.ts     |
| TXT-094 | 98        | Web Development                                                                                                         | data/portfolio.ts     |
| TXT-095 | 99        | Automation                                                                                                              | data/portfolio.ts     |
| TXT-096 | 100       | Data Analysis                                                                                                           | data/portfolio.ts     |
| TXT-097 | 101       | BI / Dashboard                                                                                                          | data/portfolio.ts     |
| TXT-107 | 111       | Freelance Engineer / Consultant                                                                                         | components/About.tsx  |
| TXT-109 | 113       | はじめまして、Naoki Yoshidaです。                                                                                       | components/About.tsx  |
| TXT-119 | 123       | ChatGPT / OpenAI API / Claude Code / Copilot / Gemini                                                                   | components/Skills.tsx |
| TXT-121 | 125       | SQL / Python / Tableau / Supabase                                                                                       | components/Skills.tsx |
| TXT-123 | 127       | Next.js / TypeScript / Vercel                                                                                           | components/Skills.tsx |

TXT-007は表示幅に合わせ「AIとシステムで、／仕事をもっとラクに、／もっとシンプルに。」の3行に調整。TXT-123の連続空白は1つに統一。SEO title / descriptionは変更指示がないため維持。別途指定されたContact・実績準備中UI・OGPの更新はこの一覧外。
