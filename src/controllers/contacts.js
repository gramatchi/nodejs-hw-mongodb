import * as contactServices from '../services/contacts.js';

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
    return res
      .status(404)
      .json({ message: `Contact with id:${contactId} not found` });
  } else {
    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  }
};
