var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	livereload = require('gulp-livereload'),
	rsync = require('gulp-rsync'),
	shell = require('gulp-shell');

//
//	## Local Tasks
//

// generate CSS
gulp.task('sass:local', function () {
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
	.pipe(gulp.dest('giraffe/styles'));
});

gulp.task('livereload', function() {
	livereload.listen();
});

// livereload runs first and checks for changes in generated site once jekyll:local has put them there
gulp.task('sass:watch', function () {
	gulp.watch(['_site/*.css', 'giraffe/styles/**/*.scss'], ['livereload', 'sass:local']);
});

gulp.task('jekyll:local', function() {
	return gulp.src('')
	.pipe(shell([
		'jekyll serve --drafts'
	]));
});

//
//	## Production Tasks
//

gulp.task('jekyll:prod', ['sass:prod'], function() {
  return gulp.src('')
  .pipe(shell([
		'jekyll build'
	]));
});

// deploys "_site/" to server, dependant on site being ready first
gulp.task('rsync', ['jekyll:prod'], function() {
	return gulp.src(['_site'])
	.pipe(rsync({
		compress: true,
		recursive: true,
		incremental: true,
		clean: true,
		root: '_site',
		destination: 'www/mattycollins.com.au/_site',
		username: 'jekyllmc',
		hostname: 'mattycollins.com.au',
		progress: true
	}));
});


//
//	## Main Tasks
//

// serves local site, watches all the things
gulp.task('default', ['jekyll:local', 'sass:watch']);

// generate site and production code, push to server
// @todo: call on post-commit hook on master
gulp.task('deploy', ['rsync']);
