const mongoose = require("mongoose");

const message = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
   subject:{type:String},
   email:{type:String},
   message:{type:String}
  }
);
module.exports = mongoose.model("message", message);