const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publishedwebsitesSchema = new mongoose.Schema(
  {
    name:{ type: String },
    subdomain: { type: String, required: true },

    templateid: { type: Schema.Types.ObjectId, ref: "template" },
    type:{type: String},
    Date:{type: String},
    image:{type:String}
  },
  
);

const publishedwebsites = mongoose.model("publishedwebsites", publishedwebsitesSchema);

module.exports = publishedwebsites;