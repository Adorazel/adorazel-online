import React from "react"
import File from "./File"

const Gallery = ({form, setForm, name, label, config, disabled}) => {

  let value = form[name].value
  if (!value) value = "[[]]"
  value = JSON.parse(value)

  const add = () => {
    value[value.length] = []
    setForm({
      ...form, [name]: {
        value: JSON.stringify(value),
        isValid: true
      }
    })
  }

  const remove = () => {
    if (value.length) {
      delete value[value.length - 1]
      setForm({
        ...form, [name]: {
          value: JSON.stringify([...value].filter(el => el !== undefined)),
          isValid: true
        }
      })
    }
  }

  return <div className="form-group">
    <label className="form-check-label">{label}</label>
    <table className="table">
      <thead>
      <tr>
        {config.map((value, index) => {
          return <th key={"gallery" + index} className="text-center"
                     style={{width: (100 / config.length) + "%"}}>
            {value}
          </th>
        })}
      </tr>
      </thead>
      <tbody>
      {value.map((row, rowIndex) => <tr key={rowIndex}>
          {config.map((_, itemIndex) => {
              return <td key={"gallery_" + rowIndex + "_" + itemIndex}>
                <File fileId={row[itemIndex]}
                      id={"gallery_" + rowIndex + "_" + itemIndex}
                      accept={["image/jpg", "image/jpeg", "image/png"]}
                      disabled={disabled}
                      callback={id => {
                          value[rowIndex][itemIndex] = id
                          setForm({
                            ...form, [name]: {
                              value: JSON.stringify(value),
                              isValid: true
                            }
                          })
                        }}/>
              </td>
            }
          )}
        </tr>
      )}
      </tbody>
    </table>
    <div className="d-flex justify-content-between">
      <button className="btn btn-success btn-sm" onClick={add}>Добавить Элемент</button>
      <button className="btn btn-danger btn-sm" onClick={remove}>Удалить Элемент</button>
    </div>
  </div>
}

export default Gallery