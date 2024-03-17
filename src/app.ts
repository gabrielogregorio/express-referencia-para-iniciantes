import { useCors } from '@/middlewares/useCors';
import helmet from 'helmet';
import { useIpRequestLimiter } from '@/middlewares/useIpRequestLimiter';
import { router } from './routes';
import { useHandleErrors } from './middlewares/useHandleErrors';
import { express } from './wrappers/express';

const app = express();
app.disable('x-powered-by');

app.use(useCors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(useIpRequestLimiter);

app.use(router);

app.use(useHandleErrors);

export { app };
