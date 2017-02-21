'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var minimist = require('minimist');
var del = require('del');
var shell = require('gulp-shell');

// minimist structure and defaults for this task configuration
var knownOptions = {
  string: ['env'],
  'default': {
    env: 'dev'
  }
};
var options = minimist(process.argv.slice(2), knownOptions);

// The root working directory where code is edited
var srcRoot = 'app/';

// The root staging folder for gapps configurations
var dstRoot = 'build/' + options.env + '/app/';

gulp.task('run', ['copy-latest'], shell.task(["npm start --glambox:path='build/'" + options.env + "/app"]));

// Runs the copy-latest task, after clean deploy of correct build
gulp.task('copy-latest', ['clean-deployment'], function() {
	if (options.env === 'dev') {
		return gulp.src([
			srcRoot + 'index.html',
			srcRoot + 'bower_components/**/*',
			srcRoot + 'data/*',
			srcRoot + 'scripts/**/*',
			srcRoot + 'styles/**/*',
			srcRoot + 'templates/**/*',
			srcRoot + 'tests-e2e/**/*',
			srcRoot + 'tests-unit/**/*'], {base: 'app'})
				.pipe(gulp.dest(dstRoot));
	} else if (options.env === 'tests') {
		return gulp.src([
			srcRoot + 'index.html',
			srcRoot + 'bower_components/**/*',
			srcRoot + 'data/*',
			srcRoot + 'scripts/**/*',
			srcRoot + 'styles/**/*',
			srcRoot + 'templates/**/*',
			srcRoot + 'tests-e2e/**/*',
			srcRoot + 'tests-unit/**/*'], {base: 'app'})
				.pipe(gulp.dest(dstRoot));
	} else if (options.env === 'prod') {
		return gulp.src([
			srcRoot + 'index.html',
			srcRoot + 'bower_components/**/*',
			srcRoot + 'data/*',
			srcRoot + 'scripts/**/*',
			srcRoot + 'styles/**/*',
			srcRoot + 'templates/**/*'], {base: 'app'})
				.pipe(gulp.dest(dstRoot));
	}
});

// Lint the code 
gulp.task('lint', ['sass'], function() {
  return gulp.src(srcRoot + '/scripts/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

// Runs Sass in app folder
gulp.task('sass', function () {
  return gulp.src(srcRoot + '/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
  	.pipe(gulp.dest(srcRoot + '/styles/'));
});

// Utility tasks - clean deploy
gulp.task('clean-deployment', ['lint'], function() {
  return del([
    dstRoot + '/*.*'
  ]);
});

