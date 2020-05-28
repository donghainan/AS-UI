const { join } = require('path')
const utils = require('./build/utils')
const aliasConfig = require('./config/alias')
const { externalMap } = require('./config/index')
const md = require('markdown-it')() // 引入markdown-it
const slugify = require('transliteration').slugify // 引入transliteration中的slugify方法
const setAlias = (config) => {
  const { alias } = aliasConfig
  Object.keys(alias).forEach((key) => {
    config.resolve.alias.set(key, alias[key])
  })
}
module.exports = {
  lintOnSave: !utils.isProduct,
  runtimeCompiler: true,
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(join(process.cwd(), 'src'))
      .end()
    // 设置别名
    setAlias(config)
    // 关闭利用空余带宽加载文件 提升首页速度
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 配置别名
    config.extensions = aliasConfig.resolve
    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        return options
      })
    config.when(utils.isProduct, (config) => {
      // 开启图片压缩
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end()
    })
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        preventExtract: true, // 这个加载器将自动从html令牌内容中提取脚本和样式标签
        // 定义处理规则
        preprocess: (MarkdownIt, source) => {
          // 对于markdown中的table,
          MarkdownIt.renderer.rules.table_open = function () {
            return '<table class="doctable">'
          }
          // 对于代码块去除v - pre, 添加高亮样式;
          const defaultRender = md.renderer.rules.fence
          MarkdownIt.renderer.rules.fence = (
            tokens,
            idx,
            options,
            env,
            self
          ) => {
            const token = tokens[idx]
            // 判断该 fence 是否在 :::demo 内
            const prevToken = tokens[idx - 1]
            const isInDemoContainer =
              prevToken &&
              prevToken.nesting === 1 &&
              prevToken.info.trim().match(/^demo\s*(.*)$/)
            if (token.info === 'html' && isInDemoContainer) {
              return `<template slot="highlight"><pre v-pre><code class="html">${md.utils.escapeHtml(
                token.content
              )}</code></pre></template>`
            }
            return defaultRender(tokens, idx, options, env, self)
          }
          return source
        },
        use: [
          // 标题锚点
          [
            require('markdown-it-anchor'),
            {
              level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
              slugify: slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
              permalink: true, // 开启标题锚点功能
              permalinkBefore: true // 在标题前创建锚点
            }
          ],
          // :::demo ****
          //
          // :::
          // 匹配:::后面的内容 nesting == 1,说明:::demo 后面有内容
          // m为数组,m[1]表示 ****
          [
            require('markdown-it-container'),
            'demo',
            {
              validate: function (params) {
                return params.trim().match(/^demo\s*(.*)$/)
              },

              render: function (tokens, idx) {
                const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
                if (tokens[idx].nesting === 1) {
                  //
                  const description = m && m.length > 1 ? m[1] : '' // 获取正则捕获组中的描述内容,即::: demo xxx中的xxx
                  const content =
                    tokens[idx + 1].type === 'fence'
                      ? tokens[idx + 1].content
                      : ''

                  return `<demo-block>
                <div slot="source">${content}</div>
                ${description ? `<div>${md.render(description)}</div>` : ''}
                `
                }
                return '</demo-block>'
              }
            }
          ],
          [require('markdown-it-container'), 'tip'],
          [require('markdown-it-container'), 'warning']
        ]
      })
  },
  configureWebpack: (config) => {
    if (utils.isProduct) {
      config.externals = externalMap
    }
  },
  devServer: {
    // 端口号
    port: 8099,
    // eslint报错页面会被遮住
    overlay: {
      warnings: true,
      errors: true
    }
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  }
}
