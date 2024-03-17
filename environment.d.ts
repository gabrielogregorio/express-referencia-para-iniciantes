declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    CORS_ORIGINS: string;
    DISABLE_LOGS: boolean;
  }
}
