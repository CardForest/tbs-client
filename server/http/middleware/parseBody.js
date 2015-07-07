import bodyParser from 'body-parser';

export default function parseBody(app){
  app.use(bodyParser.json());
}
