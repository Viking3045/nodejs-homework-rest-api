const {Schema, model}= require("mongoose");
const {handleMongooseError} = require("../helpers")
const Joi = require("joi");
const contactSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner:{
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
  }, {versionKey:false})

  contactSchema.post("save", handleMongooseError )

  const addSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Missing required name field",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Missing required email field",
      "string.email": "Invalid email format",
    }),
    phone: Joi.string()
      .required()
      .messages({
        "string.pattern.base":
          "Phone number must be in the format (111) 111-1111",
        "any.required": "Missing required phone field",
      }),
    });

    const updateAddSchema = Joi.object({
      favorite: Joi.boolean().required()
    })
    const schemas = {
      addSchema,
      updateAddSchema
    }
    const Contact = model("contact", contactSchema);
  
    module.exports =  {
      Contact,
      schemas,
    }
