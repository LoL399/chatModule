const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const model = new mongoose.Schema(
  {
    name: { type: String, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("roles", model);
