var gulp      = require('gulp');
var concatjs  = require('gulp-concat');
var sass      = require('gulp-sass');
var concatcss = require('gulp-concat-css');
var uglifycss = require('gulp-uglifycss');

var paths = {
  js: ['./scripts/app/app.module.js', './scripts/**/*.js', '!./scripts/**/app.bundle.js'],
  css: './styles/css/*.css',
  scss: './styles/scss/*.scss'
}

gulp.task('js', function () {
  gulp.src(paths.js)
    .pipe(concatjs('app.bundle.js'))
    .pipe(gulp.dest('./scripts/app/'))
});

gulp.task('sass', function(){
	gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest('./styles/css'));
});

gulp.task('concat-css', function(){
	gulp.src(paths.css)
	.pipe(concatcss('bundle.min.css'))
	.pipe(uglifycss())
	.pipe(gulp.dest('./styles'));
});

gulp.task('watch', function(){
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.css, ['concat-css']);
});

gulp.task('default', ['js', 'sass', 'concat-css','watch']);