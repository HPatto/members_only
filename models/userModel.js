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

// Virtual for book's URL
// BookSchema.virtual("url").get(function () {
//   // We don't use an arrow function as we'll need the this object
//   return `/catalog/book/${this._id}`;
// });

// Export model
module.exports = mongoose.model("User", UserSchema);
