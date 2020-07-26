const express = require("express");
const userController = require("../../controller/userController");
const asyncHandler = require("../../helpers/asyncHandler");
const schema = require("./schema");
const validator = require("./../../helpers/dataValidation");
const authentication = require("./../../auth/utils/authentication");
const router = express.Router();

router.post(
  "/register",
  validator(schema.signUp),
  asyncHandler(userController.registerUser)
);
router.post(
  "/login",
  validator(schema.userCredentials),
  asyncHandler(userController.loginUser)
);
router.delete(
  "/logout",
  authentication,
  asyncHandler(userController.logoutUser)
);

module.exports = router;
