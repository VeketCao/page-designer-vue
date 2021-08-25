#page-designer
基于vue ant 构建的页面设计器

##依赖包安装
cnpm install

##本地开发
npm run dev

##编译
npm run build:test
npm run build:sit
npm run build:uat
npm run build:prod

#目录结构
```
├── build                                 # 项目构建配置
├── config                                # 环境配置文件
├── src                                   # 项目源码，开发目录。
  └──assets                               # 样式文件、图片资源
  └──components                           # 公共组件
  └──plugins                              # 引入插件
  └──router                               # 路由
  └──store                                # 状态管理
  └──utils                                # 全局工具
  └──views                                # 项目页面文件
  └──App.vue                              # 入口App
  └──main.js                              # 入口js
├── static                                # 静态资源文件
├── .babelrc                              # babel编译规则
├── .gitignore                            # GIT忽略的目录或文件
├── index.html                            # 入口模板文件
├── package.json                          # NPM包管理配置文件
├── README.md                             # 说明文件
```

#版本
v1.0

#代码生成规则
页面可以兼容form组件
form不能兼容页面
