const {Router} = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check, validationResult} = require("express-validator")

const router = Router()

router.get("/check", async (req, res) => {

  try {

    if (await process.models["admins"].model.findOne()) {
      return res.json({exist: "yes"})
    }
    res.json({exist: "no"})

  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Что-то пошло не так! Попробуйте позднее..."})
  }

})

router.post("/registration", [
  check("model").custom(value => (value === "admins" || value === "users")).withMessage("Wrong request type"),
  check("login").normalizeEmail().isEmail().withMessage("Email invalid"),
  check("email").isLength({max: 0}).withMessage("Email invalid"),
  check("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
], async (req, res) => {

  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({
      errors: errors.array(),
      message: "Неверные регистрационные данные!"
    })

    const {login, password, model} = req.body
    let candidate = null

    if (model === "admins") {
      if (await process.models["admins"].model.findOne()) {
        return res.status(401).json({message: "Администратор сайта уже создан!"})
      }
    }

    candidate = await process.models[model].model.findOne({email: login})
    if (candidate) return res.status(400).json({
      message: "Такой пользователь уже существует!"
    })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    candidate = new process.models[model].model({email: login, password: hashedPassword})
    await candidate.save()

    res.status(201).json({message: `${model === "admins" ? "Администратор" : "Пользователь"} успешно создан`})

  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Что-то пошло не так! Попробуйте позднее..."})
  }
})

router.post("/login", [
  check("model").custom(value => (value === "admins" || value === "users")).withMessage("Wrong request type"),
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

    const {login, password, model} = req.body
    let candidate

    candidate = await process.models[model].model.findOne({email: login})

    if (!candidate) return res.status(400).json({message: "Неверный логин или пароль!"})

    const isMatched = await bcrypt.compare(password, candidate.password)

    if (!isMatched) return res.status(400).json({message: "Неверный логин или пароль!"})

    const token = jwt.sign({id: candidate.id}, config.get("jwtSecret"), {expiresIn: "1h"})

    res.json({token, id: candidate.id, expiresIn: Date.now() + (60 * 60 * 1000)})

  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Что-то пошло не так! Попробуйте позднее..."})
  }
})

module.exports = router