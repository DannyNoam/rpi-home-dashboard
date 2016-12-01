const gulp = require('gulp');
const fs = require('fs');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const mocha = require('gulp-mocha');
const babel = require('babel-core/register');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');

const SOURCE_JS_FILES = 'src/**/*.js';
const SOURCE_JSX_FILES = 'src/**/*.jsx';
const SOURCE_JS_SPEC_FILES = 'test/spec/**/*.spec.js';
const SOURCE_JSX_SPEC_FILES = 'test/spec/**/*.spec.jsx';

gulp.task('lint', function () {
  return gulp.src([SOURCE_JS_FILES, SOURCE_JSX_FILES, SOURCE_JS_SPEC_FILES, SOURCE_JSX_SPEC_FILES])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('pre-test', function () {
  return gulp.src([SOURCE_JS_FILES, SOURCE_JSX_FILES])
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
  return gulp.src([SOURCE_JS_SPEC_FILES, SOURCE_JSX_SPEC_FILES])
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
