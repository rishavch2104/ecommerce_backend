const JWT = require("./JWT");
const {
  TokenGenerationFailureError,
} = require("./../../errorHandling/apiError");
const iat = Math.floor(Date.now() / 1000);

module.exports = async (keys) => {
  const accessToken = await JWT.encode({
    iss: process.env.TOKEN_ISSUER,
    aud: process.env.TOKEN_AUDIENCE,
    sub: keys.user.toString(),
    iat: iat,
    param: keys.accessTokenKey,
    validity: parseInt(iat + process.env.ACCESS_TOKEN_VALIDITY * 24 * 60 * 60),
  });
  if (!accessToken) throw new TokenGenerationFailureError("Access");

  return accessToken;
};
