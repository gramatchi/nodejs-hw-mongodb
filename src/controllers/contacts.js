import * as contactServices from '../services/contacts.js';

import createHttpError from 'http-errors';


export const getAllContactsController = async (req, res) => {
  const { page, perPage} = req.query;
  //console.log(page, perPage);
  
  const contacts = await contactServices.getContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    contacts,
  });
};

export const contactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await contactServices.getContactById(id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  } else {
    res.status(200).json({
      message: `Successfully found contact with id ${id}!`,
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
    },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Contact upserted successfully',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await contactServices.updateContactById(id, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.deleteContactById(id);

  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }

  res.status(204).send();
};
