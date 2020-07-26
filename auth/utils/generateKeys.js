const crypto = require("crypto");

module.exports = () => {
  const accessTokenKey = crypto.randomBytes(64).toString("hex");
  const refreshTokenKey = crypto.randomBytes(64).toString("hex");
  return { accessTokenKey, refreshTokenKey };
};
