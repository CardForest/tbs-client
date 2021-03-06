export default function handleErrors(app) {
  // TODO narrow down 404 error and provide redirect to '/' when it makes sense

  // catch 404
  app.use(function (req, res, next) {
    next({
      status: 404,
      message: req.originalUrl + ' Not Found'
    });
  });


  // debug mode error handling
  // TODO separate to debug and production error handling
  var errorHandler = require('errorhandler');
  errorHandler.title = 'TBS';
  app.use(errorHandler());
}
