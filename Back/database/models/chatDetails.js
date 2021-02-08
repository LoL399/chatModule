const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const model = new mongoose.Schema(
  {
    content: {type: String, required: true},
    replyTo: {type: ObjectId, ref:"chatDetails"},
    fromUser: {type: ObjectId, ref: "users"},
    UserRoom: {type: ObjectId, ref:"roomDetails"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("chatDetails", model);
