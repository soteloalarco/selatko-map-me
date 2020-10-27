import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! 🌎',
  });
});

export default app;
