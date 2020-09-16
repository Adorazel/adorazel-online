const {Schema, model} = require("mongoose")

const schema = new Schema({
  key: {type: String, index: true, unique: true},
  name: {type: String, default: ""},
  owner: {type: String},
})

module.exports = {model: model("Tag", schema), fields: {...schema.paths}}