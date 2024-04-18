/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly LIVEBLOCKS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
