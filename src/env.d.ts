/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_WEB_SOCKET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
