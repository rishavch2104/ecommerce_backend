const productService = require("../database/services/productService");
const Product = require("../database/models/productModel");
const {
  AlreadyExistsError,
  NotFoundError,
} = require("../errorHandling/apiError");
const { SuccessResponse } = require("../helpers/apiResponse");
const APIutils = require(".././helpers/apiUtils");
const _ = require("lodash");
const AWS = require("aws-sdk");
const uuid = require("uuid");
const AWSKeys = require("./../auth/keys/s3Keys");

const s3 = new AWS.S3({
  accessKeyId: AWSKeys.accessKeyId,
  secretAccessKey: AWSKeys.secretAccessKey,
});

module.exports = {
  addProduct: async (req, res, next) => {
    const productDetails = _.cloneDeep(req.body);
    const product = await Product.isTitleTaken(productDetails.title);
    if (product) {
      return next(new AlreadyExistsError("Product"));
    }
    const addedProduct = await productService.addProduct(productDetails);

    return new SuccessResponse("Product Added", { product: addedProduct }).send(
      res
    );
  },
  updateProduct: async (req, res, next) => {
    const id = req.params.id;
    const productDetails = _.cloneDeep(req.body);
    const productExists = await Product.doesProductExist(id);
    if (productExists) {
      const updateProduct = await productService.updateProduct(
        id,
        productDetails
      );
      return new SuccessResponse("Product Updated", {
        product: updateProduct,
      }).send(res);
    }
    return next(new NotFoundError("Product"));
  },
  getProducts: async (req, res, next) => {
    const features = new APIutils(
      productService.getProducts(),
      req.query
    ).compute();

    const result = await features.query;

    return new SuccessResponse("Products", { product: result }).send(res);
  },
  getProduct: async (req, res, next) => {
    const id = req.params.id;
    const product = await productService.getProductById(id);

    if (!product) {
      return next(new NotFoundError("Product"));
    }
    return new SuccessResponse("Product", { product: product }).send(res);
  },
  getImageUrl: async (req, res, next) => {
    const key = `${req.user._id}/${uuid}.jpeg`;

    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "ecommerce-test1",
        ContentType: "iamge/jpeg",
        Key: key,
      },
      (err, url) => {
        return new SuccessResponse("imageURL", url).send(res);
      }
    );
  },
};
