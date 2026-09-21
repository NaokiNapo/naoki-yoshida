# Naoki Yoshida

AI・自動化・Web・データに関する相談と制作のホームページ。
Next.js / TypeScript / App Routerを維持し、Server Componentsを基本に構成しています。

## ローカル起動・検証

Node.js 24.xを使用します。

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
```

lintは固定バージョンのBiomeをnpxで一時実行します。初回はネット接続が必要です。
アプリの依存ライブラリは追加していません。
CSSはセクションごとに独立したセレクターを使用するため
noDescendingSpecificityを無効化しています。
noImportantStylesはreduced motionの確実な上書きのため無効化しています。

## 編集箇所

- `components/`: Header / Hero / Problems / Services / Process / Portfolio / About / Skills / Contact / Footer / Icon
- `data/services.ts`: 悩み、サービス内容、対応例
- `data/portfolio.ts`: 公開実績。確認済み案件だけ追加
- `data/site.ts`: サイト情報、連絡先、フッターの追加リンク
- `app/globals.css`: 色、余白、レスポンシブ、モーション
- `app/layout.tsx`: フォントとSEO metadata
- `app/opengraph-image.tsx`: SNS共有用画像
- `app/icon.svg`: favicon
- `app/robots.ts`, `app/sitemap.ts`: 検索エンジン向け情報

## 問い合わせ先の設定

`data/site.ts`の`contactChannels`に、確認済みの連絡手段を追加します。
各要素は`label`, `href`, `kind`を持ちます。
`kind`は`email` / `form` / `sns` / `line`です。
メールは`mailto:`、その他は正式なHTTPS URLを使用してください。
先頭が「相談してみる」のリンク先になり、残りは補助リンクになります。

未設定時は準備中と表示し、送信可能に見える架空フォームは設置しません。
Hero・HeaderのCTAは常にContactセクションへ移動します。
問い合わせバックエンド、CMS、認証、Supabase接続は追加していません。

## 実績の追加

`PortfolioItem`の型に沿って、カテゴリー、概要、課題、行ったこと、
結果・変化（任意）、使用技術、詳細説明を追加します。
「詳細を見る」は開閉式なので、詳細ページを追加せず掲載できます。
関連サイトのURLは確認できた場合だけ設定してください。
配列が空の間は公開準備中と、portfolioCategoriesの掲載予定カテゴリを表示します。カテゴリは同じファイルで編集できます。仮の実績や数値は掲載していません。

## Vercel Preview

既存のGitHubリポジトリ `NaokiNapo/naoki-yoshida` と
既存のVercelプロジェクトをそのまま使用します。
本番のcanonicalは `https://naoki-yoshida.vercel.app` です。

1. `feature/homepage-v1` をGitHubにpushします。
2. Vercelの既存プロジェクト → Deploymentsを開きます。
3. 対象ブランチ・コミットのPreviewを選び、ReadyになったらVisitで確認します。
4. 自動作成されない場合は、Settings → Gitで接続リポジトリとPreview設定を確認します。

この変更ではmainへのmerge、Productionへの昇格は行いません。
本番公開前に問い合わせ窓口を設定してください。
環境変数の追加は不要です。

## 公開前に決めること

- 正式な問い合わせ方法とリンク先（必須）
- 公開できる実績と掲載許可
- Aboutの文章・肩書き、使用技術の最終確認
- 料金や相談条件を載せるかどうか
- 顔写真、SNSリンクを載せるかどうか
- 個人情報を収集する場合のプライバシー案内

`AGENTS.md`と`CLAUDE.md`はNext.jsの開発サーバーが生成する作業ガイドです。
検証用画像はGit対象外の`artifacts/`に保存します。
