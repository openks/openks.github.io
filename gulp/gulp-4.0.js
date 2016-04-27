var gulp = require('gulp'),
livereload = require('gulp-livereload');

//配置信息
var config = {
	jsSrc : ["static/js/*"],
	jsDec :"./dest/js",
	imgSrc :["static/img/*"],
	imgDec :"./dest/img",
	htmlSrc :["static/*.html"],
	htmlDec :"./dest",
	lessSrc :["static/less/*.less"],
	// SassSrc:"../jujusports-web/html/sst/sass/*.scss",
	// SassDec:"../jujusports-web/html/sst/sass",
	SassSrc:["static/sass/*.scss"],
	SassDec:"static/css",
	cssSrc :["static/css/*.css"],
	cssDec :"./dest/css"
};

//png,jpg,gif,svg
gulp.task('img', function() {
	var imagemin = require('gulp-imagemin');
	var pngquant = require('imagemin-pngquant');
	var rev = require('gulp-rev-filename');
	return gulp.src(config.imgSrc)
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{
			removeViewBox: false
		}, {
			cleanupIDs: false
		}],
		use: [pngquant()]
	}))
	.pipe(rev()) //用md5重命名图片
	.pipe(gulp.dest(config.imgDec));
});


gulp.task('html', function() {
	var htmlmin = require('gulp-htmlmin');
	var posthtml = require('gulp-pre-link');

	return   gulp.src(config.htmlSrc)
	.pipe(posthtml())
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true,
		minifyJS: true,
		minifyCSS: true
	}))
	.pipe(gulp.dest(config.htmlDec))
	.pipe(livereload());
});

gulp.task('less', function() {
	var less = require('gulp-less');
	return gulp.src(config.lessSrc)
	.pipe(less()) //该任务调用的模块
	.pipe(gulp.dest(config.SassDec));
});
gulp.task('sass', function () {
	var sass = require('gulp-sass');
	return gulp.src(config.SassSrc)
	.pipe(sass().on('error', sass.logError))
	// .pipe(sass())
	.pipe(gulp.dest(config.SassDec));
});
gulp.task('css', function() {
	var postcss = require('gulp-postcss');
	var px2rem = require('postcss-px2rem');
	var autoprefixer = require('autoprefixer');
	var cssnano = require('gulp-cssnano');

	return gulp.src(config.cssSrc)
	.pipe(postcss([px2rem({
		remUnit: 75
	})]))
	// .pipe(postcss([autoprefixer({
	// 	browsers: ['last 2 versions']
	// })]))
	// .pipe(cssnano())
	.pipe(gulp.dest(config.cssDec));
	// .pipe(livereload());
});

gulp.task('js', function() {
	var jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify');

	return gulp.src(config.jsSrc)
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
	.pipe(gulp.dest(config.jsDec))
	.pipe(livereload());
});

//备份文件
gulp.task('tar',function(done) {
	var rename = require('gulp-rename');
	var tar = require('gulp-tar');
	return  gulp.src('dest/**/*')
	.pipe(tar('backup.tar'))
	.pipe(gulp.dest('backup/'));
});
//重命名备份文件
gulp.task('rename',function() {
	var rename = require('gulp-rename');
	var m = (new Date()).toISOString();
	m =m.substring(0,10)+"-"+m.substr(11,2)+m.substr(14,2)+m.substr(17,2);
	return  gulp.src('backup/backup.tar')
	.pipe(rename({
		suffix: '-' + m
	}))
	.pipe(gulp.dest('backup/'));
});
//备份并重命名文件
gulp.task('compress',gulp.series('tar','rename'));

// 监听任务 运行语句 gulp watch
// gulp.task('watch', function() {
// 	gulp.watch(config.htmlSrc,  gulp.series('html'));
// 	gulp.watch(config.jsSrc, gulp.series('js'));
// 	gulp.watch(config.imgSrc, gulp.series('img'));
// 	gulp.watch(config.cssSrc, gulp.series('css'));
// 	gulp.watch(config.lessSrc, gulp.series('less'));
// 	gulp.watch(config.sassSrc, gulp.series('sass')); //sass不支持watch 要用下面的方法解决
// });
// gulp.task('default', gulp.series('sass','less','css', gulp.parallel('img', 'html','js')));

config.sass1="../jujusports-web/html/sst/sass/*.scss"
config.sass2='../jujusports-web/html/sst/sass/*.scss'
config.sass3='../jujusports-web/html/sst/sass/'
config.sass4='../jujusports-web/html/sst/css'
// config.sass2='./static/sass/*.scss'
// config.sass3='./static/sass/'
// config.sass4='./static/css'

var watch=require("gulp-watch");
gulp.task('watch-sass', function() {
	var path=require("path");
	var sass = require('gulp-sass');
	var sassGrapher=require("gulp-sass-grapher");
	var postcss = require('gulp-postcss');
	var loadPaths = path.resolve(config.sass3);
	var px2rem = require('postcss-px2rem');

	sassGrapher.init(config.sass3, { loadPaths: loadPaths });
	return watch(config.sass2, { base: path.resolve(config.sass3) })
	.pipe(sassGrapher.ancestors())
	.pipe(sass({
		includePath: loadPaths,
		outputStyle: 'expanded'
	}))
	.pipe(postcss([px2rem({
		remUnit: 75
	})]))
	.pipe(gulp.dest(config.sass4));
});



















/*
//用10位的md5码重命名图片
gulp.task('renameimg', function() {
	var rev = require('gulp-rev-filename');
	return gulp.src(config.imgSrc)
	.pipe(rev())
	.pipe(gulp.dest(config.imgDec));
});

//px转rem
gulp.task('px2rem', function() {
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var processors = [px2rem({
remUnit: 75
})];
return gulp.src(cssSrc)
.pipe(postcss(processors))
.pipe(gulp.dest(cssDec));
});

//自动添加前缀
gulp.task('autoprefixer', function() {
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

return gulp.src(cssSrc)
.pipe(postcss([autoprefixer({
browsers: ['last 2 versions']
})]))
.pipe(gulp.dest(cssDec));
});

gulp.task('sourcemaps', function() {
var sourcemaps = require('gulp-sourcemaps');
return gulp.src(cssSrc)
.pipe(sourcemaps.init())
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest(cssDec));
});
//csss合适化
gulp.task('cssnano', function() {
var cssnano = require('gulp-cssnano');
return gulp.src(cssSrc)
.pipe(cssnano())
.pipe(gulp.dest(cssDec));
});

*/
