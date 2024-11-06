import { Router } from 'express';

import * as contactControllers from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactControllers.getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(contactControllers.contactByIdController));

export default contactsRouter;
