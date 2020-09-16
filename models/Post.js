const {Schema, model} = require("mongoose")

const schema = new Schema({
  title: {type: String, default: ""},
  longtitle: {type: String, default: ""},
  description: {type: String, default: ""},
  keywords: {type: String, default: ""},
  introtext: {type: String, default: ""},
  richtext: {type: String, default: ""},
  posttags: {type: String, default: "[]"},
  image: {type: String},
  gallery: {type: String, default: "[[]]"},
  position: {type: Number, default: 0},
  publishedon: {type: Date, default: Date.now()},
  published: {type: Boolean, default: false},
  owner: {type: String},
})

module.exports = {model: model("Post", schema), fields: {...schema.paths}}