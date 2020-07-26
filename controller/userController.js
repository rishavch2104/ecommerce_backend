const bcrypt = require("bcrypt");

const userService = require("./../database/services/userService");
const keyStoreService = require("./../database/services/keyStoreService");
const generateKeys = require("./../auth/utils/generateKeys");
const generateTokens = require("../auth/utils/generateTokens");
module.exports = {
  registerUser: async (req, res, next) => {
    const newUser = req.body;
    if (await userService.findUserByEmail(newUser.email)) {
      return res.status(404).json("Already Exists");
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    const keys = generateKeys();
    const addedUser = await userService.addUser(newUser, keys);

    const tokens = await generateTokens(keys);
    return res.status(200).json({ user: addedUser, tokens: tokens });
  },
  loginUser: async (req, res, next) => {
    const userCredentials = req.body;
    const user = await userService.findUserByEmail(userCredentials.email);
    if (!user) return res.status(404).json("Not found");

    const match = await bcrypt.compare(userCredentials.password, user.password);
    if (!match) return res.status(404).json("Incorrect password");
    const keys = generateKeys();
    keys.user = user._id;
    await keyStoreService.updateKeys(keys);
    const tokens = await generateTokens(keys);

    return res.status(200).json(tokens);
  },

  logoutUser: async (req, res, next) => {
    await keyStoreService.deleteKey(req.keyStore._id);
    return res.status(200).json("Logged Out");
  },
};
