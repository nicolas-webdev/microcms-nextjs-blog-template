# Next.js 13 と microCMS を組み合わせたブログプロジェクト

このプロジェクトは、Next.js 13 と microCMS を組み合わせた、高速で効率的なブログサイト構築のためのテンプレートです。Lighthouse のスコアは満点を獲得しており、ウェブアプリとしても拡張が可能です。

このプロジェクトは [Next.js](https://nextjs.org/) を使用して create-next-app でブートストラップされています。

## 開始方法

1. 開発サーバーを起動:

npm run dev
yarn dev
pnpm dev

2. ブラウザで [http://localhost:3000](http://localhost:3000) を開き、結果を確認。

3. app/page.tsx を編集することでページの内容を変更できます。ファイルを編集すると、ページが自動的に更新されます。

このプロジェクトでは next/font を使用して、カスタム Google フォントである Inter を自動的に最適化してロードします。

## もっと学ぶ

Next.js についてさらに詳しく知りたい場合は、以下のリソースを参照してください:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js の機能と API について学ぶ。
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブな Next.js チュートリアル。

Next.js の GitHub リポジトリも [こちら](https://github.com/vercel/next.js/) からチェックできます。フィードバックや貢献は大歓迎です！

## Vercel へのデプロイ

Next.js アプリをデプロイする最も簡単な方法は、Next.js のクリエーターから提供されている Vercel Platform を使用することです。

詳しくは Next.js deployment documentation を参照してください。

## プロジェクトの特徴

### microCMS の利用

このプロジェクトはコンテンツ管理として microCMS を使用しています。コンテンツの取得や更新が非常に簡単に行えます。

### セットアップ方法

1. `create-next-app`を使用して、Next.js 13 のプロジェクトを開始します。
2. microCMS でブログのテンプレートを作成します。
3. 環境変数(env)を設定します。
4. Vercel にデプロイします。

### Lighthouse スコア

このプロジェクトは Lighthouse でのスコアが満点を達成しています。

### Next.js 13 の新機能

このプロジェクトは Next.js 13 の最新の機能を活用しています：

- React 18
  -- Suspense
  -- React Server Components (RSC)
- キャッシュ機能
- 様々なフェッチモード（ダイナミックとスタティック）
- フォントの最適化
- ルートハンドラ（OG 画像作成、ダイナミックなマニフェスト）
- その他多数
