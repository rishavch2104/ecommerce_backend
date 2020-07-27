const jwt = require("jsonwebtoken");
const path = require("path");
const { promisify } = require("util");
const { readFile } = require("fs");

const readPublicKey = () => {
  return promisify(readFile)(path.join(__dirname, "../keys/public.pem"));
};
const readPrivateKey = () => {
  return promisify(readFile)(path.join(__dirname, "../keys/private.pem"));
};

module.exports = {
  encode: async (payload) => {
    const cert = await readPrivateKey();
    if (!cert) throw new Error("Token Generation Failure");
    return promisify(jwt.sign)({ ...payload }, cert, { algorithm: "RS256" });
  },
  validate: async (token) => {
    const cert = await readPublicKey();

    try {
      return promisify(jwt.verify)(token, cert);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  decode: async (token) => {
    const cert = await readPublicKey();
    try {
      return promisify(jwt.verify)(token, cert), { ignoreExpiration: true };
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
