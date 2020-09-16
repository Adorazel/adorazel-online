const {Schema, model} = require("mongoose")

const schema = new Schema({
  title: {type: String, default: ""},
  icon: {type: String, default: ""},
  link: {type: String, default: ""},
  rating: {type: Number, default: 5},
  position: {type: Number, default: 0},
  published: {type: Boolean, default: false},
  owner: {type: String},
})

module.exports = {model: model("Item", schema), fields: {...schema.paths}}