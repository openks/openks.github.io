var jsSrc = "static/js/*",
	jsDec = "./dest/js",
	imgSrc = "static/img/*",
	imgDec = "./dest/img",
	htmlSrc = "static/*.html",
	htmlDec = "./dest",
	lessSrc = "static/less/*.less",
	lessDec = "./dest/css",
	cssSrc = "static/css/*.css",
	cssDec = "./dest/css",
	gulp = require('gulp'),
	livereload = require('gulp-livereload');


gulp.task('default', ['img', 'html', 'less', 'css', 'js'], function() {
	// 将你的默认的任务代码放在这
	console.log("this is default!")
});

gulp.task('move', function() {
	gulp.src("static/plugins/**/*")
		.pipe(gulp.dest("dest/static/plugins"));
	gulp.src("static/video/**/*")
		.pipe(gulp.dest("dest/static/video"));
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

gulp.task('less', function() {
	var postcss = require('gulp-postcss');
	var less = require('gulp-less');
	var px2rem = require('postcss-px2rem');
	var autoprefixer = require('autoprefixer');
	var cssnano = require('gulp-cssnano');

	return gulp.src(lessSrc)
		.pipe(less()) //该任务调用的模块
		.pipe(postcss([px2rem({
			remUnit: 75
		})]))
		.pipe(postcss([autoprefixer({
			browsers: ['last 2 versions']
		})]))
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
		.pipe(gulp.dest(htmlDec));
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

gulp.task('js', function() {
	var jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify');

	return gulp.src(jsSrc)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(gulp.dest(jsDec));
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {
	var server = livereload();
	gulp.watch(htmlSrc, ['html'], function(file) {
		server.changed(file.path);
	});
	gulp.watch(lessSrc, ["less"], function(file) {
		server.changed(file.path);
	});
	gulp.watch(cssSrc, ["css"], function(file) {
		server.changed(file.path);
	});
	gulp.watch(imgSrc, ["img"], function(file) {
		server.changed(file.path);
	});
	gulp.watch(jsSrc, ["js"], function(file) {
		server.changed(file.path);
	});
});