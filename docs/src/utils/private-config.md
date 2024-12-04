# private-config.js 配置项使用说明
## 技术实验原理说明
+ html文件优先加载并执行 private-config.js 文件, 往全局 window 对象添加 PRIVATE_STATIC
+ 通过更改 window.PRIVATE_STATIC 对象属性值, 达到修改配置项的目的

## 配置项内容概括
配置项内容分为四个部分:browserConfig,mainPageConfig,customOtherConfig,loginPageConfig
当然针对于每个产品的配置项内容都是不一样的, 根据自己的需求去实现想用的内容即可
各个产品都有各自对应的属性键值来控制内容 在k8s上部署 根据ConfigMap.yaml 内容来查看 

在K8S部署 更新 ConfigMap中配置项内容 重启服务 浏览器强制刷新就可生效
[k8s](https://developer.aliyun.com/article/1366693)

## _VERSION.js
在ci.yml中配置不同的脚本指令

```md
生成版本文件
echo "$1" > outout/_VERSION.js //分支名
echo $(data +"%Y-%m-%d %H:%M:%S") >> output/_VERSION.js //发布时间
echo "项目名" >> output/_VERSION.js 
echo "$build_type" >>output/_VERSION.js # default | legacy, default未解决浏览器兼容性
```

## 关于低版本浏览器的兼容
### cra
react-app-polyfill
需要在代码主入口首行添加 需要需要的垫片 同时类似 css-aufofixer 更改browerlist配置 明确支持的浏览器版本 
### vite
esbuild 是不支持 ES6 语法转 ES5 的 所以需要使用插件 @vitejs/plugin-legacy
[browerlist配置语法](https://browsersl.ist/#q=last+2+versions+and+not+dead%2C+%3E+0.3%25%2C+Firefox+ESR)
[Vite是怎么兼容老旧浏览器的](https://zhuanlan.zhihu.com/p/619014112)