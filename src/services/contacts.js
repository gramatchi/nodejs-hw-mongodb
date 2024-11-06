import ContactCollection from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();

export const getContactById = id => ContactCollection.findById(id);

export const addContact = payload => ContactCollection.create(payload);