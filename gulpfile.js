global.gulp = require('gulp');
global.$ = require('gulp-load-plugins')();
var argv = require('yargs').options(
  {
    'p': {
      alias: ['prod'],
      boolean: true
    },
    'l': {
      alias: ['live', 'reload'],
      boolean: true
    }
  }
).argv;

global.prod = argv.p;
global.live = argv.l;

global.distDir = prod ? 'dist/prod' : 'dist/dev';

//var requireDir = require('require-dir');
//requireDir('./tasks');

if (live) {
  global.sync = require('browser-sync').create();

  gulp.task('default', function (cb) {
    sync.init({
      ghostMode: false,
      open: false,
      notify: false,
      online: false,
      port: 9000,
      server: {
        baseDir: ['jspm', 'ui-demo', 'src/app']
      }
    }, cb);

  });
}
