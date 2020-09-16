const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const nodeMailer = require("nodemailer")
const Form = require("../models/Form")
const config = require("config")
const router = Router()

router.post("", [
  check("name").isLength({min: 1}).withMessage("Вы не представились"),
  check("phone").isMobilePhone("ru-RU").withMessage("Неверный номер телефона"),
  check("email").isLength({max: 0}).withMessage("Неверный email"),
  check("contact").normalizeEmail().isEmail().withMessage("Неверный email"),
  check("message").isLength({min: 1}).withMessage("Сообщение пустое"),
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: errors.array()[0].msg
      })
    }
    const transporter = nodeMailer.createTransport(config.get("smtp").transporter)
    const info = await transporter.sendMail({
      ...config.get("smtp").options,
      subject: "Test",
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    })
    const {formName, contact, ...formData} = req.body
    formData.email = contact
    const form = new Form({
      formName,
      formData: formData,
      ip: req.headers["x-forwarded-for"],
      datetime: new Date,
      emailId: info.messageId,
      emailResponse: info.response
    })
    await form.save()
    res.json({message: "Сообщение отправлено"})
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Не удалось отправить сообщение! Попробуйте позднее..."})
  }
})

module.exports = router