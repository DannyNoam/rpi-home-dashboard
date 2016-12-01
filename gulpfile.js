const gulp = require('gulp');
const fs = require('fs');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const mocha = require('gulp-mocha');
const babel = require('babel-core/register');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');

gulp.task('lint', function () {
  return gulp.src(['**.js', '**.jsx', '!node_modules/**', '!bundle.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('pre-test', function () {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx', '!node_modules/**', '!bundle.js'])
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      babel: {
        presets: ["es2015", "react"]
      },
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
  return gulp.src(['test/spec/**/*.spec.js', 'test/spec/**/*.spec.jsx', '!node_modules/**'])
    .pipe(mocha({
      ui: "bdd",
      compilers: {
        js: babel
      }
    }))
    .pipe(istanbul.writeReports())
});

gulp.task('default', ['lint', 'test'], function () {
  return browserify('./src/index.js')
    .transform('babelify')
    .bundle()
    .pipe(fs.createWriteStream('bundle.js'));
});
