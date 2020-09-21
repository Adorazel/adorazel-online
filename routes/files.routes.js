const {Router} = require("express")
const File = require("../models/File")
const auth = require("../middleware/auth.middleware")
const mongoose = require("mongoose")
const _path = require("path")
const {v4} = require("uuid")
const fs = require("fs")
const router = Router()

router.post("", auth, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({message: `Нет файлов для загрузки!`})
    }

    Object.keys(req.files).map(async key => {
      const upload = req.files[key]
      const filename = v4() + _path.extname(upload.name)
      const path = _path.join("files", filename)
      const absolutePath = _path.join(__dirname, "..", path)
      await upload.mv(absolutePath, async error => {
        if (error) return res.status(500).json({message: "Не удалось загрузить файлы!", error})
        const {data, tempFilePath, truncated, mv, ...file} = upload
        const _file = new File({
          filename,
          path,
          file,
          datetime: new Date,
          owner: req.user.userId
        })
        await _file.save()
        res.json({upload: _file, message: `Все файлы успешно загружены`})
      })
    })
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Не удалось загрузить файлы! Попробуйте позднее..."})
  }
})

router.get("", async (req, res) => {
    try {
      let param = {}
      if (req.query.id) {
        let arr = req.query.id.split(",")
        arr = arr.map(item => mongoose.Types.ObjectId(item))
        param = {"_id": {$in: arr}}
      }
      const files = await File.find(param)
      res.json(files)
    } catch
      (e) {
      if (process.env.NODE_ENV === "development") console.log(e)
      res.status(500).json({message: "Что-то пошло не так! Попробуйте позднее..."})
    }
  }
)

router.get("/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id)
    res.json(file)
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Что-то пошло не так! Попробуйте позднее..."})
  }
})

// Удаление
router.delete("/:id", auth, async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id)
    fs.unlinkSync(_path.join(__dirname, "..", file.path))
    res.json({message: "Файл успешно удален"})
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
    res.status(500).json({message: "Удаление файла не удалось!"})
  }
})

module.exports = router