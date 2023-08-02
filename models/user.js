const {Schema, model}= require("mongoose");

const {handleMongooseError} = require("../helpers")

const Joi = require("joi");


const userSchema = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
          minLength:6,
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: String
      }, {versionKey:false}
)


userSchema.post("save", handleMongooseError)

const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({ "any.required": "Missing required email field",
    "string.email": "Invalid email format",}),
    password: Joi.string().min(6).required().messages({"any.required": "Missing required password field",}),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({ "any.required": "Missing required email field",
    "string.email": "Invalid email format",}),
    password: Joi.string().min(6).required().messages({"any.required": "Missing required password field",}),
})


const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});
const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
}

const User = model("user", userSchema)


module.exports = {
    schemas,
    User
}