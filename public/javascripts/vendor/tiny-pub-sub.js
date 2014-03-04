/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */

(function tinyPubSub($) {

  var o = $({});

  $.subscribe = function () {
    try {
      o.on.apply(o, arguments);
    } catch (e) {
      throw 'tinyPubSub::subscribe exception: ' + e;
    }
  };

  $.unsubscribe = function () {
    try {
      o.off.apply(o, arguments);
    } catch (e) {
      throw 'tinyPubSub::unsubscribe exception: ' + e;
    }
  };

  $.publish = function () {
    try {
      o.trigger.apply(o, arguments);
    } catch (e) {
      throw 'tinyPubSub::publish exception: ' + e;
    }
  };

}($));
