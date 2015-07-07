import requireDir from 'require-dir';

const middleware = requireDir('./middleware');

export default function middlewareBuilder(app) {
  const _middlewareBuilder = {};
  for(var key in middleware) {
    if(middleware.hasOwnProperty(key)) {
      const handler = middleware[key];
      _middlewareBuilder[key] = function() {
        handler(app);
        return this;
      };
    }
  }
  return _middlewareBuilder;
}
