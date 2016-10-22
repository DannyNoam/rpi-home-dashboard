var gulp = require('gulp');
var fs = require('fs');
var eslint = require('gulp-eslint');
var browserify = require('browserify');
var mocha = require('gulp-mocha');
var babel = require('babel/register');

gulp.task('lint', function () {
  return gulp.src(['src/**.js', 'src/**.jsx', '!node_modules/**', '!bundle.js'])
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
