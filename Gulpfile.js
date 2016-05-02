var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var rimraf = require('rimraf');
var inlineSource = require('gulp-inline-source');

var htmlFiles = ['app/index.jade', 'app/**/*.jade'];
var cssFiles = ['app/styles/*.scss'];
var imageFiles = ['app/images/**'];

gulp.task('clean', function(done) {
  rimraf('dist', done)
});

gulp.task('images', function() {
  return gulp.src(imageFiles)
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
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
  gulp.watch(imageFiles, ['images']);
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

gulp.task('build', ['css', 'html', 'images'], function() {
  return gulp.src('dist/index.html')
    .pipe(inlineSource())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['css', 'html', 'images', 'watch', 'serve']);
