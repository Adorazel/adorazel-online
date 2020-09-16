import React, {useState} from "react"
import {Editor} from "@tinymce/tinymce-react"

const TextEditor = (config, {initialValue = "", callback = () => {}, customConfig = {}}) => {

  const [isReady, setIsReady] = useState(false)

  config = {
    ...config,
    ...customConfig,
    setup: editor => {
      editor.on('init', () => {
        setIsReady(true)
      })
    }
  }

  const changeHandler = content => {
    callback(content)
  }

  return (<>
    {!isReady && <div className="d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary"/>
    </div>}
    <div className="editor" style={{display: isReady ? "" : "none"}}>
      <Editor initialValue={initialValue} init={config} onEditorChange={changeHandler}/>
    </div>
  </>)
}

export default TextEditor