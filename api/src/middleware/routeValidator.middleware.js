const validateResources = (schema) => {
  return async (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
      });
      next();
    } catch (error) {
      const errorMessages = mapZodError(error.errors);
      res.status(400).json({data: errorMessages});
    }
  };
};


const mapZodError = (errors) => {
    const formattedErrors = errors.map(el => {
        return `${el.path[1]} ${el.message}`
    })
    return formattedErrors;
}

module.exports = validateResources