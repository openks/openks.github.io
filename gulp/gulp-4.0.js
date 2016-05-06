var gulp = require('gulp');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rev = require('gulp-rev-filename');
var htmlmin = require('gulp-htmlmin');
var posthtml = require('gulp-pre-link');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var tar = require('gulp-tar');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var autoprefixer = require('autoprefixer');
var cssnano = require('gulp-cssnano');
//gulp-sourcemaps



//配置信息
var config = {
	jsSrc : ["static/js/*"],
	jsDec :"./dest/js",
	imgSrc :["static/img/*"],
	imgDec :"./dest/img",
	htmlSrc :["static/*.html"],
	htmlDec :"./dest",
	lessSrc :["static/less/*.less"],
	SassSrc:["static/sass/*.scss"],
	SassDec:"static/css",
	cssSrc :["static/css/*.css"],
	cssDec :"./dest/css"
};

//png,jpg,gif,svg
gulp.task('img', function() {
	return gulp.src(config.imgSrc)
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{
			removeViewBox: false
		}, {
			cleanupIDs: false
		}],
		use: [pngquant({
			quality: 30
		})]
	}))
	.pipe(rev({showSize:true,showName:true,showHash:false})) //用md5重命名图片
	.pipe(gulp.dest(config.imgDec));
});

gulp.task('html', function() {
	return   gulp.src(config.htmlSrc)
	.pipe(posthtml())
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true,
		minifyJS: true,
		minifyCSS: true
	}))
	.pipe(livereload())
	.pipe(gulp.dest(config.htmlDec));
});

gulp.task('less', function() {
	return gulp.src(config.lessSrc)
	.pipe(less()) //该任务调用的模块
	.pipe(gulp.dest(config.SassDec));
});
gulp.task('sass', function () {
	return gulp.src(config.SassSrc)
	// .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(config.SassDec));
});

gulp.task('css', function() {
	return gulp.src(config.cssSrc)
	// .pipe(postcss([px2rem({
	// 	remUnit: 75
	// })]))
	// .pipe(postcss([autoprefixer({
	// 	browsers: ['last 2 versions']
	// })]))
	.pipe(cssnano())
	.pipe(livereload())
	.pipe(gulp.dest(config.cssDec));
});

gulp.task('js', function() {
	return gulp.src(config.jsSrc)
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
	.pipe(livereload())
	.pipe(gulp.dest(config.jsDec));
});

//备份文件
gulp.task('tar',function(done) {
	return  gulp.src('dest/**/*')
	.pipe(tar('backup.tar'))
	.pipe(gulp.dest('backup/'));
});
//重命名备份文件
gulp.task('rename',function() {
	var m = new Date();
	m =m.getFullYear()+"-"+(m.getMonth()+1)+"-"+m.getDate()+"-"+m.getHours()+m.getMinutes()+m.getSeconds();
	return  gulp.src('backup/backup.tar')
	.pipe(rename({
		suffix: '-' + m
	}))
	.pipe(gulp.dest('backup/'));
});
//备份并重命名文件
gulp.task('compress',gulp.series('tar','rename'));

// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {
	gulp.watch(config.htmlSrc,  gulp.series('html'));
	gulp.watch(config.jsSrc, gulp.series('js'));
	gulp.watch(config.imgSrc, gulp.series('img'));
	gulp.watch(config.cssSrc, gulp.series('css'));
	gulp.watch(config.lessSrc, gulp.series('less'));
});
gulp.task('sass:watch', function () {
	gulp.watch(config.SassSrc, gulp.series('sass'));
});
gulp.task('default', gulp.series('compress','sass','less','css', gulp.parallel('img', 'html','js')));
//开两个窗口了 gulp & gulp watch
//  gulp sass:watch
