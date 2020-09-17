const {Router} = require("express")
const auth = require("../middleware/auth.middleware")
const autoIncrement = require("../middleware/increment.middleware")
const sitemap = require("../processors/sitemap.processor")

const router = Router()

const getModel = req => req.baseUrl.split("/")[3].toLowerCase()

// Получение полей
router.get("/fields", auth, autoIncrement, async (req, res) => {
  try {
    const model = getModel(req)
    if (process.models[model].fields.position) {
      process.models[model].fields.position.defaultValue = req.body.position
    }
    res.json(process.models[model].fields)
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Не удалось получить список полей объекта!"})
  }
})

// Получение одного
router.get("/:id", async (req, res) => {
  try {
    const model = getModel(req)
    const item = await process.models[model].model.findById(req.params.id)
    res.json(item)
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Не удалось получить объект!"})
  }
})

// Получение всех
router.get("", async (req, res) => {
  try {
    const model = getModel(req)
    const sortDir = req.query.sort || "asc"
    req.query.sort && delete req.query.sort
    const items = await process.models[model].model.find({...req.query}, null, {sort: {position: sortDir}})
    res.json(items)
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Не удалось получить список объектов!"})
  }
})

// Создание
router.post("", auth, async (req, res) => {
  try {
    const model = getModel(req)
    const item = new process.models[model].model(req.body)
    await item.save()

    await sitemap.set(req, item._id, () => {
      res.json({data: item, message: "Успешно создано"})
    })

  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Создание не удалось!"})
  }
})

// Обновление
router.put("/:id", auth, async (req, res) => {
  try {
    const model = getModel(req)
    const item = await process.models[model].model.findByIdAndUpdate(req.params.id, req.body)

    await sitemap.set(req, req.params.id, () => {
      res.json({data: item, message: "Успешно обновлено"})
    })

  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Обновление не удалось!"})
  }
})

// Публикация
router.patch("/:id", auth, async (req, res) => {
  try {
    const model = getModel(req)
    await process.models[model].model.findByIdAndUpdate(req.params.id, req.body)

    await sitemap.set(req, req.params.id, () => {
      res.json({published: req.body.published})
    })

  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Не удалось обновить статус публикации!"})
  }
})

// Удаление
router.delete("/:id", auth, async (req, res) => {
  try {
    // TODO Реализовать удаление прикрепленных файлов
    const model = getModel(req)
    await process.models[model].model.findByIdAndDelete(req.params.id)

    await sitemap.set(req, req.params.id, () => {
      res.json({message: "Успешно удалено"})
    })

  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Удаление не удалось!"})
  }
})

module.exports = router