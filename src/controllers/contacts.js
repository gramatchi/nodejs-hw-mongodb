import * as contactServices from '../services/contacts.js';

import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const contacts = await contactServices.getContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    contacts,
  });
};

export const contactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactServices.getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  } else {
    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  }
};

export const addContactController = async (req, res) => {
  const data = await contactServices.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Contact add successfully',
    data,
  });
  
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  
  const { data, isNew } = await contactServices.updateContactById(
    id,
    req.body,
    {
      upsert: true,
    }
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Contact has upserted successfully',
    data,
  });
};
