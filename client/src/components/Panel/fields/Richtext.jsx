import React from "react"
import TextEditor from "../../TextEditor";

const Richtext = ({name, label, value, changeHandler, config = {}}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <TextEditor
      id={name}
      initialValue={value}
      customConfig={config}
      callback={content => {
        const target = {
          name,
          value: content,
        }
        changeHandler({target})
      }}/>
  </div>
)

export default Richtext