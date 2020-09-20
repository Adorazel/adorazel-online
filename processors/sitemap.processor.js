const Page = require("../models/Page")

const sitemap = {}

sitemap.get = async () => {
  try {
    return await Page.find({}, null, {sort: {url: "asc"}})
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
  }
}

sitemap.set =  async (req, id, callback) => {

    let action = ""

    switch (req.method) {
      case "POST":
        action = "create"
        break
      case "PUT":
        action = "update"
        break
      case "PATCH":
        action = "update"
        break
      case "DELETE":
        action = "delete"
        break
      default:
        break
    }

    const collections = {
      posts: "blog",
      projects: "portfolio"
    }
    const model = req.baseUrl.split("/")[3].toLowerCase()

    if (collections.hasOwnProperty(model)) {

      switch (action) {
        case "create":
          await createPage(`/${collections[model]}/${id}`)
          return callback()
        case "update":
          if (req.body.published) {
            await createPage(`/${collections[model]}/${id}`)
            return callback()
          } else {
            await deletePage(`/${collections[model]}/${id}`)
          }
          return callback()
        case "delete":
          await deletePage(`/${collections[model]}/${id}`)
          return callback()
        default:
          break
      }
    } else {

      let url
      if (action === "delete") {
        url = `/${req.query.owner.split("/")[0]}`
      } else {
        url = `/${req.body.owner.split("/")[0]}`
      }
      if (url === "/global") return callback()
      if (url === "/main") url = "/"
      const page = await Page.findOne({url})
      if (!page) {
        await createPage(url)
        return callback()
      } else {
        await updatePage(url)
      }
      callback()
    }
}

const createPage = async url => {
  try {
    const page = new Page({
      url,
      lastMod: Date.now(),
      changeFreq: "weekly",
    })
    await page.save()
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
  }
}

const updatePage = async url => {
  try {
    let page = await Page.find({url})
    if (page.length) {
      page = page[0]
      page.lastMod = Date.now()
      await page.save()
    }
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
  }
}

const deletePage = async url => {
  try {
    const page = await Page.find({url})
    if (page.length) {
      await Page.findByIdAndDelete(page[0]._id)
    }
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log(e)
  }
}

module.exports = sitemap