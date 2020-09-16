export const isFunction = fn => fn && {}.toString.call(fn) === "[object Function]"

export const objToUrl = obj => {

  let str = ""

  if (obj instanceof Object && Object.keys(obj).length) {
    for (const key in obj) {
      if (str !== "") str += "&"
      str += key + "=" + encodeURIComponent(obj[key]);
    }
    return "/?" + str
  }

  return str
}

export const declination = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}

export const shuffle = array => {
  let currentIndex = array.length, temporaryValue, randomIndex

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue

  }

  return array
}

export const getRating = rating => {
  const output = []
  let rating_o = 5 - rating
  for (; rating; rating--) {
    output.push("icon-hex")
  }
  for (; rating_o; rating_o--) {
    output.push("icon-hex-o")
  }
  return output
}

export const setStyles = (el, styles) => {
  for (let [key, value] of Object.entries(styles)) {
    if (typeof value === "number" && key !== "zIndex") {
      value = value + "px"
      // console.log(key, value)
    }
    el.style[key] = value
  }
  return el
}

export const debounce = (func, timeout = 50) => {
  let timer
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, timeout, event)
  }
}

export const getWindowSize = () => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  return {width, height}
}

export const formatDate = date => {
  const d = new Date(date)
  let month = "" + (d.getMonth() + 1)
  let day = "" + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2)
    month = "0" + month
  if (day.length < 2)
    day = "0" + day

  return [year, month, day].join("-")
}

export const getDate = date => {

  const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
  const d = new Date(date)
  const year = d.getFullYear()
  const month = months[d.getMonth()]
  const day = d.getDate()

  return [day, month, year].join(" ")
}

export const stripTags = html => {
  const ws = new RegExp(String.fromCharCode(160), "g")
  const mdash = new RegExp(String.fromCharCode(8212), "g")
  return html.replace(ws, " ").replace(mdash, "—").replace(/(<([^>]+)>)/gi, "")
}
