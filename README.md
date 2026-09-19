# Naoki Yoshida — Official Website

名刺のQRコード向けの仮ページです。Next.js / TypeScript / App Routerを使用しています。

## ローカル実行

Node.js 24.x と npm を使用します。

```sh
npm ci
npm run dev
```

http://localhost:3000 を開いてください。

## 検証・本番実行

```sh
npm run build
npm run typecheck
npm start
```

## Vercelへの公開

1. このフォルダーをGitリポジトリのルートとしてGitHubなどにpushします。
2. Vercelの「Add New → Project」からリポジトリをImportします。
3. Framework PresetはNext.js、Root Directoryはこのフォルダー（リポジトリのルートなら ./）にします。
4. Node.jsは24.xを使用し、Build CommandなどはNext.jsの既定値のままDeployします。環境変数は不要です。
5. 発行された本番URLをスマートフォンで開き、表示を確認します。
6. 独自ドメインを使う場合はSettings → Domainsで設定し、最終的な本番URLを名刺のQRコードに使用します。

プレビューごとに変わるURLではなく、本番ドメインをQRコードに使用してください。

公式ドキュメント: https://vercel.com/docs/frameworks/full-stack/nextjs

## 編集箇所

- app/page.tsx: トップページの内容
- app/globals.css: レイアウト・配色・文字
- app/layout.tsx: 共通レイアウト・metadata
- app/icon.svg: NYモノグラムのfavicon

外部フォント、画像配信、UIライブラリ、環境変数への依存はありません。
将来はapp配下にルートやコンポーネントを追加できます。
