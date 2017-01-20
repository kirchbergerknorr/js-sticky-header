'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    install = require('gulp-install'),
    chug = require('gulp-chug'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify');

gulp.task('install', function () {
    gulp.src(['./package.json'])
        .pipe(install());
});

gulp.task('build', function () {
    gulp.src('./examples/js/main.js')
        .pipe(browserify())
        .pipe(rename('bundle-main.js'))
        .pipe(gulp.dest('./examples/build/js'));
});

gulp.task('default', ['install', 'build']);

gulp.task('watch', function () {
    gulp.watch('./sticky-header.js', ['default']);
    gulp.watch('./examples/js/main.js', ['default']);
    gulp.watch('./package.json', ['install']);
});