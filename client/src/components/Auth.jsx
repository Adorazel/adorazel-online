import React, {useEffect, useRef} from "react"
import useForm from "../hooks/form.hook"
import {LOGIN, REGISTRATION} from "../api"


export const Auth = ({ADMIN, AUTH}) => {

  const emailRef = useRef(null)

  const {form, changeHandler, submitHandler, focusHandler, blurHandler, sending} = useForm({
    initialState: {
      login: {value: "", isValid: true},
      password: {value: "", isValid: true},
      email: {value: "", isValid: true},
    },
    onSuccess: json => {
      AUTH.login(json)
    }
  })

  const requestBody = {
    type: ADMIN ? "Admin" : "User",
    login: form.login.value,
    password: form.password.value,
    email: form.email.value,
  }

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  return (
    <section className="auth-page w-100">
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-lg-5 mx-auto">
            <div className="card pattern">
              <div className="aurora"/>
              <div className="card-body p-5">
                <h1 className="h5 card-title text-uppercase mb-4">
                  Вход{!ADMIN ? " и регистрация" : " в Панель управления"}
                </h1>
                <div className="form-group">
                  <label htmlFor="login" className="sr-only">Email</label>
                  <input type="email" id="email" name="email" placeholder="Email" data-placeholder="Email"
                         className={`form-control${ADMIN ? " mb-4" : ""}${form.email.isValid ? "" : " is-invalid"}`}
                         aria-describedby="emailHelp"
                         value={form.email.value} onChange={changeHandler} disabled={sending}
                         hidden
                  />
                  <input type="text" id="login" name="login" placeholder="Email" data-placeholder="Email"
                         className={`form-control${ADMIN ? " mb-4" : ""}${form.login.isValid ? "" : " is-invalid"}`}
                         aria-describedby="loginHelp"
                         value={form.login.value} onChange={changeHandler} disabled={sending}
                         onFocus={focusHandler} onBlur={blurHandler}
                         ref={emailRef}
                  />
                  {!ADMIN && <small id="loginHelp" className="form-text text-muted">
                    Мы никогда никому не передадим вашу электронную почту.
                  </small>}
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="sr-only">Пароль</label>
                  <input type="password" id="password" name="password" placeholder="Пароль" data-placeholder="Пароль"
                         className={`form-control${ADMIN ? " mb-4" : ""}${form.password.isValid ? "" : " is-invalid"}`}
                         aria-describedby="passwordHelp"
                         onFocus={focusHandler} onBlur={blurHandler}
                         value={form.password.value} onChange={changeHandler} disabled={sending}/>
                  {!ADMIN && <small id="passwordHelp" className="form-text text-muted">
                    Пароль должен содержать не менее 6 символов.
                  </small>}
                </div>
                <button className="btn btn-primary text-uppercase mr-3"
                        onClick={submitHandler.bind(this, LOGIN(requestBody))}
                        disabled={sending}>
                  Войти
                </button>
                {!ADMIN && <button className="btn btn-outline-primary text-uppercase"
                                   onClick={submitHandler.bind(this, REGISTRATION(requestBody))}
                                   disabled={sending}>
                  Зарегистрироваться
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Auth