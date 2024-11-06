import { Router } from 'express';

import * as contactControllers from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', contactControllers.getAllContactsController);

contactsRouter.get('/:contactId', contactControllers.contactByIdController);

export default contactsRouter;
