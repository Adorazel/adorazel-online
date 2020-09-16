import React from "react"
import {formatDate} from "../../../utils"

const DateTime = ({name, label, value, changeHandler: _changeHandler, disabled}) => {

  value = new Date(value).getTime()
  value = formatDate(value)

  const changeHandler = ({target}) => {
    target = {
      name: target.name,
      value: Date.parse(target.value)
    }
    _changeHandler({target})
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input type="date" id={name} name={name} className="form-control" value={value}
             onChange={changeHandler.bind(this)} disabled={disabled}/>
    </div>
  )
}

export default DateTime