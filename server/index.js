import express from 'express';
import http from 'http';
import config from 'config';
import middlewareBuilder from './middleware/builder';

const log = config.get('log');

export default class TbsServer {
  constructor() {
    const app = express();

    middlewareBuilder(app)
      .configureSecurity()
      .handleRobots()
      .log()
      // TODO serve-favicon middleware
      .compress()
      .parseBody()
      // TODO API routes
      .serveStatic()
      .handleErrors();

    this.app = app;
  }
  start() {
    const server = http.createServer(this.app);
    server.listen(config.get('port'), function () {
      log.info(`server listening on ${this.address().port}`);
    });
  }
}
