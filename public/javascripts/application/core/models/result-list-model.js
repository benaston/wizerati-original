(function (app, $) {
  'use strict';

  function ResultListModel() {
    if (!(this instanceof app.ResultListModel)) {
      return new app.ResultListModel();
    }

    var that = this,
        _searchId = 'initial-value',
        _modeEnum = app.mod('enum').ResultListMode,
        _mode = _modeEnum.Default,
        _results = []; //note these will be GUIDs - use the ItemCache for the actual objects

    this.eventUris = {
      default: 'update://resultlistmodel',
      setMode: 'update://resultlistmodel/setmode'
    };

    this.getSearchId = function () {
      return _searchId;
    };

    this.getResults = function () {
      return _results;
    };

    this.setResults = function (value, searchId) {
      _results = value;
      _searchId = searchId;
      _mode = _modeEnum.Default;

      $.publish(that.eventUris.default);
    };

    this.getMode = function () {
      return _mode;
    };

    this.setMode = function (value, options) {
      options = options || {silent: false};

      _mode = value;

      if (!options.silent) {
        $.publish(that.eventUris.setMode, value);
      }
    };

    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.ResultListModel = ResultListModel;

}(wizerati, $));
