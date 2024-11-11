import { setupServer } from './server.js';
import { initMongoDB } from './db/initMongoConnection.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { createDirIfNotExist } from './utils/createDirIfNotExist.js';

const bootstrap = async () => {
  await initMongoDB();
  await createDirIfNotExist(TEMP_UPLOAD_DIR);
  await createDirIfNotExist(UPLOAD_DIR);
  setupServer();
};

bootstrap();