var gulp = require('gulp');
var jsSrc = "",
	jsDec = "",
	imgSrc = "static/img/*",
	imgDec = "./dest/img",
	htmlSrc = "static/*.html",
	htmlDec = "./dest/img",
	cssSrc = "static/css/*.css",
	cssDec = "./dest/css";


gulp.task('default', ['img', 'html'], function() {
	// 将你的默认的任务代码放在这
	console.log("this is default!")
});

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

gulp.task('cssnano', function() {
	var cssnano = require('gulp-cssnano');
	return gulp.src(cssSrc)
		.pipe(cssnano())
		.pipe(gulp.dest(cssDec));
});

//png,jpg,gif,svg
gulp.task('img', function() {
	var imagemin = require('gulp-imagemin');
	var pngquant = require('imagemin-pngquant');
	return gulp.src(imgSrc)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}, {
				cleanupIDs: false
			}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(imgDec));
});

gulp.task('html', function() {
	var htmlmin = require('gulp-htmlmin');
	return gulp.src(htmlSrc)
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			minifyJS: true,
			minifyCSS: true
		}))
		.pipe(gulp.dest('./dest'));
});

gulp.task('css', function() {
	var postcss = require('gulp-postcss');
	var px2rem = require('postcss-px2rem');
	var autoprefixer = require('autoprefixer');
	var cssnano = require('gulp-cssnano');

	return gulp.src(cssSrc)
		.pipe(postcss([px2rem({
			remUnit: 75
		})]))
		.pipe(postcss([autoprefixer({
			browsers: ['last 2 versions']
		})]))
		.pipe(cssnano())
		.pipe(gulp.dest(cssDec));
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {
	// 监听html
	gulp.watch(htmlSrc, ["html"], function(event) {})
		// 监听css
	gulp.watch(cssSrc, ["css"], function() {});

	// 监听images
	gulp.watch(imgSrc, ["img"], function() {});

	// 监听js
	//gulp.watch('./src/js/*.js', function() {
	//	gulp.run('js');
	//});
});