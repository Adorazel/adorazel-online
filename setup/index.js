const download = require("image-downloader")
const path = require("path")
const Admin = require("../models/Admin").model
const Exp = require("../models/Exp").model
const File = require("../models/File")
const Form = require("../models/Form")
const Item = require("../models/Item").model
const Page = require("../models/Page")
const Post = require("../models/Post").model
const Project = require("../models/Project").model
const Redirect = require("../models/Redirect").model
const Setting = require("../models/Setting").model
const Slide = require("../models/Slide").model
const Tag = require("../models/Tag").model
const User = require("../models/User").model
const {v4} = require("uuid")
const fs = require('fs')


const exps = require("./exps")
const items = require("./items")
const pages = require("./pages")
const posts = require("./posts")
const projects = require("./projects")
const settings = require("./settings")
const slides = require("./slides")
const tags = require("./tags")

const deleteFolderRecursive = _path => {
  if (fs.existsSync(_path)) {
    fs.readdirSync(_path).forEach((file, index) => {
      const curPath = path.join(_path, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(_path)
  }
};

const getImage = ({url}) => {
  const name = v4() + ".jpg"
  return new Promise((resolve, reject) => {
    const dest = path.join(__dirname, "..", "files", name)
    download.image({url, dest})
      .then(async () => {
        try {
          const path = "files/" + name
          const file = new File({
            filename: name,
            path: path,
            file: {name},
            datetime: new Date,
          })
          await file.save()
          resolve(file._id.toString())
        } catch (e) {
          reject(e)
        }
      })
      .catch(err => reject(err))
  })
}

const getGallery = async gallery => {
  const arr = await Promise.all(gallery.map(arr => {
    return Promise.all(arr.map(url => {
      return new Promise(async (resolve, reject) => {
        try {
          const id = await getImage({url})
          resolve(id)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }))
  return JSON.stringify(arr)
}

module.exports = async () => {

  const initialized = await Setting.findOne({key: "initialized"})
  if (initialized && initialized.value) return false

  const dir = path.join(__dirname, "..", "files")
  deleteFolderRecursive(dir)
  fs.mkdirSync(dir)

  let result

  const models = [Admin, Exp, File, Form, Item, Page, Post, Project, Redirect, Setting, Slide, Tag, User]
  result = await Promise.all(models.map(model => {
    return new Promise(async (resolve, reject) => {
      try {
        await model.deleteMany({})
        model.collection.dropIndexes((err, results) => {
          if (results) return resolve(results)
          reject(err)
        })
      } catch (e) {
        reject(e)
      }
    })
  }))
  console.log("Collections cleaned:", result.length)

  result = await Promise.all(exps.map(async _exp => {
    return new Promise(async (resolve, reject) => {
      try {
        const exp = new Exp({..._exp})
        await exp.save()
        resolve(exp)
      } catch (e) {
        reject(e)
      }
    })
  }))
  console.log("Exps created:", result.length)

  result = await Promise.all(items.map(async _item => {
    return new Promise(async (resolve, reject) => {
      try {
        const item = new Item({..._item})
        await item.save()
        resolve(item)
      } catch (e) {
        reject(e)
      }
    })
  }))
  console.log("Items created:", result.length)

  result = await Promise.all(pages.map(async ({url}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const page = new Page({url, lastMod: Date.now(), changeFreq: "weekly"})
        await page.save()
        resolve(page)
      } catch (e) {
        reject(e)
      }
    })
  }))
  console.log("Pages created:", result.length)

  result = await Promise.all(posts.map(async _post => {
    return new Promise(async (resolve, reject) => {
      try {
        let image = ""
        let gallery = "[[]]"
        if (_post.image) image = await getImage({url: _post.image})
        if (_post.gallery) gallery = await getGallery(_post.gallery)
        const post = new Post({..._post, image, gallery, publishedon: Date.now()})
        await post.save()
        resolve(post)
      } catch (e) {
        reject(e)
      }
    })
  }))
  console.log("Posts created:", result.length)

  result = await Promise.all(projects.map(async _project => {
    return new Promise(async (resolve, reject) => {
      try {
        let image = ""
        let gallery = "[[]]"
        if (_project.image) image = await getImage({url: _project.image})
        if (_project.gallery) gallery = await getGallery(_project.gallery)
        const project = new Project({..._project, image, gallery})
        await project.save()
        resolve(project)
      } catch (e) {
        reject(e)
      }
    })
  }))
  console.log("Projects created:", result.length)

  result = await Promise.all(settings.map(async _setting => {
    return new Promise(async (resolve, reject) => {
      try {
        let value = _setting.value
        if (_setting.type === "image") {
          value = await getImage({url: _setting.value})
        }
        const setting = new Setting({..._setting, value})
        await setting.save()
        resolve(setting)
      } catch (e) {
        reject(e)
      }
    })
  }))
  console.log("Settings created:", result.length)

  result = await Promise.all(slides.map(async _slide => {
    return new Promise(async (resolve, reject) => {
      try {
        let image = ""
        if (_slide.image) image = await getImage({url: _slide.image})
        const slide = new Slide({..._slide, image})
        await slide.save()
        resolve(slide)
      } catch (e) {
        reject(e)
      }
    })
  }))
  console.log("Slides created:", result.length)

  result = await Promise.all(tags.map(async _tag => {
    return new Promise(async (resolve, reject) => {
      try {
        const tag = new Tag({..._tag})
        await tag.save()
        resolve(tag)
      } catch (e) {
        reject(e)
      }
    })
  }))
  console.log("Tags created:", result.length)

  const setting = new Setting({
    key: "initialized",
    type: "boolean",
    value: true,
    owner: "",
  })
  await setting.save()
  return true
}