'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');

var srcRoot = 'app';

gulp.task('start', ['lint'], shell.task(['npm start']));

gulp.task('sass', ['sass:watch']);

gulp.task('lint', ['sass'], function() {
  return gulp.src(srcRoot + '/scripts/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', ['sass:watch'], function () {
  return gulp.src(srcRoot + '/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
  	.pipe(gulp.dest(srcRoot + '/styles/'));
});

gulp.task('sass:watch', function () {
  gulp.watch(srcRoot + '/styles/**/*.scss', ['sass']);
});
