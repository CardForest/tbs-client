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

  gulp.task('default', ['nodemon'], function (cb) {
    sync.init({
      ghostMode: false,
      open: false,
      notify: false,
      online: false,
      port: 9000,

      proxy: "localhost:9001"
      //// to run simple static server, use:
      //server: {
      //  baseDir: ['app']
      //}
    }, cb);

  });

  var nodemon = require('nodemon');

  gulp.task('nodemon', function (cb) {
    nodemon({
      script: 'server/index.js',
      watch: ['server'], // FIXME open bug when pointing to node_modules, see https://github.com/remy/nodemon/issues/4873
      ext: 'js',
      env: {
        NODE_ENV: prod ? 'production' : 'development',
        APP_DIR: 'app',
        PORT: 9001,
        LIVE: live, //(always true)
        LIVE_PORT: 9000
      }
    }).once('start', cb);
  });
}
