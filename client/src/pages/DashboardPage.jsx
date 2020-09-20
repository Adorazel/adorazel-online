import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import AdminContext from "../context/AdminContext"
import useMessage from "../hooks/message.hook"
import Panel from "../components/Panel/Panel"
import {Helmet} from "react-helmet"

const LEXICON = {
  // panel
  dashboard: "Панель управления",
  main: "Главная",
  tiles: "Плитки",
  skills: "Skills",
  tools: "Tools",
  social: "Социальные сети",
  portfolio: "Портфолио",
  projects: "Проекты",
  about: "Обо мне",
  work: "Опыт работы",
  education: "Образование",
  settings: "Настройки",
  blog: "Блог",
  posts: "Статьи",
  tags: "Тэги",
  contacts: "Контакты",
  seo: "SEO",
  redirects: "Редиректы",
  global: "Глобальные настройки",

  // fields
  title: "Заголовок",
  longtitle: "Расширенный заголовок",
  description: "Краткое описание",
  keywords: "Ключевые слова",
  introtext: "Вступление",
  uri: "Ссылка",
  gallery: "Галерея",
  position: "Позиция в списке",
  published: "Опубликован",
  publishedon: "Дата публикации",
  icon: "Иконка",
  link: "Ссылка",
  rating: "Рейтинг",
  place: "Место",
  post: "Должность",
  date: "Срок",
  key: "Уникальный ключ",
  value: "Значение",
  type: "Тип",
  richtext: "Полное описание",
  image: "Изображение",
  slides: "Слайды",
  name: "Название",
  posttags: "Тэги"
}

const CONFIG = {
  dashboard: {
    main: {
      tiles: {
        fields: ["title", "description", "uri"],
        gallery: [
          "420×320",
          "250×250 510×250 250×510",
          "225×225 460×225 225×460",
          "270×270 550×270 270×550",
        ]
      },
      skills: {
        fields: ["title", "icon", "link"],
      },
      seo: {
        fields: ["key", "value"],
      },
    },
    portfolio: {
      projects: {
        fields: ["title", "description", "uri"],
        gallery: ["1920×1000"]
      },
      settings: {
        fields: ["key", "value"],
      },
      seo: {
        fields: ["key", "value"],
      },
    },
    about: {
      settings: {
        fields: ["key", "value"],
      },
      work: {
        fields: ["place", "post", "date"],
      },
      education: {
        fields: ["place", "post", "date"],
      },
      skills: {
        fields: ["title", "rating"],
      },
      tools: {
        fields: ["title", "rating"],
      },
      social: {
        fields: ["title", "icon", "link"],
      },
      seo: {
        fields: ["key", "value"],
      },
    },
    blog: {
      posts: {
        fields: ["title", "description", "introtext"],
        gallery: ["Любой размер", "Превью 16:9"]
      },
      slides: {
        fields: ["title", "description", "link"],
        gallery: ["1920×720"]
      },
      tags: {
        fields: ["key", "name"]
      },
      seo: {
        fields: ["key", "value"],
      },
    },
    contacts: {
      settings: {
        fields: ["key", "value"],
      },
      seo: {
        fields: ["key", "value"],
      },
    },
    global: {
      seo: {
        fields: ["key", "value"],
      },
      redirects: {
        fields: ["from", "to"],
      },
    }
  }
}

const DashboardPage = () => {

  const {logout} = useContext(AdminContext)
  const history = useHistory()
  const {alert} = useMessage()

  const logoutHandler = () => {
    logout()
    alert({text: "Вы вышли из Панели управления"})
    history.push("/")
  }

  return (
    <div className="content-body">
      <Helmet>
        <title>Панель управления | Adorazel Online</title>
      </Helmet>
      <section className="dashboard-page">
        <div className="px-4 py-5">
          <div className="text-right">
            <button className="btn btn-danger text-uppercase" onClick={logoutHandler}>Выйти</button>
          </div>
          <Panel {...{LEXICON, CONFIG}}/>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
