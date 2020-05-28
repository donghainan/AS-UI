import Vue from 'vue'
import App from './App.vue'
import router from './router'
import hljs from 'highlight.js'

import demoBlock from './components/demo-block.vue'
import './assets/less/common.less' // 公共样式
import './demo-styles/index.less' // 文档 展示样式
Vue.component('demo-block', demoBlock)

router.afterEach(() => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
