
使用方法：
安装glup 
全局安装 npm install --global gulp
作为项目的开发依赖安装 npm install --save-dev gulp
在项目根目录使用gulp <taskname>，如果只输入gulp 则默认gulp default

在项目根目录使用gulp && gulp watch即可
在chrome中安装live reload插件，点击启用

html页面：压缩html压缩页面内的js,csss删除注释等无用信息
js文件：校验并压缩js文件
css文件：添加前缀，px转rem,css压缩
图片：压缩图片png,jpg,svg,gif


1.安装依赖
npm install --only=dev
npm install --dev
2.使用命令
gulp && gulp watch