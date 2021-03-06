const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ToJSON = require("../plugins/toJson");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name is a compulsory field"],
    minlength: [3, "First Name must be 5 characters"],
    maxlength: [15, "First Name cannot be more than 15 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is a compulsory field"],
    minlength: [3, "Last Name must be 5 characters"],
    maxlength: [15, "Last Name cannot be more than 15 characters"],
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
  addresses: [
    {
      buildingName: {
        type: String,
        maxlength: [20, "Building Name cannot be more than 20 characters"],
        required: true,
      },
      streetName: {
        type: String,
        maxlength: [50, "Street Name cannot be more than 50 characters"],
        required: true,
      },
      locality: {
        type: String,
        maxlength: [100, "Locality cannot be more than 100 characters"],
        required: true,
      },
      city: { type: String, required: true },
      pinCode: { type: Number, required: true },
      state: { type: String, required: true },
      phoneNumber: { type: Number },
    },
  ],
  orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
});

userSchema.plugin(ToJSON);

userSchema.statics.isEmailTaken = async function (email, excludedUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludedUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
