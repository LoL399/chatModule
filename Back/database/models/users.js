const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const model = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true},
    role: { type: ObjectId, ref:"roles"}
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", model);
