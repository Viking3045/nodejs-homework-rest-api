
const {Contact} = require("../models/contact")

const {HttpError} = require("../helpers");

const { ctrlWrapper } = require("../helpers");

  const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
      const result = await Contact.find({owner},"", {skip, limit}).populate("owner", "email");
      res.json(result);
  }

  const getContactById = async (req, res) => {
      const { id } = req.params;
      // const result = await Contact.findOne({_id:id})
      const result = await Contact.findById(id)
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
  }

  const addContact = async (req, res) => {
    const {_id: owner} = req.user;
      const result = await Contact.create({...req.body, owner});
      res.status(201).json(result);
  }

  const removeContact = async (req, res) => {
      const { id } = req.params;
      const result = await Contact.findByIdAndRemove(id);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json({ message: "contact deleted" });
  }

  const updateById = async (req, res) => {
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
      console.log(result);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
  }
  const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
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
    updateById: ctrlWrapper(updateById),
    updateStatusContact: ctrlWrapper(updateStatusContact)
  }