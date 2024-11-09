import * as contactServices from '../services/contacts.js';

import createHttpError from 'http-errors';
import { parseContactsFilter } from '../utils/parseContactsFilter.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage, sortBy, sortOrder } = req.query;

  const { _id: userId } = req.user;
  const filter = parseContactsFilter(req.query);
  filter.userId = userId;

  const contacts = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    contacts,
  });
};

export const contactByIdController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const contact = await contactServices.getContact({ _id: id, userId });

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
  const userId = req.user._id;
  const data = await contactServices.addContact({ ...req.body, userId });

  //console.log(req.user);

  res.status(201).json({
    status: 201,
    message: 'Contact add successfully',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const { data, isNew } = await contactServices.updateContact(
    { _id: id, userId },
    {
      upsert: true,
    },
    { ...req.body, userId },
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
  const { _id: userId } = req.user;
  const result = await contactServices.updateContact({ _id: id, userId }, req.body);

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
  const { _id: userId } = req.user;
  const data = await contactServices.deleteContact({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }

  res.status(204).send();
};
