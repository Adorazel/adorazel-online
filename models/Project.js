const {Schema, model} = require("mongoose")

const schema = new Schema({
  title: {type: String, default: ""},
  longtitle: {type: String, default: ""},
  description: {type: String, default: ""},
  keywords: {type: String, default: ""},
  richtext: {type: String, default: ""},
  uri: {type: String, default: ""},
  image: {type: String},
  gallery: {type: String, default: "[[]]"},
  position: {type: Number, default: 0},
  published: {type: Boolean, default: false},
  owner: {type: String},
})

module.exports = {model: model("Project", schema), fields: {...schema.paths}}