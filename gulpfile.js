var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  runSequence = require('run-sequence'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  reactify = require('reactify'),
  ejs = require('gulp-ejs'),
  sass = require('gulp-sass');


gulp.task('clean', function (done) {

  del(['./build'], done);
});

gulp.task('template', function () {

  return gulp.src(['./src/templates/*.ejs', '!./src/templates/_*.ejs'])
    .pipe(ejs())
    .pipe(gulp.dest('./build'));
});

gulp.task('script', function () {

  return browserify({
      entries: ['src/js/app.jsx']
    })
    .transform([reactify])
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

gulp.task('css', function () {

  return gulp
    .src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});


gulp.task('compile', ['template', 'script', 'css']);

gulp.task('serve', function () {

  runSequence('clean', 'template', 'script', 'css', function () {
    browserSync.init({
      server: './build',
      open: false
    });
  });

  gulp
    .watch(['./build/*.html'])
    .on('change', browserSync.reload);

  gulp.watch(['./src/templates/*.ejs'], ['template']);
  gulp.watch(['./src/js/**/*.jsx', './src/js/**/*.js'], ['script']);
  gulp.watch(['./src/scss/**/*.scss'], ['css']);
});

gulp.task('default', ['clean'], function () {
});
