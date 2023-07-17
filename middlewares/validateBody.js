const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = ( req, res, next) => {
    console.log(req.body)
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      next(
        HttpError(
          400,
          errorMessage
        )
      );
    }
    next()
  };
  return func
};

module.exports = validateBody;
