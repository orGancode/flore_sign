1、git clone [git@github.com](mailto:git@github.com):orGancode/flore_sign.git

2、npm install 

3、本地服务127.0.0.1:5000端口

 `webpack做服务代理 配置查看devServer>proxy>target` 

3、npm run server 

4、访问localhost:8080

遇到的坑及解决方法
1、windows下执行npm run build 失败

$ npm run build

> sign-project@1.0.0 build F:\webUID\flore_sign
> ./node_modules/webpack/bin/webpack.js

'.' ▒▒▒▒▒ڲ▒▒▒▒ⲿ▒▒▒Ҳ▒▒▒ǿ▒▒▒▒еĳ▒▒▒
▒▒▒▒▒▒▒▒▒ļ▒▒▒
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! sign-project@1.0.0 build: `./node_modules/webpack/bin/webpack.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the sign-project@1.0.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

解决：npm install cross-env --save，
这个包能够提供一个设置环境变量的scripts，让你能够以unix方式设置环境变量，然后在windows上也能兼容运行。

在scripts前面添加cross-env就可以了。(参考package.json里的scripts)

2、。。。