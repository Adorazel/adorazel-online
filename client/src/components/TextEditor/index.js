import "tinymce/tinymce"

import "tinymce/themes/silver/theme"
import "tinymce/themes/mobile/theme"

import "./langs/ru"

import "tinymce/icons/default/icons"

import "tinymce/plugins/advlist/plugin"
import "tinymce/plugins/autolink/plugin"
import "tinymce/plugins/lists/plugin"
import "tinymce/plugins/charmap/plugin"
import "tinymce/plugins/print/plugin"
import "tinymce/plugins/preview/plugin"
import "tinymce/plugins/anchor/plugin"
import "tinymce/plugins/visualblocks/plugin"
import "tinymce/plugins/searchreplace/plugin"
import "tinymce/plugins/code/plugin"
import "tinymce/plugins/searchreplace/plugin"
import "tinymce/plugins/fullscreen/plugin"
import "tinymce/plugins/insertdatetime/plugin"
import "tinymce/plugins/media/plugin"
import "tinymce/plugins/image/plugin"
import "tinymce/plugins/link/plugin"
import "tinymce/plugins/table/plugin"
import "tinymce/plugins/paste/plugin"
import "tinymce/plugins/hr/plugin"
import "tinymce/plugins/wordcount/plugin"


import config from "./config/default.json"
import TextEditor from "./TextEditor"
import "./TextEditor.scss"

export default TextEditor.bind(this, config)