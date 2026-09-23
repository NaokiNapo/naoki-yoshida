# Naoki Yoshida

AI・自動化・Web・データに関する相談と制作のホームページ。
Next.js / TypeScript / App Router。既存のVercelプロジェクトと
https://naoki-yoshida.vercel.app を維持します。

## 開発と検証

Node.js 24.xを使用します。

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
```

lintはBiome 2.5.14をnpxで一時実行します（初回はネット接続が必要）。
テストはNode.js標準のtest runnerを使用します。
メール送信・モーションを含め、追加のnpm依存パッケージはありません。

## 文章と実績を編集する

- `data/copy.ts`: Excelで変更欄が入力されていた17行の文章。TXT IDで追跡
- `data/services.ts`: 悩み、サービス内容、対応例
- `data/portfolio.ts`: 公開許可済み案件と、準備中カードのカテゴリ順
- `data/site.ts`: SEO title / description / 本番URLとフッターリンク
- `components/`: 各セクションの構造・その他の文章
- `app/globals.css`: 配色、レスポンシブ、フォーム、モーション
- `app/opengraph-image.tsx`: SNS共有用画像

Excelの「変更区分」ではなく「新しい文章（記入欄）」が入力されている行を採用しています。
空欄の文章は、今回別途指示されたフォーム・準備中UIなどを除き維持しています。
変更一覧は [docs/copy-changes.md](docs/copy-changes.md) を参照してください。

実績配列は空のままです。カテゴリのみのSkeletonカードに
「COMING SOON」「掲載準備中」を表示します。
確認済みの実績を`PortfolioItem`の型に沿って追加すると実績カードに切り替わります。
仮の顧客名・案件名・成果は掲載しません。

## モーション

`components/MotionEffects.tsx`でIntersectionObserverとrequestAnimationFrameを共通管理します。
表示中の装飾だけを更新し、スクロールイベントをフレーム単位にまとめます。
Heroの光・線・Glass・Noteはレイヤーごとに少しずつ異なる速度で動きます。
セクションは一度だけ短いfade / slide / staggerで表示します。
JavaScriptが無効でも本文は表示されます。
`prefers-reduced-motion: reduce`ではスクロール演出・浮遊・smooth scrollを停止します。
フォーム自体はrevealで隠しません。

## お問い合わせフォーム

`ContactForm.tsx` → `POST /api/contact` → Resend REST API → 固定の受信先。

宛先はサーバー側の`lib/contact-handler.ts`に固定しています。

- 受信先: **naoki25napo@gmail.com**
- 返信先: フォームで入力されたメールアドレス（Reply-To）
- 送信元: `CONTACT_FROM_EMAIL`で指定する、Resendで利用可能なアドレス
- 名前100文字、メール254文字、会社名150文字、メッセージ5,000文字まで
- 相談内容は定義済み5項目のみ。会社名は任意、その他は必須
- フロント・サーバー両方で検証。HTMLをエスケープし、テキスト版も送信
- honeypot、同一オリジン検証、32KiBのリクエスト上限
- 1送信元につき10分間に5リクエストまでの簡易制限
- ResendのIdempotency-Keyで同じ内容の再送による重複を抑制
- メール本文・APIキー・生IPをログへ出力しません

簡易制限はプロセス内メモリに保持します。Vercelでは複数インスタンスにまたがる
厳密な制限ではなく、再起動でリセットされます。
Vercelの上書き済み`x-vercel-forwarded-for`をハッシュ化して使用し、
ローカル環境では1つの共通バケットで検証します。
大量スパムが発生した場合はVercel Firewall等の追加対策を検討してください。

## Vercelで実際に送信できるようにする手順

1. [Resend](https://resend.com)にサインインし、Domainsから自分で管理する送信元ドメインを追加します。
2. Resendが指定するDNSレコードをドメイン管理画面に登録し、Verifiedになることを確認します。
3. API Keysからメール送信権限のあるAPIキーを発行します。必要な送信元ドメインに権限を限定できます。
4. Vercelの既存プロジェクト`naoki-yoshida`を開き、Settings → Environment Variablesに以下を登録します。

| 環境変数             | 登録する値                                                           | 公開範囲     |
| -------------------- | -------------------------------------------------------------------- | ------------ |
| `RESEND_API_KEY`     | Resendで発行した実際のAPIキー                                        | サーバーのみ |
| `CONTACT_FROM_EMAIL` | 認証済みドメインの送信元メールアドレス（表示名を付けずアドレスのみ） | サーバーのみ |

5. まず **Preview** を選び、必要ならブランチを`feature/homepage-v1`に限定します。
6. Deploymentsからこのブランチの最新Previewを **Redeploy** します。既存デプロイには変数変更が自動反映されません。
7. Previewのフォームから動作確認を送信し、画面の成功表示・ResendのLogs・**naoki25napo@gmail.comでの受信**を確認します。
8. 正式公開するときは同じ2変数を **Production** にも登録し、承認後にmainへmergeまたはProductionへデプロイします。本作業ではmainへmergeしません。

送信元をGmailのアドレスにして送る構成ではありません。
GmailパスワードやGmailへのログイン認証情報は不要です。
キーを`NEXT_PUBLIC_`で始まる変数へ入れないでください。

Resendの`onboarding@resend.dev`はテスト用です。
この送信元から送れる相手はResendアカウントに登録した自分のメールアドレスに制限されます。
受信先が固定のため、登録メールがnaoki25napo@gmail.comである場合のみ、この方式でテストできます。
正式運用は認証済みドメインの送信元を設定してください。
[公式のテスト送信制限](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain)

## ローカルのメール設定

`.env.example`をコピーして`.env.local`を作り、2変数を設定してからサーバーを起動してください。
値が空ならページ表示やビルドは正常に動作し、送信時だけ503を返します。
開発環境では「メール送信設定がまだ完了していません」と表示します。
本番環境では利用者向けの汎用エラーメッセージを表示し、成功したようには見せません。

`.env.local`はGit対象外です。`.env.example`には変数名と空の値だけを置いています。
実キーをチャット、コード、GitHubへ貼り付けないでください。

## メールの検証について

`npm test`はResend応答をモックし、ネット送信をせずに安全性と処理結果を検証します。
ブラウザーでの成功・失敗UIも制御した応答で検証しています。
**APIキーと認証済み送信元の設定前に、実際のメール到達を確認したものではありません。**

## Previewの確認

GitHubの`feature/homepage-v1`をpushすると、既存のVercel Git連携でPreviewが作成されます。
Vercel → 既存プロジェクト → Deployments → ブランチの最新コミット → Ready → Visitで確認できます。
本番URL・SEOのcanonicalは既存URLを維持しています。

## 主な構成

- `app/api/contact/route.ts`: APIの入口
- `lib/contact.ts`: 共有の項目・入力検証
- `lib/contact-handler.ts`: サーバー側の送信・防御処理
- `components/ContactForm.tsx`: 入力と送信状態
- `components/MotionEffects.tsx`: 共通のスクロール演出
- `tests/contact.test.ts`: メール処理の回帰テスト

`AGENTS.md`と`CLAUDE.md`はNext.jsが生成する作業ガイドです。
検証用画像・一時ファイルはGit対象外の`artifacts/`に保存します。
