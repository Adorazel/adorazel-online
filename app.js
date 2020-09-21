const express = require("express")
const compression = require("compression")
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")
const path = require("path")
const fs = require("fs")
const expressSitemap = require("express-sitemap-xml")
const expressRobots = require("express-robots-txt")
const config = require("config")
const Page = require("./models/Page")
const File = require("./models/File")
const sitemap = require("./processors/sitemap.processor")
const robots = require("./processors/robots.processor")
const setup = require("./setup/index")

const PORT = config.get("port") || 5000

process.models = {
  "admins": require("./models/Admin"),
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
  "users": require("./models/User"),
  "work": require("./models/Exp"),
}

process.getModel = req => req.baseUrl.split("/")[3].toLowerCase()

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

app.use("/api/v1/auth", require("./routes/auth.routes"))
app.use("/api/v1/files", require("./routes/files.routes"))
app.use("/api/v1/forms", require("./routes/forms.routes"))

const itemsPaths = [
  "/api/v1/education",
  "/api/v1/posts",
  "/api/v1/projects",
  "/api/v1/redirects",
  "/api/v1/seo",
  "/api/v1/settings",
  "/api/v1/skills",
  "/api/v1/slides",
  "/api/v1/social",
  "/api/v1/tags",
  "/api/v1/tiles",
  "/api/v1/tools",
  "/api/v1/work",
]

itemsPaths.map(path => {
  app.use(path, require("./routes/items.routes"))
})

app.use("/files", express.static(path.join(__dirname, "files"), {maxAge: "1y", index: false}))
app.use(expressSitemap(sitemap.get, config.get("baseUrl")))
app.use(expressRobots(robots()))

if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "client", "build"), {maxAge: "1y", index: false}))

  const processFile = (uri, path, seo = []) => {

    return new Promise(async (resolve, reject) => {

      let page, arr, $IMAGE, $TITLE, $DESCRIPTION, $KEYWORDS, $ROBOTS, $YANDEX_VERIFICATION, $GOOGLE_SITE_VERIFICATION,
        $BASE_URL, $URL

      $IMAGE = config.get("baseUrl") + "/static/meta/logo-share.png"
      $TITLE = "Adorazel Online"
      $DESCRIPTION = $KEYWORDS = ""
      $ROBOTS = "none"

      page = "main"

      uri = uri.split("/")
      if (uri[1].length) page = uri[1]
      if (uri.length === 3) page = uri[2]

      if (uri.length < 3) {

        arr = seo.filter(item => item.key === `${page}_image`)
        if (arr.length) {
          try {
            const file = await File.findById(arr[0].value)
            if (file) $IMAGE = config.get("baseUrl") + "/" + file.path
          } catch (e) {
            if (process.env.NODE_ENV === "development") console.log(e)
          }
        }

        arr = seo.filter(item => item.key === `${page}_title`)
        if (arr.length) $TITLE = arr[0].value + " | Adorazel Online"

        arr = seo.filter(item => item.key === `${page}_description`)
        if (arr.length) $DESCRIPTION = arr[0].value

        arr = seo.filter(item => item.key === `${page}_keywords`)
        if (arr.length) $KEYWORDS = arr[0].value

        arr = seo.filter(item => item.key === `${page}_robots`)
        if (arr.length) $ROBOTS = arr[0].value

      } else {

        let source

        try {
          if (uri[1] === "portfolio") source = await process.models["projects"].model.findById(page)
          if (uri[1] === "blog") source = await process.models["posts"].model.findById(page)
        } catch (e) {
          if (process.env.NODE_ENV === "development") console.log(e)
        }

        if (source) {

          try {
            const file = await File.findById(source.image)
            if (file) $IMAGE = config.get("baseUrl") + "/" + file.path
          } catch (e) {
            if (process.env.NODE_ENV === "development") console.log(e)
          }

          $TITLE = source.title
          $DESCRIPTION = source.description
          $KEYWORDS = source.keywords
          $ROBOTS = source.published ? "index, follow" : "none"
        }

      }

      arr = seo.filter(item => item.key === "global_yandexVerification")
      $YANDEX_VERIFICATION = arr.length ? arr[0].value : ""

      arr = seo.filter(item => item.key === "global_googleSiteVerification")
      $GOOGLE_SITE_VERIFICATION = arr.length ? arr[0].value : ""

      $BASE_URL = config.get("baseUrl")
      $URL = $BASE_URL + uri.join("/")

      fs.readFile(path, "utf8", function (err, data) {

        if (err) reject(err)

        data = data.replace(/\$BASE_URL/g, $BASE_URL)
        data = data.replace(/\$URL/g, $URL)
        data = data.replace(/\$TITLE/g, $TITLE)
        data = data.replace(/\$IMAGE/g, $IMAGE)
        data = data.replace(/\$DESCRIPTION/g, $DESCRIPTION)
        data = data.replace(/\$KEYWORDS/g, $KEYWORDS)
        data = data.replace(/\$ROBOTS/g, uri[1] === "admin" || uri[1] === "dashboard" ? "none" : $ROBOTS)
        data = data.replace(/\$YANDEX_VERIFICATION/g, $YANDEX_VERIFICATION)
        data = data.replace(/\$GOOGLE_SITE_VERIFICATION/g, $GOOGLE_SITE_VERIFICATION)

        resolve(data)
      })
    })
  }

  app.use(async (req, res, next) => {

    try {

      const indexFilePath = path.join(__dirname, "client", "build", "index.html")

      app.get(/\/admin[/]?/, (req, res) => {
        processFile(req.originalUrl, indexFilePath)
          .then(indexFile => res.send(indexFile))
      })

      app.get(/\/dashboard[/]?/, (req, res) => {
        processFile(req.originalUrl, indexFilePath)
          .then(indexFile => res.send(indexFile))
      })

      const seo = await process.models["settings"].model.find({owner: /seo/i})
      const pages = await Page.find()
      pages.map(page => {
        app.get(page.url, (req, res) => {
          processFile(req.originalUrl, indexFilePath, seo)
            .then(indexFile => res.send(indexFile))
        })
      })

      const redirects = await process.models["redirects"].model.find()
      redirects.map(redirect => {
        app.get(redirect.from, (req, res) => {
          res.redirect(301, config.get("baseUrl") + redirect.to)
        })
      })

      app.get("*", (req, res) => {
        processFile(req.originalUrl, indexFilePath, seo)
          .then(indexFile => res.status(404).send(indexFile))
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

    const result = await setup()
    if (result) {
      console.info("Database created successfully.")
      console.info(`Go to ${config.get("baseUrl")}/admin and create a site administrator.`)
    }
  } catch (e) {
    console.log("Server Error", e.message)
    process.exit(1)
  }
}

start().then(() => {
  app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
})



