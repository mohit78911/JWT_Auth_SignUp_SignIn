const mongoose = require("mongoose");
let newData = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", newData);
