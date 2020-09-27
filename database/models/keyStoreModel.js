const mongoose = require("mongoose");
const ToJSON = require("../plugins/toJson");
const Schema = mongoose.Schema;

const keyStoreSchema = new Schema({
  accessTokenKey: {
    type: String,
    required: [true, "Access Token Key must be entered"],
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

keyStoreSchema.plugin(ToJSON);

const keyStoreModel = mongoose.model("KeyStore", keyStoreSchema);

module.exports = keyStoreModel;
