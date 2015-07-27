var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  del = require('del'),
  browserify = require('browserify'),
  reactify = require('reactify');


gulp.task('clean', function (done) {

  del(['./dev', './build'], done);
});

gulp.task('default', ['clean'], function () {
});
