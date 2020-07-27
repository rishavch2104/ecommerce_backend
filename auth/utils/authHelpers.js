const {
  NotFoundError,
  InvalidTokenError,
} = require("./../../errorHandling/apiError");

const getAccessToken = (auth) => {
  if (!auth) throw new NotFoundError("Auth Token");
  if (!auth.startsWith("Bearer")) throw new InvalidTokenError();
  return auth.split(" ")[1];
};

module.exports = { getAccessToken };
