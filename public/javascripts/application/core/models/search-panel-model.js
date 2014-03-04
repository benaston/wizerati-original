(function (app, $) {
  'use strict';

  function SearchPanelModel() {

    if (!(this instanceof app.SearchPanelModel)) {
      return new app.SearchPanelModel();
    }

    var that = this,
        _searchPanelModeEnum = app.mod('enum').SearchPanelMode,
        _mode = _searchPanelModeEnum.Default;

    this.eventUris = { default: 'update://searchpanelmodel/' };

    this.getMode = function () {
      return _mode || _searchPanelModeEnum.Default;
    };

    this.setMode = function (value) {
      _mode = value;

      $.publish(that.eventUris.default);
    };

    function init() {
      _mode = _searchPanelModeEnum.Default;

      return that;
    }

    return init();
  }

  app.SearchPanelModel = SearchPanelModel;

}(wizerati, $));
