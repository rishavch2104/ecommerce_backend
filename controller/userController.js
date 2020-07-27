const bcrypt = require("bcrypt");

const userService = require("./../database/services/userService");
const keyStoreService = require("./../database/services/keyStoreService");
const {
  AlreadyExistsError,
  IncorrectPasswordError,
  NotFoundError,
} = require("./../errorHandling/apiError");
const {
  SuccessResponse,
  SuccessMessageResponse,
} = require("./../helpers/apiResponse");
const generateKeys = require("./../auth/utils/generateKeys");
const generateTokens = require("../auth/utils/generateTokens");
module.exports = {
  registerUser: async (req, res, next) => {
    const newUser = req.body;
    if (await userService.findUserByEmail(newUser.email)) {
      return next(new AlreadyExistsError("User"));
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    const keys = generateKeys();
    const addedUser = await userService.addUser(newUser, keys);

    const tokens = await generateTokens(keys);
    return new SuccessResponse("Registered SuccessFully", {
      user: addedUser,
      token: tokens,
    }).send(res);
  },
  loginUser: async (req, res, next) => {
    const userCredentials = req.body;
    const user = await userService.findUserByEmail(userCredentials.email);
    if (!user) return next(new NotFoundError("User"));

    const match = await bcrypt.compare(userCredentials.password, user.password);
    if (!match) return next(new IncorrectPasswordError());
    const keys = generateKeys();
    keys.user = user._id;
    await keyStoreService.updateKeys(keys);
    const tokens = await generateTokens(keys);

    return new SuccessResponse("Logged In", { token: tokens }).send(res);
  },

  logoutUser: async (req, res, next) => {
    await keyStoreService.deleteKey(req.keyStore._id);
    return new SuccessMessageResponse("Logged out").send(res);
  },
};
