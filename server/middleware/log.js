import config from 'config';
import morgan from 'morgan';

export function log(app){
  app.use(morgan('combined', {
    stream: config.get('httpLogStream')
  }));
}
