const {Schema, model} = require("mongoose")

const schema = new Schema({
  from: {type: String, default: ""},
  to: {type: String, default: ""},
  owner: {type: String},
})

module.exports = {model: model("Redirect", schema), fields: {...schema.paths}}