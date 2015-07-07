import config from 'config';

export default function handleRobots(app){
  var robotsTxt = 'User-agent: *\nDisallow: ' + config.get('robots.disallow');
  app.get('/robots.txt', function (req, res) {
    res.set('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });
}
