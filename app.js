const express = require("express")
const compression = require("compression")
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")
const path = require("path")
const expressSitemap = require("express-sitemap-xml")
const expressRobots = require("express-robots-txt")
const config = require("config")
const Page = require("./models/Page")
const sitemap = require("./processors/sitemap.processor")
const robots = require("./processors/robots.processor")

const PORT = config.get("port") || 5000

process.models = {
  "education": require("./models/Exp"),
  "posts": require("./models/Post"),
  "projects": require("./models/Project"),
  "redirects": require("./models/Redirect"),
  "seo": require("./models/Setting"),
  "settings": require("./models/Setting"),
  "skills": require("./models/Item"),
  "slides": require("./models/Slide"),
  "social": require("./models/Item"),
  "tags": require("./models/Tag"),
  "tiles": require("./models/Project"),
  "tools": require("./models/Item"),
  "work": require("./models/Exp"),
}

mongoose.set("useFindAndModify", false)

const app = express()

if (process.env.NODE_ENV === "development") {
  const cors = require("cors")
  app.use(cors())
}

app.use(fileUpload({
  limits: {...config.get("uploadLimits")},
  createParentPath: true,
  safeFileNames: true,
  preserveExtension: true,
  abortOnLimit: true,
  responseOnLimit: "Достигнут предел размера файла",
}))

app.use(compression({level: 9}))
app.use(express.json())
app.use(expressSitemap(sitemap.get, config.get("sitemapBaseUrl")))
app.use(expressRobots(robots()))

app.use("/api/v1/auth", require("./routes/auth.routes"))
app.use("/api/v1/education", require("./routes/items.routes"))
app.use("/api/v1/files", require("./routes/files.routes"))
app.use("/api/v1/forms", require("./routes/forms.routes"))
app.use("/api/v1/posts", require("./routes/items.routes"))
app.use("/api/v1/projects", require("./routes/items.routes"))
app.use("/api/v1/redirects", require("./routes/items.routes"))
app.use("/api/v1/seo", require("./routes/items.routes"))
app.use("/api/v1/settings", require("./routes/items.routes"))
app.use("/api/v1/skills", require("./routes/items.routes"))
app.use("/api/v1/slides", require("./routes/items.routes"))
app.use("/api/v1/social", require("./routes/items.routes"))
app.use("/api/v1/tags", require("./routes/items.routes"))
app.use("/api/v1/tiles", require("./routes/items.routes"))
app.use("/api/v1/tools", require("./routes/items.routes"))
app.use("/api/v1/work", require("./routes/items.routes"))

app.use("/files", express.static(path.join(__dirname, "files"), {maxAge: "1y"}))

if (process.env.NODE_ENV === "production") {

  app.use("/", express.static(path.join(__dirname, "client", "build"), {maxAge: "1y"}))

  app.use(async (req, res, next) => {

    try {
      const indexFile = path.join(__dirname, "client", "build", "index.html")

      app.get(/\/admin[/]?/, (req, res) => {
        res.sendFile(indexFile)
      })
      app.get(/\/dashboard[/]?/, (req, res) => {
        res.sendFile(indexFile)
      })

      const pages = await Page.find()
      pages.map(page => {
        app.get(page.url, (req, res) => {
          res.sendFile(indexFile)
        })
      })

      const redirects = await process.models["redirects"].model.find()
      redirects.map(redirect => {
        app.get(redirect.from, (req, res) => {
          res.redirect(301, redirect.to)
        })
      })

      app.get("*", (req, res) => {
        res.status(404).sendFile(indexFile)
      })

      next()
    } catch (e) {
      if (process.env.NODE_ENV === "development") console.log(e)
    }
  })
}

async function start() {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (e) {
    console.log("Server Error", e.message)
    process.exit(1)
  }
}

start().then(() => {
  app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
})



