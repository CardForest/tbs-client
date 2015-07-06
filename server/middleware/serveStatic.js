import config from 'config';
import express from 'express';

export function serveStatic(app){
  app.use(express.static(config.get('paths.client')));
}
