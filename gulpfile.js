var gulp   = require('gulp');
var concat = require('gulp-concat');

var paths = {
  js: ['./scripts/app/app.module.js', './scripts/**/*.js', '!./scripts/**/app.js']
}

gulp.task('js', function () {
  gulp.src(paths.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./scripts/app/'))
});

gulp.task('watch', function(){
  gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['js', 'watch']);