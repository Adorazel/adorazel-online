const {Router} = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check, validationResult} = require("express-validator")
const Admin = require("../models/Admin")
const User = require("../models/User")
const router = Router()

// router.post("/registration", [
//   check("type").custom(value => (/*value === "Admin" ||*/ value === "User")).withMessage("Wrong request type"),
//   check("login").normalizeEmail().isEmail().withMessage("Email invalid"),
//   check("email").isLength({max: 0}).withMessage("Email invalid"),
//   check("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) return res.status(400).json({
//       errors: errors.array(),
//       message: "Неверные регистрационные данные!"
//     })
//     const {login, password, type} = req.body
//     let candidate = null
//     if (type === "User") candidate = await User.findOne({email: login})
//     if (type === "Admin") candidate = await Admin.findOne({email: login})
//     if (candidate) return res.status(400).json({message: `Такой ${type === "Admin" ? "администратор" : "пользователь"} уже существует!`})
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)
//     if (type === "User") {
//       const user = new User({email: login, password: hashedPassword})
//       await user.save()
//     }
//     if (type === "Admin") {
//       const admin = new Admin({email: login, password: hashedPassword})
//       await admin.save()
//     }
//     res.status(201).json({message: `${type === "Admin" ? "Администратор" : "Пользователь"} успешно создан`})
//   } catch (e) {
//     if (process.env.NODE_ENV === "development") console.log(e)
//     res.status(500).json({message: "Что-то пошло не так! Попробуйте позднее..."})
//   }
// })

router.post("/login", [
  check("type").custom(value => (value === "Admin" /*|| value === "User"*/)).withMessage("Wrong request type"),
  check("login").normalizeEmail().isEmail().withMessage("Please enter a valid email"),
  check("email").isLength({max: 0}).withMessage("Email invalid"),
  check("password").exists().withMessage("Please enter a password"),
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Неверные данные для входа!"
      })
    }
    const {login, password, type} = req.body
    let candidate
    if (type === "User") candidate = await User.findOne({email: login})
    if (type === "Admin") candidate = await Admin.findOne({email: login})
    if (!candidate) return res.status(400).json({message: "Неверный логин или пароль!"})
    const isMatched = await bcrypt.compare(password, candidate.password)
    if (!isMatched) return res.status(400).json({message: "Неверный логин или пароль!"})
    const token = jwt.sign({userId: candidate.id}, config.get("jwtSecret"), {expiresIn: "1h"})
    res.json({token, userId: candidate.id, expiresIn: Date.now() + (60 * 60 * 1000)})
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Что-то пошло не так! Попробуйте позднее..."})
  }
})

module.exports = router