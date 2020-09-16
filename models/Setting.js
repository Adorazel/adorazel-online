const {Schema, model} = require("mongoose")

const schema = new Schema({
  key: {type: String, index: true, unique: true},
  type: {type: String, default: "text"},
  value: {type: Schema.Types.Mixed},
  owner: {type: String},
})

module.exports = {model: model("Setting", schema), fields: {...schema.paths}}