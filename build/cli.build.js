const { run } = require('runjs')
const fs = require('fs')
const rimraf = require('rimraf')

const { getAssetsPath, chalkConsole, resolve, fsExistsSync } = require('./utils')
const { move, fileDisplay } = require('../script/file-handle')
const { styleOutputPath } = require('../config/index')

const libList = require('../src/lib-list.js')

const cssFiles = []
const pkg = []

// build 方法, 构建包，提取css
function build ({ input, output } = {}, index, arr) {
  chalkConsole.building(index + 1, arr.length)
  run(
    `vue-cli-service build --target lib --no-clean  --name ${output} --dest ${getAssetsPath()} ${input}`
  )
  cssFiles.push(`${output}.css`)
}
// 获取所有打包入口文件
Object.keys(libList).forEach((moduleName) => {
  const { input, output } = libList[moduleName]
  pkg.push({ input, output })
})
// 依次执行打包
pkg.forEach(build)
// 删除多余文件
rimraf(getAssetsPath('./demo.html'), function () { })
// 创建样式文件夹
fs.mkdirSync(getAssetsPath(styleOutputPath))
// 拷贝css文件到单独目录
cssFiles.forEach((cssFile) => {
  fsExistsSync(getAssetsPath(cssFile)) &&
    move(getAssetsPath(cssFile), getAssetsPath(styleOutputPath + '/' + cssFile))
})
// 重命名common文件
fileDisplay(getAssetsPath(), (file) => {
  const reg = /.common/
  if (reg.test(file)) {
    file = `../${file}`
    move(resolve(file), resolve(file.replace(reg, '')))
  }
})

chalkConsole.success()
