/**
 * @author hainan dong
 * Date: 20/5/26
 */
import './theme-chalk/src/index.less'
import ASButton from './button/index.js'
const components = [ASButton]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ASButton
}
