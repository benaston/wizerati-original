/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */

(function tinyPubSub($) {

  var o = $({});

  $.subscribe = function () {
    try {
      o.on.apply(o, arguments);
    } catch (e) {
      throw 'tinyPubSub::subscribe exception: ' + e + '. Ensure you have created the event URIs for any newly created events in the publishing model.';
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
      o.trigger.call(o, arguments[0], Array.prototype.slice.call(arguments, 1));
  };

}($));
