const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  name: String,
  lastName: String,
  googleAccessToken: String,
  googleRefreshToken: String,
});

mongoose.model("users", userSchema);
