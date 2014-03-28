(function (app, $) {
  'use strict';

  function SearchPanelModel() {

    if (!(this instanceof app.SearchPanelModel)) {
      return new app.SearchPanelModel();
    }

    var that = this,
        _searchPanelModeEnum = app.mod('enum').SearchPanelMode,
        _mode = _searchPanelModeEnum.Default;

    this.eventUris = {
      default: 'update://searchpanelmodel/',
      setMode: 'update://searchpanelmodel/setmode'
    };

    this.getMode = function () {
      return _mode || _searchPanelModeEnum.Default;
    };

    this.setMode = function (value, options) {
      if (_mode === value) {
        return;
      }

      options = options || { silent: false };

      _mode = value;

      if (!options.silent) {
        $.publish(that.eventUris.setMode, _mode);
      }
    };

    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.SearchPanelModel = SearchPanelModel;

}(wizerati, $));
