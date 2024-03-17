// This is a layer that centralizes access to the process env, which allows you to handle envs, removing line breaks and any similar problems in the code itself.
import '@/wrappers/envs';

export const PORT = Number(process.env.PORT?.trim());
export const DISABLE_LOGS = String(process.env.DISABLE_LOGS) === 'true';
export const CORS_ORIGINS =
  process.env.CORS_ORIGINS?.toString()
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item) || [];
