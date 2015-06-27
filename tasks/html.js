//var gulp = require('gulp');
//var newer = require('gulp-newer');
//
//gulp.task('html', function () {
//  return gulp.src('src/html/*.html')
//    .pipe($.debug({title: 'html detect:'}))
//    .pipe($.newer(distDir))
//    .pipe($.debug({title: 'html newer:'}))
//    .pipe(gulp.dest(distDir));
//});
//
//gulp.task('html-partials', function () {
//  return gulp.src('src/html-partials/*.html')
//    .pipe($.debug({title: 'html-partials detect:'}))
//    .pipe($.newer(distDir + '/html-partials'))
//    .pipe($.debug({title: 'html-partials newer:'}))
//    .pipe(gulp.dest(distDir + '/html-partials'));
//});
