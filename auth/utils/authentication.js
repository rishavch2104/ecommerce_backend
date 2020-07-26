const express = require("express");
const validator = require("./../../helpers/dataValidation");
const { getAccessToken } = require("./authHelpers");
const schema = require("./authSchema");
const router = express.Router();
const JWT = require("./JWT");

router.use(
  validator(schema, "headers"),
  asyncHandler(async (req, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization);
    const payload = await JWT.validate(req.accessToken);
    const user = await userService.findUserById(payload.sub);
    if (!user) throw new Error("User not found");
    req.user = user;
    const keyStore = await keyStoreService.findKeyByUser(user._id);
    if (!keyStore) throw new Error("Token Not Found");
    req.keyStore = keyStore;
    return next();
  })
);

module.exports = router;
