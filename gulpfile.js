'use strict';

var _ = require('lodash')
var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

// Banner
var today = new Date()
var today_string = today.getFullYear() + '.' + today.getMonth() + '.' + today.getDate();
var pkg = require('./package.json');
var banner = '/*! ' + (pkg.title || pkg.name) +  ' - v' + pkg.version + ' - ' +
      today_string + '\n' +
      (pkg.homepage ? "* " + pkg.homepage + "\n" : "") +
      '* Copyright (c) ' + today_string + ' ' + pkg.author.name +
      ' Licensed ' + _.pluck(pkg.licenses, 'type').join(', ') + ' */\n';

// Tasks
gulp.task('min', function() {
  return gulp.src('dist/'+ pkg.name + '.js')
  .pipe($.uglify())
  .pipe($.header(banner, {pkg: pkg}))
  .pipe($.rename(pkg.name + '.min.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
  return gulp.src('test/**/*.html')
  .pipe($.qunit());
});

gulp.task('lint', function() {
  return gulp.src(['gulp.js', 'src/**/*.js', 'test/**/*.js'])
  .pipe($.jshint());
});

gulp.task('copy', function() {
  return gulp.src('src/*')
  .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
  .pipe($.clean());
});

gulp.task('watch', function() {
  return gulp.watch(['gulp.js', 'src/**/*.js', 'test/**/*.js'], ['lint', 'test'])
});

gulp.task('build', ['lint', 'test', 'copy'], function(){
  return gulp.start('min');
});

gulp.task('default', ['clean'], function() {
  return gulp.start('build');
});
