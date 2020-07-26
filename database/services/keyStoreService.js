const KeyStore = require("./../models/keyStoreModel");

module.exports = {
  addKey: async (keys) => {
    return await KeyStore.create(keys);
  },
  updateKeys: async (keys) => {
    return KeyStore.findOneAndUpdate({ user: keys.user }, keys, {
      upsert: true,
      new: true,
    });
  },
  findKeyByUser: (user) => {
    return KeyStore.findOne({ user: user });
  },
  deleteKey: (id) => {
    return KeyStore.findByIdAndDelete(id);
  },
};
