import config from 'config';
import http from './http';
import realtime from './realtime';

const log = config.get('log');

realtime(http()).listen(config.get('port'), function () {
  log.info(`server listening on ${this.address().port}`);
});
