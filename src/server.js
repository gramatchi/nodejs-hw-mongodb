import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';

import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';


const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export const setupServer = () => {
  const app = express();

  app.use(cors());

  // app.use(logger);

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to server',
    });
  });

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(process.env.PORT) || 3000;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
