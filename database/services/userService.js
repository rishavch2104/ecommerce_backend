const Users = require("./../models/userModel");
const keyStoreService = require("./keyStoreService");

module.exports = {
  findUserByEmail: (email) => {
    return Users.findOne({ email: email });
  },
  addUser: async (user, keys) => {
    const newUser = await Users.create(user);
    keys.user = newUser._id;
    await keyStoreService.addKey(keys);
    return newUser;
  },
  findUserById: (id) => {
    return Users.findById(id);
  },
};
