# ja-form-normalize デモ

[`@tora87/ja-form-normalize`](https://www.npmjs.com/package/@tora87/ja-form-normalize) の動作を試せるページです。
`main` ブランチに push すると、GitHub Actions が自動でビルドして GitHub Pages に公開します。

## 手元で動かす

```sh
npm install
npm run dev      # 開発サーバー
npm run build    # dist/ に出力
npm run preview  # ビルド結果を確認
```

## 自動デプロイの仕組み

設定は `.github/workflows/deploy.yml` にあります。

1. `main` への push をきっかけにワークフローが始まる
2. `build` ジョブが依存をインストールしてビルドし、`dist/` を成果物として保存する
3. `deploy` ジョブがその成果物を GitHub Pages に公開する

リポジトリの Settings → Pages → Source を **GitHub Actions** にしておく必要があります。
