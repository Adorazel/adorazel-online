import React, {useCallback, useContext, useEffect, useRef, useState} from "react"
import AdminContext from "../../../context/AdminContext"
import useHttp from "../../../hooks/http.hook"
import useMessage from "../../../hooks/message.hook"
import {POST_FILE, DELETE_FILE, GET_FILE} from "../../../api"


const File = ({id, name = "files", accept = null, fileId = null, callback, disabled}) => {

  const [state, setState] = useState({id: null, file: null, name: null})

  const {token} = useContext(AdminContext)
  const {loading, request} = useHttp()
  const {alert} = useMessage()
  const fileInput = useRef(null)

  const getUploadInfo = useCallback(async (id) => {
    const data = await request(...GET_FILE(id))
    data && setState({id: data._id, file: data.path, name: data.file.name})
  }, [request])

  useEffect(() => {
    if (fileId) getUploadInfo(fileId)
  }, [getUploadInfo, fileId])

  const changeHandler = async () => {

    try {
      const files = Array.from(fileInput.current.files)

      let isValid = true
      accept && files.forEach(file => {
        if (!accept.includes(file.type)) {
          alert({text: "Недопустимый формат файла", type: "error"})
          isValid = false
        }
      })
      if (!isValid) return

      const body = new FormData()
      files.forEach((file, index) => {
        body.append(`files_${index}`, file)
      })

      const data = await request(...POST_FILE(body, token))

      if (data) {
        if (state.id) {
          await request(...DELETE_FILE(state.id, token))
        }
        setState({
          id: data.upload._id,
          file: data.upload.path,
          name: data.upload.file.name
        })
        callback(data.upload._id)
      }

    } catch (e) {
      console.log(e)
    }

  }

  return <>
    <div className="input-group mb-3">
      <div className="custom-file">
        <input type="file" id={id} name={name} className="custom-file-input" disabled={disabled || loading}
               ref={fileInput} onChange={changeHandler} accept={accept.join(", ")}/>
        <label className="custom-file-label text-nowrap overflow-hidden" htmlFor={id}>{state.name}</label>
      </div>
    </div>
    {state.file && <img src={state.file} className="img-fluid" alt=""/>}
  </>
}

export default File