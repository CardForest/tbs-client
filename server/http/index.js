import express from 'express';
import * as httpFactory from 'http';
import middlewareBuilder from './middlewareBuilder';

export default function http() {
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

  return httpFactory.createServer(app);
}
