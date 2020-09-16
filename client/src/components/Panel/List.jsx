import React, {useCallback, useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {Tooltip} from "react-tippy"
import AdminContext from "../../context/AdminContext"
import {DELETE, GET_ALL, PUBLISH} from "../../api"
import useHttp from "../../hooks/http.hook"
import useMessage from "../../hooks/message.hook"


const List = ({panel, section, tab, fields, lexicon}) => {

  const {token} = useContext(AdminContext)

  const [items, setItems] = useState(null)

  const {loading, request, error, clearError} = useHttp()
  const {alert, confirm} = useMessage()

  useEffect(() => {
    if (error && error.message) {
      alert({text: error.message, type: "error"})
      clearError()
    }
  }, [error, alert, clearError])

  const getItemsAll = useCallback(async () => {

    const data = await request(...GET_ALL(tab, {
      owner: `${section}/${tab}`
    }))
    setItems(data)
  }, [request, section, tab])

  useEffect(() => {
    getItemsAll()
  }, [getItemsAll])

  const editItem = id => `/${panel}/${section}/${tab}/edit?id=${id}`

  const publishItem = async (id, published) => {
    const data = await request(...PUBLISH(tab, id, published, token))
    if (data) {
      alert({
        text: (data.published ? "Опубликовано" : "Снято с публикации"),
        type: (data.published ? "success" : "info")
      })
      getItemsAll()
    }
  }

  const deleteItem = id => {
    confirm({
      text: "Вы действительно хотите это удалить?",
      onSubmit: async () => {
        const data = await request(...DELETE(tab, id, token))
        if (data) {
          alert({text: data.message, type: "success"})
          getItemsAll()
        }
      }
    })
  }

  return <>
    <div className="pt-4 pb-3">
      <Link to={`/${panel}/${section}/${tab}/create`} onClick={() => setItems(null)}
            className="btn btn-primary text-uppercase" disabled={loading}>
        Создать
      </Link>
    </div>
    {loading && <div className="text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>}
    {!loading && <table className="table">
      <thead>
      <tr>
        <th>#</th>
        {fields.map((field, index) => <th key={index}>{lexicon(field)}</th>)}
        <th/>
      </tr>
      </thead>
      <tbody>
      {(!items || !items.length) && <tr>
        <td colSpan={2 + fields.length} className="text-center">Пусто</td>
      </tr>}
      {!!items && items.map((item) => {
        const style = {}
        if (typeof item["published"] === "boolean") {
          if (!item["published"]) style.opacity = .5
        }
        return (
          <tr key={item._id}>
            <td style={style}>{item["position"]}</td>
            {fields.map((key, index) => <td key={index} style={style}>
              {item[key]}
            </td>)}
            <td className="text-nowrap text-right">
              <Tooltip position="bottom" title="Редактировать">
                <Link to={editItem.bind(this, item._id)} onClick={() => setItems(null)}
                      className="btn btn-sm btn-outline-success">
                  <i className="icon-edit"/>
                </Link>
              </Tooltip>
              {typeof item["published"] === "boolean" && <>
                {" "}
                <Tooltip position="bottom" title={item["published"] ? "Снять с публикации" : "Опубликовать"}>
                  <button className={`btn btn-sm btn-outline-warning`}
                          onClick={publishItem.bind(this, item["_id"], !item["published"])}>
                    <i className={item["published"] ? "icon-unpublish" : "icon-publish"}/>
                  </button>
                </Tooltip>
              </>}
              {" "}
              <Tooltip position="bottom" title="Удалить">
                <button className="btn btn-sm btn-outline-danger"
                        onClick={deleteItem.bind(this, item["_id"])}>
                  <i className="icon-trash"/>
                </button>
              </Tooltip>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>}

  </>
}

export default List