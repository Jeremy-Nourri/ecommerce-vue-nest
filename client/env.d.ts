/// <reference types="vite/client" />


interface ImportMetaEnv {
    VITE_BASE_URL_API: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
