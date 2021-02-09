const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const model = new mongoose.Schema(
  {
    problem: { type: String, required: true},
    status: {type: String, required: true, default: "0"},
    byUser:{type: ObjectId, required: true, ref:"users"},
    room: {type: ObjectId, required: true, ref:"roomDetails"},
    handleBy: {type: ObjectId, ref:"roles"},
    isTaken: {type: ObjectId, required: true, ref:"users"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("requests", model);
