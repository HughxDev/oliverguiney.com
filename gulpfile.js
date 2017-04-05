var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var htmlmin = require('gulp-htmlmin');
// var uglify = require('gulp-uglify');
// var uglifyInline = require('gulp-uglify-inline');
var minifyInline = require('gulp-minify-inline');

gulp.task('vulcanize', function() {
  return gulp.src('index.html')
    .pipe(vulcanize())
    .pipe(gulp.dest('build'));
});

gulp.task('minify', function() {
  return gulp.src('build/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
});

var options = {
  mangle: true,
  compress: true
};

// gulp.task('uglify-inline', function() {
//   return gulp.src('build/*.html')
//     .pipe(uglifyInline(options))
//     .pipe(gulp.dest('build'))
// });
gulp.task('minify-inline', function() {
  return gulp.src('build/*.html')
    .pipe(minifyInline())
    .pipe(gulp.dest('build/'))
});

// gulp.task('default', []);