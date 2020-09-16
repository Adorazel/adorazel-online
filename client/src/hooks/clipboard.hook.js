import {alert as notie} from "notie"

const fallbackCopyTextToClipboard = (text, message) => {
  const textArea = document.createElement("textarea")
  textArea.value = text
  textArea.style.top = "0"
  textArea.style.left = "0"
  textArea.style.position = "fixed"
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    document.execCommand("copy")
    if (text) notie({text: message})
  } catch (err) {
    notie({text: "Произошла ошибка", type: "error"})
  }
  document.body.removeChild(textArea)
}

const useClipboard = ({text, message}) => {

  message = message || "Контакт скопирован в буфер обмена"

  if (!navigator.clipboard) return fallbackCopyTextToClipboard(text, message)

  navigator.clipboard.writeText(text).then(() => {
    if (text) notie({text: message})
  }, error => {
    notie({text: "Произошла ошибка", type: "error"})
    throw error
  })
}

export default useClipboard