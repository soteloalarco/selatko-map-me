/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import { expressCspHeader, INLINE, SELF } from 'express-csp-header';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import entryRoutes from './routes/entry.routes';

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(morgan('common'));
app.use(helmet());
app.use(cors());

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', entryRoutes);

// Content Security Policy in HTTP Header
app.use(expressCspHeader({
  directives: {
    'default-src': [SELF, 'https://api.mapbox.com', INLINE],
    'script-src': [SELF, INLINE, 'https://api.mapbox.com'],
    'worker-src': ['blob:'],
    'child-src': ['blob:'],
    'img-src': [SELF, 'data:', 'blob:', 'https:'],
  },
}));

// Catch unauthorized errors

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: `${err.name}: ${err.message}` });
  } else if (err) {
    res.status(400).json({ error: `${err.name}: ${err.message}` });
    console.log(err);
  }
});

export default app;
