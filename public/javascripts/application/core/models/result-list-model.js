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

    this.eventUris = { default: 'update://resultlistmodel/' };

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
        $.publish(that.eventUris.default);
      }
    };

    this.getResult = function (id) {
      if (!id) {
        throw 'id not supplied';
      }

      return _.find(_results, function (r) {
        return r.id === id;
      });
    };

    this.setSelectedResultId = function (id) {
      if (!id) {
        throw 'id not supplied';
      }

      _.each(_results, function (r) {
        if (r.id === id) {
          r.isSelected = true;
        } else {
          r.isSelected = false;
        }
      });

      $.publish(that.eventUris.default);
    };

    function init() {

      return that;
    }

    return init();
  }

  app.ResultListModel = ResultListModel;

}(wizerati, $));
