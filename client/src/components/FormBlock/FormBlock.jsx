import React from "react"
import useForm from "../../hooks/form.hook"
import {POST_FORM} from "../../api"
import NumberFormat from 'react-number-format'

const FormBlock = () => {

  const {form, changeHandler, submitHandler, focusHandler, blurHandler, sending} = useForm({
    initialState: {
      name: {value: "", isValid: true},
      phone: {value: "", isValid: true},
      email: {value: "", isValid: true},
      contact: {value: "", isValid: true},
      message: {value: "", isValid: true}
    },
  })

  const getSubmitOptions = () => POST_FORM({
    formName: "Форма на главной",
    name: form.name.value,
    phone: form.phone.value.replace(/\s/g, ""),
    email: form.email.value,
    contact: form.contact.value,
    message: form.message.value,
  })

  return (
    <div className="contact-form">
      <div className="form-group mb-2">
        <label htmlFor="login" className="sr-only">Имя</label>
        <input type="text" name="name" id="name" placeholder="Имя" data-placeholder="Имя"
               className={`form-control${form.name.isValid ? "" : " is-invalid"}`}
               disabled={sending} value={form.name.value} onChange={changeHandler}
               onFocus={focusHandler.bind(this)} onBlur={blurHandler.bind(this)}/>
      </div>
      <div className="form-group mb-2">
        <label htmlFor="phone" className="sr-only">Телефон</label>
        <NumberFormat type="text" name="phone" id="phone" placeholder="Телефон" data-placeholder="Телефон"
                      className={`form-control${form.phone.isValid ? "" : " is-invalid"}`}
                      format="+7 ### ### ####" mask=" "
                      disabled={sending} value={form.phone.value} onChange={changeHandler}
                      onFocus={focusHandler.bind(this)} onBlur={blurHandler.bind(this)}/>
      </div>
      <div className="form-group mb-2">
        <label htmlFor="email" className="sr-only" hidden>Email</label>
        <input type="email" name="email" id="email" placeholder="Email" data-placeholder="Email"
               className={`form-control${form.email.isValid ? "" : " is-invalid"}`}
               disabled={sending} value={form.email.value} onChange={changeHandler} hidden
               onFocus={focusHandler.bind(this)} onBlur={blurHandler.bind(this)}/>
        <label htmlFor="contact" className="sr-only">Email</label>
        <input type="text" name="contact" id="contact" placeholder="Email" data-placeholder="Email"
               className={`form-control${form.contact.isValid ? "" : " is-invalid"}`}
               disabled={sending} value={form.contact.value} onChange={changeHandler}
               onFocus={focusHandler.bind(this)} onBlur={blurHandler.bind(this)}/>
      </div>
      <div className="form-group mb-2">
        <label htmlFor="message" className="sr-only">Сообщение</label>
        <textarea name="message" id="message" rows="2" placeholder="Сообщение" data-placeholder="Сообщение"
                  className={`form-control${form.message.isValid ? "" : " is-invalid"}`}
                  disabled={sending} value={form.message.value} onChange={changeHandler}
                  onFocus={focusHandler.bind(this)} onBlur={blurHandler.bind(this)}/>
      </div>
      <div className="text-right">
        <button className="btn btn-outline-primary text-uppercase"
                disabled={sending} onClick={submitHandler.bind(this, getSubmitOptions())}>
          Отправить
        </button>
      </div>
    </div>
  )
}

export default FormBlock