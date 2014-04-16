(function (invertebrate) {
  'use strict';

  function History() {

    if (!(this instanceof invertebrate.History)) {
      return new invertebrate.History();
    }

    var that = this,
        _stack = [];


    this.push = function (url) {
      _stack.push(url);
    };

    this.pop = function () {
      return _stack.pop();
    };

    this.getPreviousUrl = function () {
      if(_stack.length < 2) {
        return null;
      }

      return _stack[_stack.length-2];
    };


    function init() {
      return that;
    }

    init();
  }

  invertebrate.History = History;
}(invertebrate, $, _));


