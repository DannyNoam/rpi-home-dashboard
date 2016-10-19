const gulp = require('gulp');
const fs = require('fs');
const eslint = require('gulp-eslint');
const browserify = require('browserify');

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '**/*.jsx', '!node_modules/**', '!bundle.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], function () {
  return browserify('./src/index.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(fs.createWriteStream('bundle.js'));
});
