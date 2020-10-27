import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

require('dotenv');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! 🌎',
  });
});

export default app;
