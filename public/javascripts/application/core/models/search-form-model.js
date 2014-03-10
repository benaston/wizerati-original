(function (app, $, invertebrate) {
  'use strict';

  function SearchFormModel() {

    if (!(this instanceof app.SearchFormModel)) {
      return new app.SearchFormModel();
    }

    var that = this,
        _keywords = null,
        _location = null,
        _isWaiting = 'false',
        _rate = null,
        _isVisible = 'true';

//    this.updateEventUri = 'update://SearchFormModel/';
    this.eventUris = { default: 'update://searchformmodel/',
      isVisibleChange: 'update://searchformmodel/isvisiblechange' };

    this.getIsVisible = function () {
      return _isVisible;
    };

    this.setIsVisible = function (value) {
      _isVisible = value;

      $.publish(that.eventUris.isVisibleChange);
    };

    this.getKeywords = function () {
      return _keywords;
    };

    this.setKeywords = function (value, options) {
      options = options || { silent: false };

      _keywords = value;

      if (options.silent === false) {
        $.publish(that.eventUris.default);
      }
    };

    this.getLocation = function () {
      return _location;
    };

    this.setLocation = function (value, options) {
      options = options || { silent: false };
      _location = value;

      if (options.silent === false) {
        $.publish(that.eventUris.default);
      }
    };

    this.getRate = function () {
      return _rate;
    };

    this.setRate = function (value, options) {
      options = options || { silent: false };
      _rate = value;

      if (options.silent === false) {
        $.publish(that.eventUris.default);
      }
    };

    this.getIsWaiting = function () {
      return _isWaiting;
    };

    this.setIsWaiting = function (value, options) {
      options = options || { silent: false };

      /*jshint -W116 */
      if (value == null) {
        throw 'value not supplied.';
      }

      if (value !== 'true' && value !== 'false') {
        throw 'invalid argument (value).';
      }

      _isWaiting = value;

      if (options.silent === false) {
        $.publish(that.eventUris.default);
      }
    };

    function init() {
      return that;
    }

    return init();
  }

  app.SearchFormModel = SearchFormModel;
  invertebrate.Model.isExtendedBy(app.SearchFormModel);

}(wizerati, $, invertebrate));
