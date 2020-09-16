module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") return next()
  if (req.body.position) return next()

  const model = req.baseUrl.split("/")[3].toLowerCase()
  if (!process.models[model].fields.position) return next()

  try {
    let item = await process.models[model].model.findOne({}, "position", {sort: {position: -1}})
    if (!item) item = {position: 0}
    req.body.position = item.position + 1
    next()
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Что-то пошло не так! Попробуйте позднее..."})
  }
}