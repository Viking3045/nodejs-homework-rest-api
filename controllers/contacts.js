// const Joi = require("joi");

const contacts = require("../models/contacts");

const {HttpError} = require("../helpers");
const { ctrlWrapper } = require("../helpers");

// const addSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().required(),
//     phone: Joi.string().required(),
//   });


  const getAll = async (req, res) => {
      const result = await contacts.listContacts();
      res.json(result);
  }

  const getContactById = async (req, res) => {
      const { id } = req.params;
      const result = await contacts.getContactById(id);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
  }

  const addContact = async (req, res) => {
      const result = await contacts.addContact(req.body);
      res.status(201).json(result);
  }

  const removeContact = async (req, res) => {
      const { id } = req.params;
      const result = await contacts.removeContact(id);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json({ message: "contact deleted" });
  }

  const updateById = async (req, res) => {
      const { id } = req.params;
      const result = await contacts.updateById(id, req.body);
      console.log(result);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
  }


  module.exports = {
    getAll: ctrlWrapper(getAll),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateById: ctrlWrapper(updateById)

  }