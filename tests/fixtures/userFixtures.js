const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const faker = require("faker");
const User = require("../../src/database/models/userModel");

const password = "password1";
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  firstName: faker.name.findName().split(" ")[0],
  lastName: faker.name.findName().split(" ")[1],
  email: faker.internet.email().toLowerCase(),
  password,
};

const insertUser = async (users) => {
  await User.insertMany(
    users.map((user) => ({ ...user, password: hashedPassword }))
  );
};

module.exports = { userOne, insertUser };
