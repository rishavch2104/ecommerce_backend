const express = require("express");
const validator = require("./../../helpers/dataValidation");
const asyncHandler = require("./../../helpers/asyncHandler");
const userService = require("./../../database/services/userService");
const keyStoreService = require("./../../database/services/keyStoreService");
const { NotFoundError } = require("./../../errorHandling/apiError");
const { getAccessToken } = require("./authHelpers");
const schema = require("./authSchema");
const router = express.Router();
const JWT = require("./JWT");

router.use(
  validator(schema.auth, "headers"),
  asyncHandler(async (req, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization);
    const payload = await JWT.validate(req.accessToken);
    const user = await userService.findUserById(payload.sub);
    if (!user) next(new NotFoundError("User"));
    req.user = user;
    const keyStore = await keyStoreService.findKeyByUser(user._id);
    if (!keyStore) next(new NotFoundError("Keys"));
    req.keyStore = keyStore;
    return next();
  })
);

module.exports = router;
