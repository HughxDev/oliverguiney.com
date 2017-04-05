var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var htmlmin = require('gulp-htmlmin');
// var uglify = require('gulp-uglify');
// var uglifyInline = require('gulp-uglify-inline');
var minifyInline = require('gulp-minify-inline');

gulp.task('copy:server', function () {
  return gulp.src(['.htaccess', 'favicon.*', 'apple-touch-*', 'index.html', 'CNAME'])
    .pipe(gulp.dest('build/'));
});

// gulp.task('copy:shared-styles', function () {
//   return gulp.src('src/shared-styles/**/*')
//     .pipe(gulp.dest('build/src/shared-styles/'));
// });

gulp.task('copy:images', function () {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('build/src/images/'));
});

gulp.task('copy:fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/src/fonts/'));
});

// 'copy:shared-styles'
gulp.task('copy', ['copy:server', 'copy:images', 'copy:fonts']);

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