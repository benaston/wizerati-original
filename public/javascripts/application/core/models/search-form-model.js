(function (app, $, invertebrate) {
  'use strict';

  function SearchFormModel() {

    if (!(this instanceof app.SearchFormModel)) {
      return new app.SearchFormModel();
    }

    var that = this,
        _modeEnum = app.mod('enum').SearchFormMode,
        _mode = _modeEnum.Minimized,
        _keywords = null,
        _location = null,
        _isWaiting = 'false',
        _rate = null,
        _isVisible = 'true',
        _firstRenderCompleteFlag = false;

//    this.updateEventUri = 'update://SearchFormModel/';
    this.eventUris = {
      default: 'update://searchformmodel',
      setMode: 'update://searchformmodel/setmode',
      setIsWaiting: 'update://searchformmodel/setiswaiting',
      setIsVisible: 'update://searchformmodel/setisvisible' };

    //needed?
//    this.getIsVisible = function () {
//      return _isVisible;
//    };

    this.getFirstRenderCompleteFlag = function () {
      return _firstRenderCompleteFlag;
    };

    this.setFirstRenderCompleteFlag = function () {
      _firstRenderCompleteFlag = true;
    };

    this.getMode = function () {
      return _mode;
    };

    this.setMode = function (value) {
      if(_mode === value) {
        return;
      }

      _mode = value;

      $.publish(that.eventUris.setMode, value);
    };

    this.setIsVisible = function (value) {
      _isVisible = value;

      $.publish(that.eventUris.setIsVisible);
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
        $.publish(that.eventUris.setIsWaiting);
      }
    };

    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.SearchFormModel = SearchFormModel;
  invertebrate.Model.isExtendedBy(app.SearchFormModel);

}(wizerati, $, invertebrate));
