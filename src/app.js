const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user/userRoutes");
const productRouter = require("./routes/product/productRoutes");
const categoryRouter = require("./routes/category/categoryRoutes");
const globalErrorHandler = require("./errorHandling/globalerrorhandler");
const { NotFoundError } = require("./errorHandling/apiError");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.use("*", (req, res, next) => {
  next(new NotFoundError("Route"));
});

app.use(globalErrorHandler);

module.exports = app;
