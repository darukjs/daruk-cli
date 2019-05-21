# daruk-cli

初始化 daruk 项目的脚手架，默认基于模板 https://github.com/daruk-framework/daruk-template

## 使用

```bash
# 安装
npm i -g daruk-cli

# 初始化项目
daruk init <repository name>

# 比如
daruk init my-first-daruk-app

# daruk-cli 默认会在本地缓存模板
# 添加 --ignore 参数，忽略本地模板缓存，建议每次都添加 --ignore 参数以获取最新的模板
daruk init --ignore my-first-daruk-app

# 使用自定义的模板
# 模板 url 地址需要满足规则: https://www.npmjs.com/package/download-git-repo
# 比如这里我们使用模板工程中的 nodejs-ts-scaffold 分支作为模板初始化项目
daruk init custom-daruk-app 'daruk-framework/daruk-template.git#nodejs-ts-scaffold'

# 针对公司私有域名下的 git/gitlab 中的模板
# 可以直接使用 clone + direct:url 的方式
daruk init --ignore --clone my-first-daruk-app direct:http://xxx.xxx.com/project.git
```