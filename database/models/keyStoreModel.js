const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keyStoreSchema = new Schema({
  accessTokenKey: {
    type: String,
    required: [true, "Access Token Key must be entered"],
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

const keyStoreModel = mongoose.model("KeyStore", keyStoreSchema);

module.exports = keyStoreModel;
