const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") return next()
  try {
    let token = req.headers.authorization
    if (!token) return res.status(401).json({message: "Нет авторизации..."})
    token = token.split(" ")[1]
    req.user = jwt.verify(token, config.get("jwtSecret"))
    next()
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(401).json({message: "Истекло время авторизации!"})
  }
}