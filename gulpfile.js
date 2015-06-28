var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	livereload = require('gulp-livereload');

// local workflow
gulp.task('sass', function () {
	gulp.src('giraffe/styles/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sourcemaps.write())
	// .pipe(sass.sync().on('error', sass.logError))
	.pipe(gulp.dest('giraffe/styles'))
	.pipe(livereload());
});

// production removes sourcemaps and compacts output
gulp.task('sass:prod', function () {
	gulp.src('giraffe/styles/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(gulp.dest('giraffe/styles'))
});

// wait for the site to be generated before reloading css
gulp.task('livereload', function() {
	livereload.listen();
});

gulp.task('sass:watch', function () {
	// livereload needs to init first, waits for change in _site
	gulp.watch(['_site/*.css', 'giraffe/styles/**/*.scss'], ['livereload', 'sass']);
});
