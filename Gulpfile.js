var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var rimraf = require('rimraf');

var htmlFiles = ['app/index.jade', 'app/**/*.jade'];
var cssFiles = ['app/styles/*.scss'];

gulp.task('clean', function(done) {
  rimraf('dist', done)
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('watch', function() {
  gulp.watch(cssFiles, ['css']);
  gulp.watch(htmlFiles, ['html']);
});

gulp.task('html', function() {
  return gulp.src(htmlFiles)
    .pipe(jade())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('css', function() {
  return gulp.src(cssFiles)
    .pipe(sass())
    .pipe(concat('application.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['css', 'html', 'watch', 'serve']);
