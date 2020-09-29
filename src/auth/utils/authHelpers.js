const {
  NotFoundError,
  InvalidTokenError,
} = require("./../../errorHandling/apiError");

const getAccessToken = (auth) => {
  if (!auth) throw new NotFoundError("Auth Token");
  return auth;
};

module.exports = { getAccessToken };
