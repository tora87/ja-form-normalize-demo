import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages では https://<ユーザー名>.github.io/<リポジトリ名>/ のように
  // サブフォルダで配信される。相対パスにしておくと、リポジトリ名が何であっても動く。
  base: "./",
});
