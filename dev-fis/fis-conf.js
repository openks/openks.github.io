/*
 * 1.在dev 目录下使用 fis3 release -d ../ 命令即可生成fis3目录
 * 2.本地开发 在dev 目录下
 * fis3 server clean
 * fis3 release //发布到默认地址
 * fis3 release -w //FIS3 通过对 release 命令添加 -w 或者 --watch 参数启动文件监听功能。
 * //当启动文件监听时，修改文件会构建发布。而且其编译是增量的，编译花费时间少。
 * fis3 server start  //默认8080端口，如果不手动关闭不会自动关闭
 * fis3 server start -p 8999 //设置端口
 * fis3 release debug 启用debug配置
 * fis3 release debug -w 启用debug配置
 * 3.安装插件
 * npm install -g 插件名
 * npm install -g fis-parser-less
 * npm install -g fis3-postpackager-loader
 * */

fis.set('project.ignore', [
  '.git/**',
  'fis-conf.js'
]);

//www.a.com/h5/index.html
fis.match('*', {
	release: 'fis3/$0'
});

fis.match('::packager', {
	// 启用 fis-spriter-csssprites 插件 同一页的图片会压缩
	spriter: fis.plugin('csssprites')
});

//less文件解析
fis.match('*.less', {
	parser: fis.plugin('less'),
	rExt: '.css'
})

fis.match('*.js', {
	// fis-optimizer-uglify-js 插件进行压缩，已内置
	optimizer: fis.plugin('uglify-js')
});


fis.match('*.png', {
	// fis-optimizer-png-compressor 插件进行压缩，已内置
	optimizer: fis.plugin('png-compressor')
});

fis.match('*.{css,less}', {
	// 给匹配到的文件分配属性 `useSprite`
	useSprite: true,
	// fis-optimizer-clean-css 插件进行压缩，已内置
	optimizer: fis.plugin('clean-css')
});

fis.match('*.{js,css,less,png}', {
	useHash: true
});

fis.media('debug').match('*.{js,css,png,less}', {
	useHash: false,
	useSprite: false,
	optimizer: null
});