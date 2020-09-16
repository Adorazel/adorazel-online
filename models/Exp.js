const {Schema, model} = require("mongoose")

const schema = new Schema({
  place: {type: String, default: ""},
  post: {type: String, default: ""},
  date: {type: String, default: ""},
  position: {type: Number, default: 0},
  published: {type: Boolean, default: false},
  owner: {type: String},
})

module.exports = {model: model("Exp", schema), fields: {...schema.paths}}