
# 快速上手
本节将介绍如何在项目中使用 AS UI
----

## 使用前准备

> 在使用之前，推荐学习 `Vue` 和 `ES2015` ，并正确配置 `Node.js` v6.x 或以上版本

`AS-UI` 基于 `Vue.js` 2.x+ 版本开发，所以有必要了解以下基础知识：
- [Vue 组件](https://cn.vuejs.org/v2/guide/components.html)
- [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)

## 基于模板工程开发

> `Vue.js` 提供一个官方命令行工具 `vue-cli`，可用于快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。

```bash
> npm i -g vue-cli
> mkdir my-project && cd my-project
> vue init webpack
> npm i && npm i as-ui
```

## 标准开发

实际项目中，往往会使用 `webpack`，`rollup` 或者 `gulp` 的工作流，大多可以做到按需加载页面用到的组件，所以不推荐直接使用 `<script>` 标签全局引入的方式使用。




### 引入 AS UI
你可以引入整个 AS UI，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 AS UI
----
###### 完整引入

在 main.js 中写入以下内容：
```bash
import Vue from 'vue'
import AsUI from 'as-ui'
import 'as-ui/lib/theme/as-ui.css'
import App from './App.vue'

Vue.use(AsUI)

new Vue({
  el: '#app',
  components: { App }
})

```
以上代码便完成了 AS UI 的引入。需要注意的是，样式文件需要单独引入。
----
###### 按需引入

借助 [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。
首先，安装 `babel-plugin-component`：
```bash
npm install babel-plugin-component -D
```
然后，将 `.babelrc` 或者 `babel.config.js` 修改为：
```bash
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[
    [  'import',
      {
        libraryName: 'as-ui',
        libraryDirectory: 'lib',
        // 样式文件,因为打包后样式统一放在/lib/theme下,所以需要稍微转换下
        style: (name, file) => {
          const libDirIndex = name.lastIndexOf('/')
          const libDir = name.substring(0, libDirIndex)
          const fileName = name.substr(libDirIndex + 1)
          return `${libDir}/theme/${fileName}.css`;
        }
      }
    ]
  ]
}
```
如果你只希望引入部分组件，比如 Button 和 Cell，那么需要在 main.js 中写入以下内容：

```bash
import Vue from 'vue'
import { Button, Cell } from 'as-ui'
import App from './App.vue'

Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Cell)
 */

new Vue({
  el: '#app',
  components: { App }
})
```
## 开始使用

至此，一个基于 Vue 和 AS UI 的开发环境已经搭建完毕，现在就可以编写代码了。启动开发模式：

```bash
npm run dev
```
编译：

```bash
npm run build
```
各个组件的使用方法请参阅它们各自的文档。

## 自定义主题

`AS-UI` 各个组件的样式变量都存放在 `as-ui/lib/theme/as-ui.css` 文件中。用户可根据实际需要，自定义组件的样式
