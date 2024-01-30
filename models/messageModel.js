// Model definition for a message

const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Export model
module.exports = mongoose.model("Message", MessageSchema, "Messages");
