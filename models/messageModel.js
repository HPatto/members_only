// Model definition for a message

const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  userID: { type: String, required: true }, // Get this from db?
  text: { type: String, required: true },
  timestamp: { type: DateTime, required: true }
});

// Virtual for book's URL
// BookSchema.virtual("url").get(function () {
//   // We don't use an arrow function as we'll need the this object
//   return `/catalog/book/${this._id}`;
// });

// Export model
module.exports = mongoose.model("Message", MessageSchema);
