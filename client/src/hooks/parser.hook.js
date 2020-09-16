import {Parser} from "html-to-react"

const useParser = html => new Parser().parse(html)

export default useParser