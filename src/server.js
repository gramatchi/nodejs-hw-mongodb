import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import { logger } from './middlewares/logger.js';

import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';



export const setupServer = () => {
  const app = express();

  app.use(cors());


  // app.use(logger);
  app.use(express.json());
  app.use(cookieParser());

  app.use('/auth', authRouter);

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to server',
    });
  });

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(env.PORT) || 3000;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
