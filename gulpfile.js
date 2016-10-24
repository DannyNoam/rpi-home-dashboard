const gulp = require('gulp');
const fs = require('fs');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const mocha = require('gulp-mocha');
const babel = require('babel/register');

gulp.task('lint', function () {
  return gulp.src(['**.js', '**.jsx', '!node_modules/**', '!bundle.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('test', function () {
  return gulp.src(['**/*.spec.js', '**/*.spec.jsx', '!node_modules/**'])
    .pipe(mocha({
      ui: "bdd",
      compilers: {
        js: babel
      }
    }));
});

gulp.task('default', ['lint', 'test'], function () {
  return browserify('./src/index.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(fs.createWriteStream('bundle.js'));
});
