const express = require("express");
const productController = require("./../../controller/productController");
const authentication = require("../../auth/utils/authentication");
const authorization = require("../../auth/utils/authorization");
const asyncHandler = require("./../../helpers/asyncHandler");
const validator = require("./../../helpers/dataValidation");
const schema = require("./schema");
const router = express.Router();

router.post(
  "/",
  authentication,
  authorization,
  validator(schema),
  asyncHandler(productController.addProduct)
);
router.patch(
  "/:id",
  authentication,
  authorization,
  asyncHandler(productController.updateProduct)
);

router.get(
  "/getImageUrl",
  authentication,
  authorization,
  asyncHandler(productController.getImageUrl)
);
router.get("/", asyncHandler(productController.getProducts));

router.get("/:id", asyncHandler(productController.getProduct));

module.exports = router;
