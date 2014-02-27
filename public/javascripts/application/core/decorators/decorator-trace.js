(function (app) {
  'use strict';

  function Decorators(config) {
    if (!(this instanceof Decorators)) {
      return new Decorators(config);
    }

    var _config = null;

    this.trace = function (context, done) {
      if (config.enableTrace === 'true') {
        console.log('%s: $s::%s %s', context.timestamp, context.ctor, context.methodName, context.args.length ? ' called with: ' + context.args : '');
      }
      return done(null, null);
    };

    function init() {
      if (!config) {
        throw 'config not supplied.';
      }

      _config = config;
    }

    init();
  }

  app.Decorators = Decorators;

}(wizerati));
