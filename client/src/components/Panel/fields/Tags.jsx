import React, {useCallback, useEffect, useRef, useState} from "react"
import {GET_ALL} from "../../../api";
import useHttp from "../../../hooks/http.hook";

const Tags = ({name: fieldName, label, value = "[]", disabled, changeHandler: _changeHandler}) => {

  const selected = useRef()
  selected.current = JSON.parse(value)

  console.log()

  const [options, setOptions] = useState(null)
  const {request} = useHttp()
  const select = useRef()

  const getOptions = useCallback(async () => {
    const data = await request(...GET_ALL("tags", {
      owner: "blog/tags",
    }))
    selected.current = selected.current.filter(value => data.includes(value))
    setOptions(data)
  }, [selected, request, setOptions])

  useEffect(() => {
    if (!options) getOptions()
  }, [options, getOptions])

  const changeHandler = ({target}) => {
    if (selected.current.includes(target.value)) {
      selected.current = selected.current.filter(item => item !== target.value)
    } else {
      selected.current.push(target.value)
    }
    target = {
      name: target.name,
      value: JSON.stringify(selected.current)
    }
    _changeHandler({target})
  }


  return (<>
    {options && <div className="form-group">
      <label htmlFor={fieldName}>{label}</label>
      <select ref={select} id={fieldName} name={fieldName} className="custom-select" value={selected.current}
              onChange={changeHandler.bind(this)} disabled={disabled} multiple>
        {options.map(({key, name}, i) => {
          return <option key={`${fieldName}_${i}`} value={key}>{name}</option>
        })}
      </select>
    </div>}
  </>)
}

export default Tags