const {Schema, model} = require("mongoose")

const schema = new Schema({
  title: {type: String, default: ""},
  description: {type: String, default: ""},
  link: {type: String, default: ""},
  image: {type: String},
  position: {type: Number, default: 0},
  published: {type: Boolean, default: false},
  owner: {type: String},
})

module.exports = {model: model("Slide", schema), fields: {...schema.paths}}