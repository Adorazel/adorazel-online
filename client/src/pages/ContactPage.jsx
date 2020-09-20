import React, {useContext, useEffect, useState} from "react"
import SettingsContext from "../context/SettingsContext"
import FormBlock from "../components/FormBlock"
import {Tooltip} from "react-tippy"
import useGallery from "../hooks/gallery.hook"
import Helmet from "react-helmet"
import {stripTags} from "../utils"

const ContactPage = () => {

  const {
    contacts_bg,
    contacts_skype,
    contacts_telegram,
    contacts_email,
    contacts_icq,
    contacts_title
  } = useContext(SettingsContext)

  const {gallery, getGallery} = useGallery()
  const [title, setTitle] = useState(null)

  useEffect(() => {
    if (!gallery && contacts_bg) {
      getGallery([[contacts_bg]])
    }
  }, [contacts_bg, gallery, getGallery])

  useEffect(() => {
    contacts_title && setTitle(`${stripTags(contacts_title)} | Adorazel Online`)
  }, [contacts_title])

  return (<>
    <Helmet>
      {title && <title>{title}</title>}
    </Helmet>
    {gallery && <img src={gallery[0][0]} alt="" className="position-absolute w-100" style={{pointerEvents: "none"}}/>}
    <h1 hidden>Контакты</h1>
    <section className="contact-page container content-body py-5 d-flex align-items-end">
      <div className="row flex-grow-1">
        <div className="col-12 col-lg-9 mx-auto">
          <div className="card pattern">
            <div className="card-body px-4 py-5 p-sm-5">
              <div className="row">
                <div className="col-xs-12 col-md-6" style={{fontSize: "1.125rem"}}>
                  <h3 className="h5 card-title text-uppercase mt-0 mb-4">
                    Свяжись со мной
                  </h3>
                  {contacts_skype
                  && <p>Skype: <Tooltip tag="span" position="bottom" title="Позвонить">
                    <a href={`skype:${contacts_skype}?call`} className="text-decoration-none"
                       target="_blank" rel="noreferrer noopener">
                      {contacts_skype}
                    </a>
                  </Tooltip>
                  </p>}
                  {contacts_telegram
                  && <p>Telegram: <Tooltip tag="span" position="bottom" title="Написать">
                    <a href={`tg://resolve?domain=${contacts_skype}`} className="text-decoration-none"
                       target="_blank" rel="noreferrer noopener">
                      @{contacts_telegram}
                    </a>
                  </Tooltip>
                  </p>}
                  {contacts_email
                  && <p>Email: <Tooltip tag="span" position="bottom" title="Отправить письмо">
                    <a href={`mailto:${contacts_email}`} className="text-decoration-none"
                       target="_blank" rel="noreferrer noopener">
                      {contacts_email}
                    </a>
                  </Tooltip>
                  </p>}
                  {contacts_icq
                  && <p>ICQ: <Tooltip tag="span" position="bottom" title="Ну а вдруг?!">
                    <a href={`https://icq.im/${contacts_icq}`} className="text-decoration-none"
                       target="_blank" rel="noreferrer noopener">
                      {contacts_icq}
                    </a>
                  </Tooltip>
                  </p>}
                </div>
                <div className="col-xs-12 col-md-6">
                  <h3 className="h5 card-title text-uppercase mt-0 mb-3">
                    Напиши мне
                  </h3>
                  <FormBlock/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>)
}

export default ContactPage


