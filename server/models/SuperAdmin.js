const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const superadmin = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

   messages: [{ type: Schema.Types.ObjectId, ref: "message" }],
   payments: [{ type: Schema.Types.ObjectId, ref: "payment" }]
  }
);
module.exports = mongoose.model("superadmin", superadmin);