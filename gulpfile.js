var gulp = require('gulp');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var animation = require('postcss-animation');
var cssnano = require('cssnano');

var dest = 'build/css/';
var src = 'src/postcss/';

gulp.task('copyHtml', function(){
    gulp.src('src/index.html')
    .pipe(gulp.dest('./build'));
});


gulp.task('css', function(){
    gulp.src(src + '*.css')
    .pipe(postcss([
        precss(),
        animation(),
        autoprefixer(),
        cssnano()
    ]))
    .on('error', gutil.log)
    .pipe(gulp.dest(dest));
});

gulp.task('watch', function(){
    gulp.watch('src/*.css',['css']);
    gulp.watch('src/index.html',['copyHtml']);
});

gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default',['copyHtml', 'css', 'webserver' ,'watch']);
