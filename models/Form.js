const {Schema, model} = require("mongoose")

const schema = new Schema({
  formName: {type: String, required: true},
  formData: {type: Object, required: true},
  ip: {type: String, required: true},
  datetime: {type: Date, required: true},
  emailId: {type: String},
  emailResponse: {type: String},
})

module.exports = model("Form", schema)