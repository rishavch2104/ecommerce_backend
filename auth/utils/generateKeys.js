const crypto = require("crypto");

module.exports = () => {
  const accessTokenKey = crypto.randomBytes(64).toString("hex");

  return { accessTokenKey };
};
