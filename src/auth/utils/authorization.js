const { UnauthorizedError } = require("./../../errorHandling/apiError");

module.exports = (req, res, next) => {
  if (req.user.role === "Admin") {
    return next();
  }
  next(new UnauthorizedError());
};
