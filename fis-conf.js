
fis.set('project.ignore', [
  'demo/nodeppt/**',
  '.git/**'
]);

fis.match('::packager', {
	spriter: fis.plugin('csssprites')
});

//js,css,png文件添加MD5戳
fis.match('*.{css,png,webp}', {
	useHash: true
});

fis.match('javascripts/*.js', {
	useHash: true
});

fis.match('demo/js/*.js', {
	useHash: true
});



//fis.match('*.js,', {
//	optimizer: fis.plugin('uglify-js')
//});
//
//fis.match('*.css', {
//	useSprite: true,
//	optimizer: fis.plugin('clean-css')
//});
//
//fis.match('*.png', {
//	optimizer: fis.plugin('png-compressor')
//});