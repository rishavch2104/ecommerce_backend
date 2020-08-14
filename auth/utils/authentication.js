const express = require("express");
const validator = require("./../../helpers/dataValidation");
const asyncHandler = require("./../../helpers/asyncHandler");
const userService = require("./../../database/services/userService");
const keyStoreService = require("./../../database/services/keyStoreService");
const { NotFoundError } = require("./../../errorHandling/apiError");
const { getAccessToken } = require("./authHelpers");

const router = express.Router();
const JWT = require("./JWT");

router.use(
  asyncHandler(async (req, res, next) => {
    console.log(req.cookies);
    req.accessToken = getAccessToken(req.cookies.accessToken);
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
