/* Author:
 Max Degterev @suprMax
 */

;(function($) {
  var DEFAULTS = {
//    endY: $.os.android ? 1 : 0,
//    endX: $.os.android ? 1 : 0,
    endY: 0,
    endX: 0,
    duration: 2000,
    updateRate: 15
  };

  var interpolate = function (source, target, shift) {
    return (source + (target - source) * shift);
  };

  var easing = function (pos) {
    return (-Math.cos(pos * Math.PI) / 2) + .5;
  };

  var scroll = function(settings) {
    var options = $.extend({}, DEFAULTS, settings);

    if (options.duration === 0) {
      window.scrollTo(0, options.endY);
      if (typeof options.callback === 'function') options.callback();
      return;
    }

    var startY = window.pageYOffset,
        startT = Date.now(),
        finishT = startT + options.duration;

    var animate = function() {
      var now = Date.now(),
          shift = (now > finishT) ? 1 : (now - startT) / options.duration;

      window.scrollTo(0, interpolate(startY, options.endY, easing(shift)));

      if (now < finishT) {
        setTimeout(animate, options.updateRate);
      }
      else {
        if (typeof options.callback === 'function') options.callback();
      }
    };

    animate();
  };

  var scrollX = function(settings) {
    var options = $.extend({}, DEFAULTS, settings);

    if (options.duration === 0) {
      window.scrollTo(options.endX,0);
      if (typeof options.callback === 'function') options.callback();
      return;
    }

    var startX = window.pageXOffset,
        startT = Date.now(),
        finishT = startT + options.duration;

    var animate = function() {
      var now = Date.now(),
          shift = (now > finishT) ? 1 : (now - startT) / options.duration;

      window.scrollTo(interpolate(startX, options.endX, easing(shift)), 0);

      if (now < finishT) {
        setTimeout(animate, options.updateRate);
      }
      else {
        if (typeof options.callback === 'function') options.callback();
      }
    };

    animate();
  };

  var scrollNodeX = function(settings) {
    var options = $.extend({}, DEFAULTS, settings);

    if (options.duration === 0) {
      this.scrollTop = options.endX;
      if (typeof options.callback === 'function') options.callback();
      return;
    }

    var startX = this.scrollLeft,
        startT = Date.now(),
        finishT = startT + options.duration,
        _this = this;

    var animate = function() {
      var now = Date.now(),
          shift = (now > finishT) ? 1 : (now - startT) / options.duration;

      _this.scrollLeft = interpolate(startX, options.endX, easing(shift));

      if (now < finishT) {
        setTimeout(animate, options.updateRate);
      }
      else {
        if (typeof options.callback === 'function') options.callback();
      }
    };

    animate();
  };

  var scrollNode = function(settings) {
    var options = $.extend({}, DEFAULTS, settings);

    if (options.duration === 0) {
      this.scrollTop = options.endY;
      if (typeof options.callback === 'function') options.callback();
      return;
    }

    var startY = this.scrollTop,
        startT = Date.now(),
        finishT = startT + options.duration,
        _this = this;

    var animate = function() {
      var now = Date.now(),
          shift = (now > finishT) ? 1 : (now - startT) / options.duration;

      _this.scrollTop = interpolate(startY, options.endY, easing(shift));

      if (now < finishT) {
        setTimeout(animate, options.updateRate);
      }
      else {
        if (typeof options.callback === 'function') options.callback();
      }
    };

    animate();
  };

  $.scrollTo = scroll;
  $.scrollToX = scrollX;

  $.fn.scrollTo = function() {
    if (this.length) {
      var args = arguments;
      this.forEach(function(elem, index) {
        scrollNode.apply(elem, args);
      });
    }
  };

  $.fn.scrollToX = function() {
    if (this.length) {
      var args = arguments;
      this.forEach(function(elem, index) {
        scrollNodeX.apply(elem, args);
      });
    }
  };
}(Zepto));