const _ = require("lodash");
const httpStatus = require("http-status");
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
const User = require("./../database/models/userModel");
const generateKeys = require("./../auth/utils/generateKeys");
const generateTokens = require("../auth/utils/generateTokens");

module.exports = {
  registerUser: async (req, res, next) => {
    const newUser = _.cloneDeep(req.body);
    if (await User.isEmailTaken(newUser.email)) {
      return next(new AlreadyExistsError("User"));
    }

    const keys = generateKeys();
    const addedUser = await userService.addUser(newUser);
    keys.user = addedUser.id;
    await keyStoreService.addKey(keys);

    const tokens = await generateTokens(keys);
    res.cookie("accessToken", tokens, { httpOnly: true });
    return new SuccessResponse(
      "Registered SuccessFully",
      {
        user: addedUser,
      },
      httpStatus.CREATED
    ).send(res);
  },
  loginUser: async (req, res, next) => {
    const userCredentials = _.cloneDeep(req.body);

    const user = await userService.findUserByEmail(userCredentials.email);
    if (!user) return next(new NotFoundError("User"));

    const match = await user.isPasswordMatch(userCredentials.password);
    if (!match) return next(new IncorrectPasswordError());
    const keys = generateKeys();
    keys.user = user._id;
    await keyStoreService.updateKeys(keys);
    const tokens = await generateTokens(keys);
    res.cookie("accessToken", tokens, { httpOnly: true });
    return new SuccessMessageResponse("Logged In").send(res);
  },

  logoutUser: async (req, res, next) => {
    await keyStoreService.deleteKey(req.keyStore._id);
    return new SuccessMessageResponse("Logged out").send(res);
  },
};
