# Vite or Webpack

## Vite
vite在开发的时候是基于浏览器原生的ESM支持(可以将CommonJS转为ESM)，借助Esbuild超快的编译速度来做第三方库的构建和TS/JSX语法编译。 

初次使用vite,相比于create-react-app确实会快上很多

#### 无模块化标准阶段
在无模块化标准阶段（文件划分、命名空间、IIFE私有作用域（立即执行函数））

文件划分将状态和逻辑分散到不同的文件中，缺点：全局定义 变量冲突，不知道变量属于哪个模块，无法清晰地管理模块间的依赖问题（这样就需要手动地调节srcipt执行顺序）

命名空间 直接绑定在window上面

IIFE创建私有的作用域，只有内部的模块可以访问



但是这样只是解决了前两个问题，对于模块之间的依赖性就不由而知

#### 主流的三大模块规范 CommonJS、AMD、ESModule
CommonJS依赖于Node.js本身的功能实现，同步来执行代码。但是在浏览器上明显会带来性能问题(产生大量的同步模块请求，堵塞JS解析过程)

AMD

异步模块定义吗，在浏览器环境中异步加载，代码阅读理解使用上困难

ES6 Module/ESM

声明 type:'module' 得到Node.JS和浏览器的支持







#### Vite使用react
vite在开发情况下是只编译不打包，遇到相应的import依赖就会发送请求或许对应的内容。

<font style="color:rgb(37, 41, 51);">在生产环境下则基于 Rollup 打包。</font>

<font style="color:rgb(37, 41, 51);">利用浏览器原生ES模块支持，在开发阶段的dev，按照模块的按需加载，而不是先整体打包再加载（这就是相比webpack要快的原因）</font>

![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722334896158-805f6e81-9d61-4f22-b9c4-fe1428b44665.png)

![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722334917694-12bae817-d796-4c1d-a36b-7913476d0226.png)



```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  root: path.join(__dirname, 'src'),
  plugins: [react()],//类似babel，将代码进行编译
})
```



![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722335530560-c2014435-b686-4805-b6bf-0563c795b923.png)

对于项目的打包 出现tsc

tsc是TypeScript官方进行类型检查的

pnpm run build 

pnpm run preview

#### Vite中接入CSS
原生的CSS开始不支持嵌套的写法，并且容易出现样式污染，浏览器兼容问题

解决方法

1. CSS预处理器 Sass/Scss、less
2. CSS Modules 将CSS类名hash，避免出现同名污染的情况
3. CSS后处理器PostCSS
4. CSS in JS。直接在js中书写样式代码
5. CSS原子化框架，Tailwind CSS



Vite

1. Vite本身就对CSS预处理器做了内置支持

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { normalizePath } from 'vite'
import path from 'path'

const variablesPath = normalizePath(path.resolve('./src/variable.scss'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablesPath}";`
      }
    }
  }
})
```

2. CSS Module，则是index.module.scss 会把对应的class名转为对应的hash值（唯一的）

```typescript
css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablesPath}";`
      }
    },
    modules: {
      //name表示当前文件名，local表示类名
      generateScopedName:'[name]_[local]_[hash:base64:5]'
    }
  }
```

![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722337121221-673faeff-b802-4986-a8e1-6a80e9400b4a.png)





#### Vite中配置相应的eslint、prettier、husky 规范代码质量
#### Vite中对于静态资源的配置
最常见的是图片，便捷引入

![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722340859677-1c69af8e-e4f3-4e8f-87e4-f17208ff9814.png)

生成和开发环境进行区分

#### Vite中预构建的能力
模块代码中其实主要分为两个部分，一个是源代码/业务代码，另一个就是第三方依赖的代码 node_modules

Vite中提倡的no-bundle 也只是针对业务代码来说，而第三方依赖则是，采用Esbuild来完成。

##### 为什么要对第三方依赖进行预购建
1. 代码必须符合ESM规范才能正常运行，但是无法规范第三方的打包规范。
2. 请求瀑布流问题，当一个依赖库在加载的时候，需要请求特别多的

![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722342319833-b22bf54e-a269-4e7a-8da7-9f64213edcff.png)

![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722342332983-bb5fbad7-6cc1-4761-a560-800e9d112b2e.png)![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722342351774-aa785cc7-fa65-42e6-919b-4a8d3b1be593.png)

预构建就是为了将代码转为对应的ESM规范，处理依赖文件多（减少http请求数量）（而这些都是交给EsBuild来完成的）

node_modules下.vite目录，会出现预构建产物文件存放的目录，而对应的第三方引入路径也被重写了

![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722420632773-d6feea14-359d-49e6-a69d-7b3e775f0a54.png)

在自动预构建完成后，会采用它的缓存 node_module/.vite

![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722422665461-89bf5358-9df8-40e8-90a7-17e2bb8ef254.png)

在一些特殊的情况下，比如想要了解预构建的过程就需要

![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722422678633-9ea5b8f5-5c93-4ac0-869e-003ba83f55a5.png)





##### 自定义预构建配置项
预构建的入口地址，默认是抓取所有的HTML，以index.html为入口

```typescript
optimizeDeps: {
    //入口地址，从入口地址去搜索依赖
    entries: ['./src/main.vue'];
    //强制预构建，默认搜索也许会漏掉一些东西，include强制去预构建
    include:['lodash-es','vue'];
    //去掉部分预构建的，那就需要注意它是否有ESM格式，
    exclude:['']
  }
```



二次预构建，import是动态地加载，部分依赖也许是在运行时候才会被识别出来，就需要对依赖再次构建。

而在二级预构建，需要把预构建的流程重新运行一遍。所以，可以在include参数中提前声明需要按需加载的依赖。

如果其中部分依赖没有ESM，就会导致运行失败。

![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722424682604-37790c40-efe1-4c98-ad3a-b4e194b9eb6b.png)![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722424685716-402a0224-2e28-4b6b-b323-e290472479f7.png)



![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1722424772648-55a51a4b-e5d4-4916-9626-67d7015a9fee.png)

##### 自定义Esbuild
主要是针对在打包构建构成中，将错误ESM格式产物进行修改。

#### Vite双引擎 Esbuild Rollup
Esbuild速度快，但是有部分局限

Rollup则功能更丰富、生态更加成熟

##### Esbuild
Esbulid转移TS/JSX编译性能搞，但是缺乏TS类型检查，借助TS官方的检查工具，

Esbuild在生成环境也会扮演一定角色，代码的压缩（包括JS代码和CSS代码），还是快

##### Rollup
 生产环境还是需要bundle,CSS代码分割，抽取处单独的模块，提高线上产物的缓存复用率

适当地预加载内容，提前下载好资源

#### Esbuild
基于golang开发，逻辑代码被直接转为机器码，Js则是代码解析为字节码再到机器码。

多核并发：所有步骤都可能地并行，多线程共享内存

Esbuild的打包 build、buildSync、server

Esbuild的转译 transform、transfromSync

#### HMR 模块热更新
热更新的机制，Vite开发服务器使用Node.js的文件系统的API（fs.watch）或者其他的监听工具，监控文件的更改。检测到相应的变化就通过websocket推送消息到浏览器，浏览器收到通知，会进行相应的操作。

![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1723121240969-16da3018-6223-4a5e-b003-126790a3ceb4.png)

在没有import.meta.hot（仅用在开发模式下）不会渲染整个页面

[HMR API | Vite 官方中文文档 (vitejs.cn)](https://vitejs.cn/vite3-cn/guide/api-hmr.html#required-conditional-guard)

<font style="color:rgb(51,51,51);">另外增加条件守卫之后，打包时识别到 if 条件不成立，会自动把这部分代码从打包产物中移 </font>

<font style="color:rgb(51,51,51);">除，来优化资源体积。因此，我们需要增加这个条件守卫语句</font>

#### ![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1723121511577-b5c44c4e-9d26-46ee-85af-ac641f0ee60f.png)![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1723121539323-beb455d0-1c27-4014-8941-a95a496755bc.png)![](https://cdn.nlark.com/yuque/0/2024/png/33937613/1723121562682-a2e9bedc-1535-4ebf-a96f-eaaad244007d.png)
 即使只是添加了注释，Vite 仍会检测到文件的变化，并重新连接 WebSocket。这是 Vite 开发模式中的正常行为，目的是确保每次文件变更后，浏览器能够准确接收到更新。  



## Webpack
一切皆模版,在 webpack 中模版是其处理的基本单元 包裹但不限于js文件 而对于非 Js 模块就需要通过合适 loader 来进行处理 这样 webpack 就可以以一种统一的方式跟踪并且构建各个模块之间的依赖关系
webpack 配置的核心概念 包裹 entry、output、loader、plugin、mode等等 
webpack项目冷启动时必须递归打包整个项目的依赖树，javascript语言本身的性能性质，在构建中遇到瓶颈
但是Webpack保持着不可替代的地位，主要得益于其优秀的灵活性和强大的生态系统

下面以create-react-app的webpack为例分析
### loader
在 module 的配置项中,使用了 `oneof`的参数,提高 loader 匹配效率 匹配到一个 loader后,就不会再继续后面的匹配了
比较可以关注的点是 `css-loader` 的使用,在最外层定义了相关的匹配规则的正则,同时还在外层定义一个`getStyleLoaders`方法(接受两个参数: 一个是`css-loader`的配置参数,另一个是补充额外的loader)
`getStyleLoaders` 
开发模式采用的是`style-loader` 是将 CSS 样式以<style>标签的形式注入到 HTML 页面中，使得在开发过程中能够实时看到样式的效果
而生产模式则是采用的`MiniCssExtractPlugin.loader`生产独立的css文件
添加`css-loader`，它主要负责解析 css 文件中的@import和url()等语句，将 CSS 文件转换为可以被 JavaScript 处理的模块形式。同时这里传入了`cssOptions`参数
添加`postcss-loader` 自动补签css3前缀适配浏览器(需要在packjson.json中去指定支持情况)
如果传入的额外的`preProcessor`就 push 到 loader 一般是less和scss
 `css-loader` 的 `importLoaders` 属性是针对于通过 @import 引入的 css，告诉它还需要走几个 loader 才能到 `style-loader`
比如引入了 `sass-loader` 前面还有3个 loader 需要执行 同样的当 importLoaders=1 时就意味着再执行一个`css-loader` 即可

### plugins
`plugins` 选项中放置了项目中用到的所有的插件 

+ `HtmlWebpackPlugin`该插件主要用于自动生成 HTML 文件，并将 webpack 打包后的 JavaScript、CSS 等资源文件自动引入到生成的 html文件中 minify中可以加一些对于html的优化配置
+ `MiniCssExtractPlugin`抽离css 单独打包css文件
+ `ManifestPlugin`生成一份资源文件的 json 文件 即 chunks 插入到 html 中的地址，与 chunks 一一对应
此外还做了一些环境变量的注入、忽略打包第三方库、TypeScript类型异步检查、React组件热更新、处理文件路径大小写

### 题外话
下面是自己在学习webpack的总结思考
#### 文件指纹(hash)
目前对于文件名称的hash方式主要是三种 `hash`、`contenthash`、`chunkhash`
`hash`全局的 只要有任意一处发生了变化 所有hash命名的文件都将更新hash名称 缓存失效
`contenthash` 顾名思义就是根据文件的内容来生产hash值 有当文件自身内容发生变化时，其`contenthash`值才会改变 一般来说是给css文件来使用()
`chunkhash`是针对于代码块的hash 代码块通常是由 webpack 根据 entry 和代码分割（code splitting）规则生成的 比如多页面应用下的多个入口 为了使不同入口文件代码块不相互影响就可以采用 `chunkhash`

#### loader 和 plugins
`loader`: webpack将一切文件视为模块，但是webpack原生是只能解析js文件，loader就是来处理各种类型的文件 将非 JavaSript 文件转为 webpack 能够识别和处理的模块 比如对 css、文字、图片的处理
`plugins` 用来拓展 webpack 的功能,让 webpack 具有更多的灵活性 比如代码压缩、代码切割、环境注入、提取公共代码等等 

#### webpack 一些打包优化 
提取公共资源(多次引用的common代码)
CDN 加载第三方依赖(externals 配合cdn)
`Tree shaking`来删除不必要代码

#### webpack 中的动态 import 和 Vite 的冷启动的按需加载的区分
以前一直以为它们是按需加载 没有理解区分 实际上是两个完全不一样的概念
动态`import`  实际就是赖加载的一种方式 当 webpack 打包发现代码里有动态 import() 的语法，就会将引用的组件打包出js，当需要时才会加载该组件的js
`Vite`的冷启动 导致其在开发模式下是只编译不打包的(这里webpack就是递归整个依赖树 然后打包出文件) 在运行时基于浏览器的原生的ES模块支持 遇到相应的import依赖 就会去请求对应的内容