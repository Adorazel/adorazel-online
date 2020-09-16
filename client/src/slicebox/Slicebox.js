import imagesLoaded from "imagesloaded"
import {debounce, setStyles} from "../utils"
import Cuboid from "./Cuboid"

function _init(options) {

  // options
  this.options = {...this.defaults, ...options}

  _validate.call(this)

  // all the items
  this.$items = this.$el.querySelectorAll("li")

  // total number of items
  this.itemsCount = this.$items.length

  // if there's no items return
  if (this.itemsCount === 0) return false

  // current image index
  this.current = 0

  // control if the slicebox is animating
  this.isAnimating = false

  // control if slicebox is ready (all images loaded)
  this.isReady = false

  const $current = this.$items[this.current]
  $current.style.display = "block"
  $current.classList.add("sb-current")

  // get real size of image
  const img = new Image()

  img.addEventListener("load", () => {

    this.realWidth = img.width

    // assuming all images with same size
    _setSize.call(this)
    _setStyle.call(this)
    _initEvents.call(this)

    this.options.onReady()
    this.isReady = true

    if (this.options.autoplay) {
      _startSlideshow.call(this)
    }

  })

  img.src = $current.querySelector("img").getAttribute("src")

}

function _validate() {

  if (this.options.cuboidsCount < 0) {
    this.options.cuboidsCount = 1
  } else if (this.options.cuboidsCount > 15) {
    this.options.cuboidsCount = 15
  } else if (this.options.cuboidsCount % 2 === 0) {
    ++this.options.cuboidsCount
  }

  if (this.options.maxCuboidsCount < 0) {
    this.options.maxCuboidsCount = 1
  } else if (this.options.maxCuboidsCount > 15) {
    this.options.maxCuboidsCount = 15
  } else if (this.options.maxCuboidsCount % 2 === 0) {
    ++this.options.maxCuboidsCount
  }

  if (this.options.disperseFactor < 0) {
    this.options.disperseFactor = 0
  }

  if (typeof this.onBeforeChange !== "function") {
    this.onBeforeChange = () => {
    }
  }

  if (typeof this.onAfterChange !== "function") {
    this.onAfterChange = () => {
    }
  }

  if (typeof this.onReady !== "function") {
    this.onReady = () => {
    }
  }

  if (this.options.orientation !== "v" && this.options.orientation !== "h" && this.options.orientation !== "r") {
    this.options.orientation = "v"
  }
}

function _setSize() {
  const $visible = this.$items[this.current].querySelector("img")
  this.size = {
    width: $visible.width,
    height: $visible.height
  }
}

function _setStyle() {
  this.$el.style.maxWidth = this.realWidth + "px"
}

function _initEvents() {
  this.resizeListener = debounce(() => {
    _setSize.call(this)
  })
  window.addEventListener("resize", this.resizeListener)
}

function _startSlideshow() {
  this.slideshow = setTimeout(() => {
    _navigate.call(this, "next")
    if (this.options.autoplay) {
      _startSlideshow.call(this)
    }
  }, this.options.interval)
}

function _stopSlideshow() {
  if (this.options.autoplay) {
    clearTimeout(this.slideshow)
    this.isPlaying = false
    this.options.autoplay = false
  }
}

function _navigate(dir, pos) {

  if (this.isAnimating || !this.isReady || this.itemsCount < 2) {
    return false
  }

  this.isAnimating = true

  // current item"s index
  this.prev = this.current

  // if position is passed
  if (pos !== undefined) {
    this.current = pos
  }

  // if not check the boundaries
  else if (dir === "next") {
    this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0
  } else if (dir === "prev") {
    this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1
  }

  // callback trigger
  this.options.onBeforeChange(this.current)

  _layout.call(this, dir)
  _rotate.call(this)

}

function _layout(dir) {

  // create a structure and append it to the main container (this.$el):

  let orientation = this.options.orientation

  if (orientation === "r") {
    orientation = Math.floor(Math.random() * 2) === 0 ? "v" : "h"
  }

  if (this.options.cuboidsRandom) {
    this.options.cuboidsCount = Math.floor(Math.random() * this.options.maxCuboidsCount + 1)
  }

  _validate.call(this)

  const boxStyle = {
    "width": this.size.width,
    "height": this.size.height,
    "perspective": this.options.perspective + "px"
  }

  const config = {
    ...this.options,
    size: this.size,
    items: this.$items,
    direction: dir,
    prev: this.prev,
    current: this.current,
    o: orientation
  }

  this.$box = document.createElement("div")
  this.$box.classList.add("sb-perspective")
  setStyles(this.$box, boxStyle)
  this.$el.appendChild(this.$box)

  this.cuboids = []

  this.$el.style.overflow = "visible"

  for (let i = 0; i < this.options.cuboidsCount; ++i) {

    const cuboid = new Cuboid(config, i)
    this.$box.appendChild(cuboid.getEl())
    this.cuboids.push(cuboid)

  }

}

function _rotate() {

  // hide current item
  this.$items[this.prev].classList.remove("sb-current")

  this.$items[this.prev].style.display = "none"

  for (let i = 0; i < this.options.cuboidsCount; ++i) {

    const cuboid = this.cuboids[i]

    cuboid.rotate(pos => {

      if (pos === this.options.cuboidsCount - 1) {

        this.$el.style.overflow = "hidden"
        this.isAnimating = false
        this.$box.remove()

        const $current = this.$items[this.current]
        $current.style.display = "block"
        _setSize.call(this)

        setTimeout(() => {
          $current.classList.add("sb-current")
        }, 0)

        this.options.onAfterChange(this.current)
      }
    })

  }
}

function _destroy(callback) {
  window.removeEventListener("resize", this.resizeListener)
  _stopSlideshow.call(this)
  if (this.$el) {
    this.$el.classList.remove("sb-slider")
    this.$el.style.maxWidth = ""
    this.$el.style.overflow = ""
  }
  this.$items && this.$items.forEach(item => {
    item.classList.remove("sb-current")
    item.style.display = ""
  })
  this.$box && this.$box.remove()
  Object.keys(this).forEach(key => {
    if (typeof this[key] === "function") {
      this[key] = () => {
      }
    }
  })
  if (typeof callback === "function") callback()
}

class Slicebox {

  constructor(el) {

    this.$el = el

    this.defaults = {
      // (v)ertical, (h)orizontal or (r)andom
      orientation: "v",
      // perspective value
      perspective: 1200,
      // number of slices / cuboids
      // needs to be an odd number 15 => number > 0 (if you want the limit higher, change the _validate function).
      cuboidsCount: 5,
      // if true then the number of slices / cuboids is going to be random (cuboidsCount is overwitten)
      cuboidsRandom: false,
      // the range of possible number of cuboids if cuboidsRandom is true
      // it is strongly recommended that you do not set a very large number :)
      maxCuboidsCount: 5,
      // each cuboid will move x pixels left / top (depending on orientation). The middle cuboid doesn"t move. the middle cuboid"s neighbors will move disperseFactor pixels
      disperseFactor: 30,
      // color of the hidden sides
      colorHiddenSides: "#222",
      // the animation will start from left to right. The left most cuboid will be the first one to rotate
      // this is the interval between each rotation in ms
      sequentialFactor: 150,
      // animation speed
      // this is the speed that takes "1" cuboid to rotate
      speed: 600,
      // transition easing
      easing: "ease",
      // if true the slicebox will start the animation automatically
      autoplay: false,
      // time (ms) between each rotation, if autoplay is true
      interval: 3000,
      // the fallback will just fade out / fade in the items
      // this is the time fr the fade effect
      fallbackFadeSpeed: 300,
      // callbacks
      onBeforeChange(position) {
        return false
      },
      onAfterChange(position) {
        return false
      },
      onReady() {
        return false
      },
      //reverse direction of rotation
      reverse: false,
    }

    this.init = options => {

      if (this.$el) {

        this.$el.classList.add("sb-slider")

        // preload the images
        imagesLoaded(this.$el, (instance) => {
          if (instance.isComplete) {
            _init.call(this, options)
          }
        })
      }
    }

    // public method: adds more items to the slicebox
    this.add = ($items, callback) => {
      this.$items = [...this.$items, ...$items]
      this.itemsCount = this.$items.length
      if (callback) callback($items)
    }

    // public method: shows next image
    this.next = () => {
      _stopSlideshow.call(this)
      _navigate.call(this, "next")
    }

    // public method: shows previous image
    this.previous = () => {
      _stopSlideshow.call(this)
      _navigate.call(this, "prev")
    }

    // public method: goes to a specific image
    this.jump = pos => {
      pos -= 1
      if (pos === this.current || pos >= this.itemsCount || pos < 0) {
        return false
      }
      _stopSlideshow.call(this)
      _navigate.call(this, pos > this.current ? "next" : "prev", pos)
    }

    // public method: starts the slideshow
    // any call to next(), previous() or jump() will stop the slideshow
    this.play = () => {
      if (!this.isPlaying) {
        this.isPlaying = true
        _navigate.call(this, "next")
        this.options.autoplay = true
        _startSlideshow.call(this)
      }
    }

    // public method: pauses the slideshow
    this.pause = () => {
      if (this.isPlaying) {
        _stopSlideshow.call(this)
      }
    }

    // public method: check if isAnimating is true
    this.isActive = () => {
      return this.isAnimating
    }

    // public method: destroys the slicebox instance
    this.destroy = callback => {
      _destroy.call(this, callback)
    }
  }
}

export default Slicebox