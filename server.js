const app = require("./app");
const mongoInit = require("./database");
const express = require("express");

const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

mongoInit(
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  })
);
