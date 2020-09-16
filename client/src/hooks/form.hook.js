import {useEffect, useState} from "react"
import useHttp from "./http.hook"
import useMessage from "./message.hook"
import {isFunction} from "../utils"


const useForm = ({initialState, onSuccess, onError}) => {

  const [form, setForm] = useState(initialState)

  const {loading, error, request, clearError} = useHttp()
  const {alert} = useMessage()


  if (!isFunction(onSuccess)) onSuccess = data => {
    if (data && data.message) alert({text: data.message, type: "success"})
    setForm(initialState)
  }

  if (!isFunction(onError)) onError = error => {

    if (error && error.data) {
      const param = error.data[0].param
      setForm({
        ...form,
        [param]: {
          value: form[param].value,
          isValid: false
        }
      })
    }
    if (error && error.message) alert({text: error.message, type: "error"})
    clearError()
  }

  useEffect(() => {
    onError(error)
  }, [error, onError])


  const focusHandler = event => {
    if (event.target.placeholder) event.target.placeholder = ""
  }

  const blurHandler = event => {
    if (event.target.dataset.placeholder) {
      event.target.placeholder = event.target.dataset.placeholder
    }
  }

  const changeHandler = ({target}) => {

    if (target.type === "checkbox" || target.type === "radio") {
      target = {
        name: target.name,
        value: target.checked,
      }
    }

    if (target.min  && target.value < target.min ) {
      target = {
        name: target.name,
        value: target.min,
      }
    }

    if (target.max  && target.value > target.max ) {
      target = {
        name: target.name,
        value: target.max,
      }
    }

    setForm({
      ...form,
      [target.name]: {
        value: target.value,
        isValid: true
      }
    })

  }

  const submitHandler = async requestOptions => {
    const data = await request(...requestOptions)
    if (data) onSuccess(data)
  }
  return {form, changeHandler, submitHandler, focusHandler, blurHandler, sending: loading, setForm}
}

export default useForm