import Vue from 'vue'

import marked from 'marked'

marked.setOptions({
  gfm: true,
  breaks: true,
  tables: true
})

Vue.prototype.$marked = marked