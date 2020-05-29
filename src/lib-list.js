/*
 * @Author: hainan dong
 * @Date: 2020-05-29 10:27:58
 * @Last Modified by: hainan dong
 * @Last Modified time: 2020-05-29 10:30:36
 * 自动化注册packages下的文件
 */
const fs = require('fs')
const files = fs.readdirSync('packages')
const pkg = {}
files.forEach(file => {
  if (file === 'theme-chalk') return
  if (file === 'index.js') {
    pkg.index = {
      input: `src/${file}`,
      output: 'as-ui'
    }
  } else {
    pkg[file] = {
      input: `packages/${file}/index.js`,
      output: `${file}`
    }
  }
})
console.log(pkg)

module.exports = pkg
