const Users = require("./../models/userModel");
const keyStoreService = require("./keyStoreService");

module.exports = {
  findUserByEmail: (email) => {
    return Users.findOne({ email: email });
  },
  isVerified: (id) => {
    return Users.findById(id).select("isVerified -_id");
  },
  addUser: async (user) => {
    return await Users.create(user);
  },
  findUserById: (id) => {
    return Users.findById(id);
  },
};
