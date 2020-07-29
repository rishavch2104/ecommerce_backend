const express = require("express");
const asyncHandler = require("./../../helpers/asyncHandler");
const authentication = require("./../../auth/utils/authentication");
const authorization = require("./../../auth/utils/authorization");
const validator = require("./../../helpers/dataValidation");
const schema = require("./schema");
const categoryController = require("./../../controller/categoryController");

const router = express.Router();

router.get("/", asyncHandler(categoryController.getCategory));

router.post(
  "/",
  validator(schema),
  authentication,
  authorization,
  asyncHandler(categoryController.addCategory)
);
router.patch(
  "/:id",
  authentication,
  authorization,
  asyncHandler(categoryController.updateCategory)
);

module.exports = router;
