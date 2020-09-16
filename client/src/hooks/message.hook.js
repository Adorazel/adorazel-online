import {useCallback} from "react";
import notie  from "notie"

const useMessage = () => {

  const confirm = useCallback(({text, onSubmit, onCancel}) => {
    notie.confirm({
      text,
      submitText: "Да",
      cancelText: "Нет",
      submitCallback: onSubmit,
      cancelCallback: onCancel,
    })
  }, [])


  const alert =  useCallback(({text, type}) => {
    type = type || "info"
    if (text) notie.alert({type, text})
  }, [])

  return {alert, confirm}
}

export default useMessage