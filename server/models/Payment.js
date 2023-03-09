const mongoose = require("mongoose");

const payment = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
   
    paymentDate:{type: Date,
    default: Date.now,
    required: true},

    amount: { type: String, required: true },
    activePlan: { type: String, default: "Basic" },
    paymentMethod: { type: String, default: "Card" }, //card - easypaisa - jazzcash
    transID : {type:String},
    approvedTrans: {type:Boolean}
  }
);
module.exports = mongoose.model("payment", payment);