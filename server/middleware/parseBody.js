import bodyParser from 'body-parser';

export function parseBody(app){
  app.use(bodyParser.json());
}
