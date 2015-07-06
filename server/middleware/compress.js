import compression from 'compression';

export function compress(app){
  app.use(compression()); // TODO (maybe) something like http-static-gzip-regexp and grunt-contrib-compress (static compression)
}
