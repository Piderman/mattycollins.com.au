var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var rsync = require('gulp-rsync');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var hygienist = require('hygienist-middleware');

//
//	## Local Tasks
//

// generate CSS
gulp.task('sass:local', function () {
	// return so we can set the dependancy/chains correctly
	return gulp.src('_source/theme/mohawk/styles/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('_source/theme/mohawk/styles'));
});

gulp.task('scripts:local', function () {

	return gulp.src('_source/theme/mohawk/scripts/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('_source/theme/mohawk/build/scripts'));
});


// jekyll only builds the files,
gulp.task('jekyll:local', ['scripts:local'], function() {
	return gulp.src('')
		.pipe(shell([
			'jekyll build --drafts'
		]));
});


//
//	## Browser Sync
//	need to fork them into two tasks, one for a reload and the other to inject styles
//

// trigger the rebuild of assets
gulp.task('reload:hard', ['jekyll:local'], function(){
	browserSync.reload();
});

// trigger CSS re-inject
gulp.task('reload:soft', ['sass:local', 'jekyll:local'], function(){
	browserSync.reload(['_site/**/*.css']);
});

// the server
gulp.task('serve', function () {

	browserSync.init({
		notify: false,
		port: 9000,
		server: {
			baseDir: "./_site",
			middleware: hygienist("./_site")
		},
		ghostMode: {
			scroll: true
		}
	});
});

// watchers set what browser sync does
gulp.task('watch', ['sass:local', 'scripts:local' , 'jekyll:local', 'serve'], function () {
	gulp.watch(['_source/**/*.js', '_source/**/*.html', '_source/**/*.md', '_source/**/*.markdown', '_source/**/*.json'], ['reload:hard']);

	gulp.watch('_source/**/*.scss', ['sass:local', 'reload:soft']);
});



//
//	## Production Tasks
//

// production removes sourcemaps and compacts output
gulp.task('sass:prod', function () {

	return gulp.src('_source/theme/mohawk/styles/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('_source/theme/mohawk/styles'));
});

gulp.task('jekyll:prod', ['sass:prod', 'scripts:prod'], function() {
	return gulp.src('')
		.pipe(shell([
			'jekyll build --config _config_production.yml'
		]));
});

gulp.task('scripts:prod', function () {

	return gulp.src('_source/theme/mohawk/scripts/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('_source/theme/mohawk/build/scripts'))
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('_source/theme/mohawk/build/scripts'));
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
		hostname: 'mattycollins.com.au',
		progress: true
	}));
});


//
//	## Main Tasks
//

// remove all the things for clean slate for builds
gulp.task('clean', function () {
	return gulp.src(['_site', '_source/theme/mohawk/build'], {read: false})
		.pipe(clean());
});


// serves local site, watches all the things
gulp.task('default', ['clean', 'build', 'watch']);

gulp.task('build', ['jekyll:prod']);

gulp.task('build:test', ['jekyll:prod', 'serve']);

// generate site and production code, push to server
gulp.task('deploy', ['rsync']);
