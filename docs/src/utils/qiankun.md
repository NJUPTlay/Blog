# qiankun
[qiankun](https://qiankun.umijs.org/zh/guide/getting-started)
就我个人接触的项目是damp 需要融合到 EDAP 中去,并且一套代码多端使用(公有云和私有云)

当微应用信息注册之后,一旦浏览器的url发生改变,便会自动触发qiankun的匹配逻辑,所有activeRule匹配到的微应用(路由startWith)都会被插入到指定的container中,同时依次调用微应用暴露出的生命周期钩子

## qiankun 不兼容vite问题
运行时和编译阶段需要同时使用 [vite-plugin-qiankun](https://github.com/tengmaoqing/vite-plugin-qiankun) ,解决qiankun.js 不支持加载esm模块的问题

