const JWT = require("./JWT");
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
  if (!accessToken) throw new Error("TOken generation falied");

  const refreshToken = await JWT.encode({
    iss: process.env.TOKEN_ISSUER,
    aud: process.env.TOKEN_AUDIENCE,
    sub: keys.user.toString(),
    iat: iat,
    param: keys.refreshTokenKey,
    validity: parseInt(iat + process.env.REFRESH_TOKEN_VALIDITY * 24 * 60 * 60),
  });

  if (!refreshToken) throw new Error("Refresh token creattion failed");

  return { accessToken, refreshToken };
};
