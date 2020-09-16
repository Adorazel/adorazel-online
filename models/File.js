const {Schema, model} = require("mongoose")

const schema = new Schema({
  filename: {type: String, required: true, unique: true},
  path: {type: String, required: true, unique: true},
  file: {type: Object, required: true},
  datetime: {type: Date, required: true},
  owner: {type: Schema.Types.ObjectId, ref: "User"},
})

module.exports = model("File", schema)