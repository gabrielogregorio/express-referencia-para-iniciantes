import { PORT } from '@/config/envs';
import { app } from './app';
import { Log } from './logger';

app.listen(PORT, () => {
  Log.info(`App started in http://127.0.0.1:${PORT}`);
});
