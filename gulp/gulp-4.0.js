var gulp = require('gulp'),
livereload = require('gulp-livereload');

//配置信息
var config = {
	jsSrc : ["static/js/*"],
	jsDec :"./dest/js",
	imgSrc :["static/img/*","static/img_old/*"],
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
	var imagemin = require('gulp-imagemin');
	var pngquant = require('imagemin-pngquant');
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
	.pipe(gulp.dest(config.imgDec))
	.pipe(livereload());
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
	.pipe(gulp.dest(config.SassDec));
});
gulp.task('css', function() {
	var postcss = require('gulp-postcss');
	var px2rem = require('postcss-px2rem');
	var autoprefixer = require('autoprefixer');
	var cssnano = require('gulp-cssnano');

	return gulp.src(config.cssSrc)
	// .pipe(postcss([px2rem({
	// 	remUnit: 75
	// })]))
	.pipe(postcss([autoprefixer({
		browsers: ['last 2 versions']
	})]))
	.pipe(cssnano())
	.pipe(gulp.dest(config.cssDec))
	.pipe(livereload());
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


gulp.task('tar', function() {
	var rename = require('gulp-rename');
	var tar = require('gulp-tar');
	return gulp.src('dest/**/*')
    .pipe(tar('backup.tar'))
    .pipe(rename({
    	suffix: '-' + Date.now()
    }))
    .pipe(gulp.dest('backup/'));
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {
	gulp.watch(config.htmlSrc,  gulp.series('html'));
	gulp.watch(config.jsSrc, gulp.series('js'));
	gulp.watch(config.imgSrc, gulp.series('img'));
	gulp.watch(config.cssSrc, gulp.series('css'));
	gulp.watch(config.lessSrc, gulp.series('less'));
	gulp.watch(config.sassSrc, gulp.series('sass'));
});
gulp.task('default', gulp.series('sass','less','css', gulp.parallel('img', 'html','js')));
