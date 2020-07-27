const express = require("express");
const userRouter = require("./routes/user/userRoutes");
const globalErrorHandler = require("./errorHandling/globalerrorhandler");
const { NotFoundError } = require("./errorHandling/apiError");
const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use(globalErrorHandler);

app.use("*", (req, res, next) => {
  next(new NotFoundError("Route"));
});

module.exports = app;
