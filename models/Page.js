const {Schema, model} = require("mongoose")

const schema = new Schema({
  url: {type: String, default: ""},
  lastMod: {type: Date, default: Date.now()},
  changeFreq: {type: String, default: "weekly"},
})

module.exports = model("Page", schema)