(function (app, $) {
  'use strict';

  function BookmarkPanelModel() {

    if (!(this instanceof app.BookmarkPanelModel)) {
      return new app.BookmarkPanelModel();
    }

    var that = this,
        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
        _mode = _bookmarkPanelModeEnum.Default;

    this.eventUris = {
      default: 'update://bookmarkpanelmodel/',
      setMode: 'update://bookmarkpanelmodel/setmode'
    };

    this.getMode = function () {
      return _mode || _bookmarkPanelModeEnum.Default;
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
      _mode = _bookmarkPanelModeEnum.Default;

      return that;
    }

    return init();
  }

  app.BookmarkPanelModel = BookmarkPanelModel;

}(wizerati, $));
