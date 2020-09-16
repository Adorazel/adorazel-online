import React, {useCallback, useContext, useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {GET_FIELDS, GET, CREATE, EDIT} from "../../api"
import useHttp from "../../hooks/http.hook"
import useForm from "../../hooks/form.hook"
import useMessage from "../../hooks/message.hook"
import AdminContext from "../../context/AdminContext"
import Gallery from "./fields/Gallery"
import Checkbox from "./fields/Checkbox"
import Select from "./fields/Select"
import Number from "./fields/Number"
import Password from "./fields/Password"
import Email from "./fields/Email"
import Text from "./fields/Text"
import Richtext from "./fields/Richtext"
import Textarea from "./fields/Textarea"
import File from "./fields/File"
import DateTime from "./fields/DateTime"
import Tags from "./fields/Tags"

const Item = ({panel, section, tab, action, params: {id}, lexicon, galleryConfig}) => {

  const {token} = useContext(AdminContext)

  const [fields, setFields] = useState(null)
  const [item, setItem] = useState(null)
  const {loading, request} = useHttp()
  const {alert} = useMessage()
  const history = useHistory()

  const initialState = {}
  const {form, changeHandler: _changeHandler, submitHandler, sending, setForm} = useForm({
    initialState,
    onSuccess: data => {
      if (data && data.message) alert({text: data.message, type: "success"})
      history.push(`/${panel}/${section}/${tab}`)
    },
  })

  const getFields = useCallback(async () => {
    const fields = await request(...GET_FIELDS(tab, token))
    setFields(fields)
  }, [request, tab, token])

  const getItem = useCallback(async () => {
    let item = null
    if (action === "edit") item = await request(...GET(tab, id))
    setItem(item)
  }, [request, tab, action, id])

  useEffect(() => {
    getFields()
  }, [getFields])

  useEffect(() => {
    getItem()
  }, [getItem])

  const formIsReady = !!Object.keys(form).length

  useEffect(() => {
    if (!formIsReady) {
      if (fields) {
        const filteredFields = Object.keys(fields).filter(field => field !== "__v" && field !== "_id")
        if (action === "edit") {
          if (item) {
            filteredFields.forEach(field => {
              let value = item[field]
              if (field === "owner") value = `${section}/${tab}`
              initialState[field] = {
                value,
                isValid: true
              }
            })
          }
        } else {
          filteredFields.forEach(field => {
            let value = fields[field].defaultValue || ""
            if (field === "owner") value = `${section}/${tab}`
            if (field === "key") value = section + "_" + (fields[field].defaultValue || "")
            initialState[field] = {
              value,
              isValid: true
            }
          })
        }
      }
      if (Object.keys(initialState).length > 0) setForm(initialState)
    }
  }, [action, fields, item, formIsReady, form, setForm, initialState, section, tab])

  const changeHandler = ({target}) => {
    if (target.name === "key") {
      target = {
        name: target.name,
        value: section + "_" + target.value.split("_").slice(1),
      }
    }
    _changeHandler({target})
  }

  const getInput = (field, i) => {

    if (field === "__v" || field === "_id" || field === "owner") return null

    if (fields[field].instance === "Boolean") return (
      <Checkbox key={i} name={field} label={lexicon(field)} checked={!!form[field].value}
                disabled={sending} changeHandler={changeHandler}/>
    )

    switch (field) {

      case "value":

        switch (form["type"].value) {
          case "richtext":
            return <Richtext key={i} name={field} label={lexicon(field)} value={form[field].value}
                             changeHandler={changeHandler}/>
          case "textarea":
            return <Textarea key={i} name={field} label={lexicon(field)} value={form[field].value}
                             changeHandler={changeHandler} disabled={sending}/>
          case "image":
            return <div key={i} className="form-group">
              <label htmlFor={field}>{lexicon(field)}</label>
              <File fileId={form[field].value}
                    id={field}
                    name={field}
                    accept={["image/jpg", "image/jpeg", "image/png", "image/svg+xml"]}
                    disabled={sending}
                    callback={id => {
                      const target = {
                        name: field,
                        value: id,
                      }
                      _changeHandler({target})
                    }}/>
            </div>

          case "pdf":
            return <div key={i} className="form-group">
              <label htmlFor={field}>{lexicon(field)}</label>
              <File fileId={form[field].value}
                    id={field}
                    name={field}
                    accept={["application/pdf"]}
                    disabled={sending}
                    callback={id => {
                      const target = {
                        name: field,
                        value: id,
                      }
                      _changeHandler({target})
                    }}/>
            </div>

          default:
            return <Text key={i} name={field} label={lexicon(field)} value={form[field].value}
                         changeHandler={changeHandler} disabled={sending}/>
        }

      case "type":
        return <Select key={i} name={"type"} label={lexicon("type")} value={form["type"].value}
                       changeHandler={changeHandler} disabled={sending}
                       options={[{
                         value: "text",
                         label: "Текст"
                       }, {
                         value: "textarea",
                         label: "Текстовое поле"
                       }, {
                         value: "richtext",
                         label: "Текстовый редактор"
                       }, {
                         value: "image",
                         label: "Изображение"
                       }, {
                         value: "pdf",
                         label: "Файл PDF"
                       }]}/>

      case "image":
        return <div key={i} className="form-group">
          <label htmlFor={field}>{lexicon(field)}</label>
          <File fileId={form[field].value}
                id={field}
                name={field}
                accept={["image/jpg", "image/jpeg", "image/png", "image/svg+xml"]}
                disabled={sending}
                callback={id => {
                  const target = {
                    name: field,
                    value: id,
                  }
                  _changeHandler({target})
                }}/>
        </div>

      case "publishedon":
        return <DateTime key={i} name={"publishedon"} label={lexicon("publishedon")} value={form["publishedon"].value}
                         changeHandler={changeHandler} disabled={sending}/>

      case "posttags":
        return <Tags key={i} name={"posttags"} label={lexicon("posttags")} value={form["posttags"].value}
                     changeHandler={changeHandler} disabled={sending}/>

      case "rating":
        return <Number key={i} name={"rating"} label={lexicon("rating")} value={form["rating"].value} min={0} max={5}
                       changeHandler={changeHandler} disabled={sending}/>

      case "email":
        return <Email key={i} name={"email"} label={lexicon("email")} value={form["email"].value}
                      changeHandler={changeHandler} disabled={sending}/>

      case "password":
        return <Password key={i} name={"password"} label={lexicon("password")} value={form["password"].value}
                         minLength={6} changeHandler={changeHandler} disabled={sending}/>

      case "description":
        return <Textarea key={i} name={field} label={lexicon(field)} value={form[field].value}
                         changeHandler={changeHandler} disabled={sending}/>

      case "introtext":
        return <Richtext key={i} name="introtext" label={lexicon("introtext")} value={form["introtext"].value}
                         changeHandler={changeHandler}/>

      case "richtext":
        return <Richtext key={i} name="richtext" label={lexicon("richtext")} value={form["richtext"].value}
                         changeHandler={changeHandler}/>

      default:
        return <Text key={i} name={field} label={lexicon(field)} value={form[field].value}
                     changeHandler={changeHandler} disabled={sending}/>
    }
  }

  const getSubmitOptions = () => {
    const requestBody = {}
    if (formIsReady) {
      Object.keys(fields)
        .filter(field => field !== "__v" && field !== "_id")
        .forEach(field => {
          requestBody[field] = form[field].value
        })
    }
    if (action === "edit") return EDIT(tab, id, requestBody, token)
    return CREATE(tab, requestBody, token)
  }

  const isReady = !loading && formIsReady

  return <>
    <div className="d-flex align-items-end pt-4 pb-3">
      <Link to={`/${panel}/${section}/${tab}`} className="btn btn-outline-primary text-uppercase"
            disabled={sending}>Назад</Link>
      <h1 className="h4 text-center text-uppercase w-100 m-0">{action === "create" ? "Создание" : "Редактирование"}</h1>
      <button className="btn btn-primary text-uppercase"
              onClick={submitHandler.bind(this, getSubmitOptions())} disabled={sending}>
        {action === "create" ? "Создать" : "Обновить"}
      </button>
    </div>
    {!isReady && <div className="text-center mt-5">
      <div className="spinner-border text-primary"/>
    </div>}
    {isReady && <div className="row">
      <div className="col-9">
        {fields && Object.keys(fields)
          .filter(field => field !== "position" && field !== "published" && field !== "publishedon" && field !== "gallery")
          .map((field, i) => getInput(field, i)
          )}
      </div>
      <div className="col-3">
        {fields && Object.keys(fields)
          .filter(field => ((field === "position" || field === "published" || field === "publishedon") && field !== "gallery"))
          .map((field, i) => getInput(field, i)
          )}
      </div>
      {form["gallery"] && <div className="col-12">
        <Gallery form={form} setForm={setForm} name={"gallery"} label={lexicon("gallery")}
                 config={galleryConfig} disabled={sending}/>
      </div>}
    </div>}
  </>
}

export default Item