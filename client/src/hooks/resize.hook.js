import {useState, useLayoutEffect} from "react"

const useResize = () => {

  const [size, setSize] = useState({x: 0, y: 0})

  useLayoutEffect(() => {

    const updateSize = () => {

      const w = window, d = document,
        e = d.documentElement,
        g = d.getElementsByTagName("body")[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight

      setSize({x, y})
    }

    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)

  }, [])

  return size
}

export default useResize