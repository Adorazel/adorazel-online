const {Schema, model} = require("mongoose")

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  comments: [{type: Schema.Types.ObjectId, ref: "Comment" }]
})

module.exports = model("User", schema)