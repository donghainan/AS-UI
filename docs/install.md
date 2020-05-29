# 安装
本文将介绍 as-ui 的安装方式和基本的用法。
----
## 内网设置npm安装步骤
`nrm` 安装
nrm是 npm registry 管理工具, 能够查看和切换当前使用的registry。不安装也可以，安装会更高效
1、安装 `nrm`
```bash
npm install nrm -g
```
2、添加私服地址到nrm管理工具

3、这里的 as-ui是我们给自己的私服地址起的别名，为了切换和使用方便。
```bash
nrm add as-ui http://10.100.210.188:4873/
```
成功后如下: 
```bash
add registry my50 success
```

4、将npm包的下载地址改到my50的私服。
```bash
nrm use yg-ui
```
成功后如下:
```bash
verb config Skipping project config: /home/yg/.npmrc.
Registry has been set to: http://10.100.210.188:4873/
```
5、使用nrm ls可查到我们可以使用的所有镜像源地址，* 后面是当前使用的，如果我们不想从私服上下载包，就可以用上一步骤的nrm use命令，use其它的地址，将下载地址改到别的服务器。
输入 nrm ls 成功后如下：
```bash
npm ---- https://registry.npmjs.org/
cnpm --- http://r.cnpmjs.org/
taobao - https://registry.npm.taobao.org/
nj ----- https://registry.nodejitsu.com/
rednpm - http://registry.mirror.cqupt.edu.cn/
npmMirror  https://skimdb.npmjs.com/registry/
edunpm - http://registry.enpmjs.org/ 
* as-ui --- http://10.100.210.188:4873/
```
其实nrm只是个npm registry 管理工具，有了它可以让我们切换和查看registry 地址更方便快捷，即便没有它，我们直接用npm的set命令也可以切换地址，用type命令也可以查看地址，只不过用nrm更便捷，用不用随你了，觉得方便就用

## 使用 npm 安装

推荐使用 npm 的方式进行安装，享受 `node` 生态圈和 `webpack` 工具链带来的便利。通过 `npm` 安装的模块包，我们可以轻松的使用 `import` 和 `require` 的方式引用。

```bash
npm install as-ui -S
```
npm 安装之后，请阅读下一页：[快速开始](/start)