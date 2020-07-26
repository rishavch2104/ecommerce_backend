const mongoose = require("mongoose");

const mongoInit = (cb) => {
  mongoose.connect("mongodb://localhost/ecommerce_backend", {
    useNewUrlParser: true,
  });
  mongoose.set("useFindAndModify", false);

  mongoose.connection.on("connected", () => {
    cb;
  });
  mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
  });
  mongoose.connection.on("error", (err) => console.log(err));
};

module.exports = mongoInit;
