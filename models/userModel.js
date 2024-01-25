// Model definition for a user

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  display_name: { type: String, required: false },
  hashed_password: { type: String, required: true }, // Correct terms?
  isMember: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true }
});

// Export model
module.exports = mongoose.model("User", UserSchema, "Users");
