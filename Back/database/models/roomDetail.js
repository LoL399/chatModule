const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const model = new mongoose.Schema(
  {
    attendants: [{ type: ObjectId, ref: "users" }],
    lastSeenChat: {type: ObjectId, ref: "chatDetails"},
    hidden: { type: Boolean }
  },
  { timestamps: true }
);

module.exports = mongoose.model("roomDetails", model);
