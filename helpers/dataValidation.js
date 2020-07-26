module.exports = (schema, pointer = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[pointer]);
    if (!error) return next();

    const { details } = error;
    const message = details
      .map((i) => i.message.replace(/['"]+/g, ""))
      .join(",");
    console.log(message);
    throw new Error();
  };
};
