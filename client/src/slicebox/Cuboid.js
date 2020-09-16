import {setStyles} from "../utils"

function _setSize() {

  this.size = {
    width: this.config.o === "v"
      ? Math.floor(this.config.size.width / this.config.cuboidsCount)
      : this.config.size.width,
    height: this.config.o === "v"
      ? this.config.size.height
      : Math.floor(this.config.size.height / this.config.cuboidsCount)
  }

  // extra space to fix gaps
  this.extra = this.config.o === "v"
    ? this.config.size.width - (this.size.width * this.config.cuboidsCount)
    : this.config.size.height - (this.size.height * this.config.cuboidsCount)

}

function _configureStyles() {

  // style for the cuboid element
  // set z-indexes based on the cuboid"s position
  const middlePos = Math.ceil(this.config.cuboidsCount / 2)
  const positionStyle = this.pos < middlePos
    ? {
      zIndex: (this.pos + 1) * 100,
      left: (this.config.o === "v") ? this.size.width * this.pos : 0,
      top: (this.config.o === "v") ? 0 : this.size.height * this.pos
    }
    : {
      zIndex: (this.config.cuboidsCount - this.pos) * 100,
      left: (this.config.o === "v") ? this.size.width * this.pos : 0,
      top: (this.config.o === "v") ? 0 : this.size.height * this.pos
    }

  // how much this cuboid is going to move (left or top values)
  this.disperseFactor = this.config.disperseFactor * ((this.pos + 1) - middlePos)

  this.style = {
    transition: "transform " + this.config.speed + "ms " + this.config.easing,
    ...positionStyle,
    ...this.size
  }

  const rotationDirection = this.config.reverse ? "" : "-"; //default negative
  const oppositeRotationDirection = this.config.reverse ? "-" : ""; //default positive

  this.animationStyles = {
    side1: (this.config.o === "v")
      ? {transform: "translate3d(0, 0, -" + (this.size.height / 2) + "px)"}
      : {transform: "translate3d(0, 0, -" + (this.size.width / 2) + "px)"},
    side2: (this.config.o === "v")
      ? {transform: "translate3d(0, 0, -" + (this.size.height / 2) + "px) rotate3d(1, 0, 0, " + rotationDirection + "90deg)"}
      : {transform: "translate3d(0, 0, -" + (this.size.width / 2) + "px) rotate3d(0, 1, 0, " + rotationDirection + "90deg)"},
    side3: (this.config.o === "v")
      ? {transform: "translate3d(0, 0, -" + (this.size.height / 2) + "px) rotate3d(1, 0, 0, " + rotationDirection + "180deg)"}
      : {transform: "translate3d(0, 0, -" + (this.size.width / 2) + "px) rotate3d(0, 1, 0, " + rotationDirection + "180deg)"},
    side4: (this.config.o === "v")
      ? {transform: "translate3d(0, 0, -" + (this.size.height / 2) + "px) rotate3d(1, 0, 0, " + oppositeRotationDirection + "90deg)"}
      : {transform: "translate3d(0, 0, -" + (this.size.width / 2) + "px) rotate3d(0, 1, 0, " + oppositeRotationDirection + "90deg)"}
  }

  const measure = (this.config.o === "v") ? this.size.height : this.size.width

  this.sidesStyles = {
    frontSideStyle: {
      width: (this.config.o === "v") ? this.size.width + this.extra : this.size.width,
      height: (this.config.o === "v") ? this.size.height : this.size.height + this.extra,
      backgroundColor: this.config.colorHiddenSides,
      transform: "rotate3d(0, 1, 0, 0deg) translate3d(0, 0, " + (measure / 2) + "px)",
    },
    backSideStyle: {
      width: this.size.width,
      height: this.size.height,
      backgroundColor: this.config.colorHiddenSides,
      transform: "rotate3d(0, 1, 0, " + oppositeRotationDirection + "180deg) translate3d(0, 0, " + (measure / 2) + "px) rotateZ(" + oppositeRotationDirection + "180deg)",
    },
    rightSideStyle: {
      width: measure,
      height: (this.config.o === "v") ? this.size.height : this.size.height + this.extra,
      left: (this.config.o === "v") ? this.size.width / 2 - this.size.height / 2 : 0,
      backgroundColor: this.config.colorHiddenSides,
      transform: "rotate3d(0, 1, 0, " + oppositeRotationDirection + "90deg) translate3d(0, 0, " + (this.size.width / 2) + "px)",
    },
    leftSideStyle: {
      width: measure,
      height: (this.config.o === "v") ? this.size.height : this.size.height + this.extra,
      left: (this.config.o === "v") ? this.size.width / 2 - this.size.height / 2 : 0,
      backgroundColor: this.config.colorHiddenSides,
      transform: "rotate3d(0, 1, 0, " + rotationDirection + "90deg) translate3d(0, 0, " + (this.size.width / 2) + "px)",
    },
    topSideStyle: {
      width: (this.config.o === "v") ? this.size.width + this.extra : this.size.width,
      height: measure,
      top: (this.config.o === "v") ? 0 : this.size.height / 2 - this.size.width / 2,
      backgroundColor: this.config.colorHiddenSides,
      transform: "rotate3d(1, 0, 0, " + oppositeRotationDirection + "90deg) translate3d(0, 0, " + (this.size.height / 2) + "px)",
    },
    bottomSideStyle: {
      width: (this.config.o === "v") ? this.size.width + this.extra : this.size.width,
      height: measure,
      top: (this.config.o === "v") ? 0 : this.size.height / 2 - this.size.width / 2,
      backgroundColor: this.config.colorHiddenSides,
      transform: "rotate3d(1, 0, 0, " + rotationDirection + "90deg) translate3d(0, 0, " + (this.size.height / 2) + "px)",
    }
  }
}

function _showImage(imgPos) {

  let sideIdx
  const $item = this.config.items[imgPos]
  const imgParam = {
    backgroundSize: this.config.size.width + "px " + this.config.size.height + "px"
  }

  imgParam.backgroundImage = "url(" + $item.querySelector("img").getAttribute("src") + ")"

  switch (this.side) {
    case 1 :
      sideIdx = 0
      break
    case 2 :
      sideIdx = (this.config.o === "v") ? 4 : 2
      break
    case 3 :
      sideIdx = 1
      break
    case 4 :
      sideIdx = (this.config.o === "v") ? 5 : 3
      break
    default:
      break
  }

  imgParam.backgroundPosition = (this.config.o === "v")
    ? -(this.pos * this.size.width) + "px 0px"
    : "0px -" + (this.pos * this.size.height) + "px"

  setStyles(this.$el.children[sideIdx], imgParam)

}

class Cuboid {

  constructor(config, pos) {

    this.config = config
    this.pos = pos
    this.side = 1

    _setSize.call(this)
    _configureStyles.call(this)

    this.getEl = () => {

      this.$el = document.createElement("div")
      this.$el.classList.add("sb-cuboid")
      setStyles(this.$el, this.style)
      setStyles(this.$el, this.animationStyles.side1)

      const appendSide = (el, styles) => {
        const side = document.createElement("div")
        side.classList.add("sb-side")
        setStyles(side, styles)
        el.appendChild(side)
      }

      appendSide(this.$el, this.sidesStyles.frontSideStyle)
      appendSide(this.$el, this.sidesStyles.backSideStyle)
      appendSide(this.$el, this.sidesStyles.rightSideStyle)
      appendSide(this.$el, this.sidesStyles.leftSideStyle)
      appendSide(this.$el, this.sidesStyles.topSideStyle)
      appendSide(this.$el, this.sidesStyles.bottomSideStyle)

      _showImage.call(this, this.config.prev)

      return this.$el

    }

    this.rotate = callback => {

      let animationStyle

      setTimeout(() => {

        if (this.config.direction === "next") {

          switch (this.side) {
            case 1 :
              animationStyle = this.animationStyles.side2
              this.side = 2
              break
            case 2 :
              animationStyle = this.animationStyles.side3
              this.side = 3
              break
            case 3 :
              animationStyle = this.animationStyles.side4
              this.side = 4
              break
            case 4 :
              animationStyle = this.animationStyles.side1
              this.side = 1
              break
            default:
              break
          }

        } else {

          switch (this.side) {
            case 1 :
              animationStyle = this.animationStyles.side4
              this.side = 4
              break
            case 2 :
              animationStyle = this.animationStyles.side1
              this.side = 1
              break
            case 3 :
              animationStyle = this.animationStyles.side2
              this.side = 2
              break
            case 4 :
              animationStyle = this.animationStyles.side3
              this.side = 3
              break
            default:
              break
          }

        }

        _showImage.call(this, this.config.current)

        let animateOut
        let animateIn

        if (this.config.o === "v") {
          animateOut = [{left: this.$el.offsetLeft + "px"}, {left: this.$el.offsetLeft + this.disperseFactor + "px"}]
          animateIn = [{left: this.$el.offsetLeft + this.disperseFactor + "px"}, {left: this.$el.offsetLeft + "px"}]
        } else if (this.config.o === "h") {
          animateOut = [{top: this.$el.offsetTop + "px"}, {top: this.$el.offsetTop + this.disperseFactor + "px"}]
          animateIn = [{top: this.$el.offsetTop + this.disperseFactor + "px"}, {top: this.$el.offsetTop + "px"}]
        }

        setStyles(this.$el, animationStyle)

        this.$el.animate(animateOut, this.config.speed / 2)

        setTimeout(() => {
          this.$el.animate(animateIn, this.config.speed / 2)
        }, this.config.speed / 2)

        setTimeout(() => {
          if (callback) callback.call(this, this.pos)
        }, this.config.speed)

      }, this.config.sequentialFactor * this.pos + 30)

    }
  }
}

export default Cuboid