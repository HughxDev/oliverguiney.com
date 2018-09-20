var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var htmlmin = require('gulp-htmlmin');
var minifyInline = require('gulp-minify-inline');
var del = require('del');
var imagemin = require('gulp-imagemin');
var replace = require('gulp-replace');

/* Clean */
gulp.task('clean', function () {
  return del([
    'build/**/*',
    'build/**/.*'
  ]);
});

/* Copy */
gulp.task('copy:server', ['clean'], function () {
  return gulp.src(['.htaccess', 'favicon.*', '*touch-icon*', 'index.html', 'CNAME'])
    .pipe(gulp.dest('build/'));
});

gulp.task('copy:images', ['clean'], function () {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('build/images/'));
});

gulp.task('copy:fonts', ['clean'], function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/fonts/'));
});

gulp.task('copy:shared-styles', ['clean'], function () {
  return gulp.src('src/shared-styles/**/*')
    .pipe(gulp.dest('build/shared-styles/'));
});

gulp.task('copy:polymer', ['clean'], function () {
  return gulp.src('bower_components/polymer/**/*')
    .pipe(gulp.dest('build/bower_components/polymer/'));
});

gulp.task('copy:webcomponentsjs', ['clean'], function () {
  return gulp.src('bower_components/webcomponentsjs/**/*')
    .pipe(gulp.dest('build/bower_components/webcomponentsjs/'));
});

gulp.task('copy:simple-carousel', ['clean'], function () {
  return gulp.src('bower_components/simple-carousel/**/*')
    .pipe(gulp.dest('build/bower_components/simple-carousel/'));
});

gulp.task('copy:app-route', ['clean'], function () {
  return gulp.src('bower_components/app-route/**/*')
    .pipe(gulp.dest('build/bower_components/app-route/'));
});

gulp.task('copy:iron-pages', ['clean'], function () {
  return gulp.src('bower_components/iron-pages/**/*')
    .pipe(gulp.dest('build/bower_components/iron-pages/'));
});

gulp.task('copy:iron-location', ['clean'], function () {
  return gulp.src('bower_components/iron-location/**/*')
    .pipe(gulp.dest('build/bower_components/iron-location/'));
});

gulp.task('copy:iron-resizable-behavior', ['clean'], function () {
  return gulp.src('bower_components/iron-resizable-behavior/**/*')
    .pipe(gulp.dest('build/bower_components/iron-resizable-behavior/'));
});

gulp.task('copy:iron-flex-layout', ['clean'], function () {
  return gulp.src('bower_components/iron-flex-layout/**/*')
    .pipe(gulp.dest('build/bower_components/iron-flex-layout/'));
});

gulp.task('copy:iron-a11y-keys-behavior', ['clean'], function () {
  return gulp.src('bower_components/iron-a11y-keys-behavior/**/*')
    .pipe(gulp.dest('build/bower_components/iron-a11y-keys-behavior/'));
});

gulp.task('copy:iron-selector', ['clean'], function () {
  return gulp.src('bower_components/iron-selector/**/*')
    .pipe(gulp.dest('build/bower_components/iron-selector/'));
});

gulp.task('copy:paper-dialog', ['clean'], function () {
  return gulp.src('bower_components/paper-dialog/**/*')
    .pipe(gulp.dest('build/bower_components/paper-dialog/'));
});

gulp.task('copy:paper-button', ['clean'], function () {
  return gulp.src('bower_components/paper-button/**/*')
    .pipe(gulp.dest('build/bower_components/paper-button/'));
});

gulp.task('copy:paper-behaviors', ['clean'], function () {
  return gulp.src('bower_components/paper-behaviors/**/*')
    .pipe(gulp.dest('build/bower_components/paper-behaviors/'));
});

gulp.task('copy:paper-material', ['clean'], function () {
  return gulp.src('bower_components/paper-material/**/*')
    .pipe(gulp.dest('build/bower_components/paper-material/'));
});

gulp.task('copy:paper-dialog-behavior', ['clean'], function () {
  return gulp.src('bower_components/paper-dialog-behavior/**/*')
    .pipe(gulp.dest('build/bower_components/paper-dialog-behavior/'));
});

gulp.task('copy:paper-ripple', ['clean'], function () {
  return gulp.src('bower_components/paper-ripple/**/*')
    .pipe(gulp.dest('build/bower_components/paper-ripple/'));
});

gulp.task('copy:neon-animation', ['clean'], function () {
  return gulp.src('bower_components/neon-animation/**/*')
    .pipe(gulp.dest('build/bower_components/neon-animation/'));
});

gulp.task('copy:clipboard-polyfill', ['clean'], function () {
  return gulp.src('node_modules/clipboard-polyfill/**/*')
    .pipe(gulp.dest('build/node_modules/clipboard-polyfill/'));
});

gulp.task('copy:fragments', ['clean'], function () {
  return gulp.src(['src/og-portfolio__slide/**/*'])
    .pipe(gulp.dest('build/og-portfolio__slide/'));
});

gulp.task('copy:elements', ['clean'], function () {
  return gulp.src(['src/og-*/**'])
    .pipe(gulp.dest('build/'));
});

gulp.task('copy', [
  'copy:polymer',
  'copy:webcomponentsjs',
  'copy:simple-carousel',
  'copy:app-route',
  'copy:iron-pages',
  'copy:iron-location',
  'copy:iron-resizable-behavior',
  'copy:iron-flex-layout',
  'copy:iron-a11y-keys-behavior',
  'copy:iron-selector',
  'copy:paper-dialog',
  'copy:paper-button',
  'copy:paper-behaviors',
  'copy:paper-material',
  'copy:paper-dialog-behavior',
  'copy:paper-ripple',
  'copy:neon-animation',
  'copy:clipboard-polyfill',
  'copy:server',
  'copy:images',
  'copy:fonts',
  'copy:elements',
  'copy:shared-styles'
]);

/* Vulcanize */
var vulcanizeOptions = {
  stripComments: true,
  inlineScripts: true,
  inlineCss: true,
  excludes: [
    // 'bower_components/polymer/polymer.html',
    // 'bower_components/polymer/polymer-mini.html',
    // 'bower_components/polymer/polymer-micro.html',
    'bower_components/simple-carousel/simple-carousel.html'
  ]
  // stripExcludes: ['bower_components/polymer/polymer.html']
};

gulp.task('vulcanize:entrypoint', ['copy'], function() {
  return gulp.src('index.html')
    .pipe(vulcanize(vulcanizeOptions))
    .pipe(gulp.dest('build'));
});

gulp.task('vulcanize:fragments', ['copy'], function() {
  return gulp.src(['src/og-portfolio__slide/**/*'])
    .pipe(vulcanize(vulcanizeOptions))
    .pipe(gulp.dest('build/og-portfolio__slide/'));
});

gulp.task('vulcanize', ['vulcanize:entrypoint', 'vulcanize:fragments']);

/* Rewrite URIs */
gulp.task('rewrite', ['copy'], function(){
  return gulp.src(['build/**/*.html', '!build/bower_components/!(simple-carousel)/*.html'])
    /*
      # Input:
      <link rel="import" href="../../bower_components/polymer/polymer.html" />
      <img src="../src/images/oliver-guiney.jpg" />
      config = { 'src': '../hello.png' }

      Hello...
      ...
      ../..?

      # Output:
      <link rel="import" href="/bower_components/polymer/polymer.html" />
      <img src="/images/oliver-guiney.jpg" />
      config = { 'src': '/hello.png' }

      Hello...
      ...
      ../..?
    */
    .pipe(replace(/(["'])(?:\.\.\/)+(?:src\/)?([^\1\f\t\v\r\n]+)(\1)/g, '$1/$2$3'))

    /*
      # Input:
      <img src="../src/src/images/oliver-guiney.jpg" srcset="../src/images/oliver.jpg, /src/images/oliver.jpg, ../src/images/oliver.jpeg" />

      # Output:
      <img src="/images/oliver-guiney.jpg" srcset="/images/oliver.jpg, /images/oliver.jpg, /images/oliver.jpeg" />
    */
    .pipe(replace(/((\.\.)+)?\/?(src\/)+/g, '/'))

    /*
      # Input:
      <meta content="http://www.oliverguiney.com/src/images/og-facebook.jpg" />
      <a href="/src/images/og-facebook.jpg">Link</a>

      # Output:
      <meta content="http://www.oliverguiney.com/images/og-facebook.jpg" />
      <a href="/images/og-facebook.jpg">Link</a>
    */
    .pipe(replace(/(["'])(https?:\/\/)?([^\1\f\t\v\r\n]+)(?:src\/)([^\1\f\t\v\r\n]+)(\1)/g, '$1$2$3$4$5'))

    /* Fuck me… */
    .pipe(replace(/(href=(["']))(\/polymer\/polymer.html)(\2)/, '$1/bower_components$3$4'))

    /* Fix for FOUC */
    .pipe(replace(/(<og-portfolio__slide[^>]+>)([\s\S]*)(<\/og-portfolio__slide>)/g, '$1<div style="color:transparent;">$2</div>$3'))

    .pipe(gulp.dest('build/'));
});

/* Minify */
gulp.task('minify:html', ['rewrite'], function() {
  return gulp.src(['build/**/*.html', '!build/bower_components/**/*.html'])
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(gulp.dest('build'));
});

// gulp.task('minify:inline', ['minify:html'], function() {
//   return gulp.src(['build/**/*.html', '!build/bower_components/**/*.html'])
//     .pipe(minifyInline())
//     .pipe(gulp.dest('build/'));
// });

gulp.task('minify:images', function(){
  return gulp.src('build/images/**/*.{png,svg}')
    .pipe(imagemin([
      // imagemin.gifsicle({interlaced: true}),
      // imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest('build/images'));
});

gulp.task('minify', ['minify:html']);

/* Default */
// Beceause each meta-task relies on the last, we only have to call the latter task in order to call all previous tasks up the chain
gulp.task('default', ['minify']);
// gulp.task('default', ['rewrite']);