'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var uncss = require('gulp-uncss');
var rename = require("gulp-rename");
var nano = require('gulp-cssnano');

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({
      includePaths: ['./src/sass']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./docs/css'));
});

gulp.task('css', function () {
    return gulp.src('./docs/css/style.css')
        .pipe(uncss({
            html: ['./docs/index.html']
        }))
        .pipe(nano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./docs/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass', 'css']);
});

gulp.task('fonts', function() {
    gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./docs/fonts'));
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./docs'));
});

gulp.task('html:watch', function () {
  gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('watch', ['sass:watch', 'html:watch']);


gulp.task('default', ['html', 'sass', 'css', 'fonts']);
