const gulp = require('gulp');
const babel = require('gulp-babel');

var nodemon = require('gulp-nodemon');
var jsx = require('gulp-jsx');
var browserify = require('browserify');
var react = require('gulp-react');
var fs = require('fs');

gulp.task('default', function () {
  return browserify('./src/index.js')
      .transform("babelify", {presets: ['es2015', 'react']})
      .bundle()
      .pipe(fs.createWriteStream("bundle.js"));
});
