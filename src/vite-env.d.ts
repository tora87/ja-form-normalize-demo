interface ImportMetaEnv {
  /** GitHub Actions のワークフローから渡すコミットID。ローカルでは未定義。 */
  readonly VITE_COMMIT_SHA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
