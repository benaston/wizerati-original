(function (app, $) {
  'use strict';

  function ResultListModel() {
    if (!(this instanceof app.ResultListModel)) {
      return new app.ResultListModel();
    }

    var that = this,
        _modeEnum = app.mod('enum').ResultListMode,
        _mode = _modeEnum.Default;

    this.updateEventUri = 'update://ResultListModel/';

    this.getMode = function () {
      return _mode;
    };

    this.setMode = function (value, options) {
      options = options || {silent: false};

      _mode = value;

      if (!options.silent) {
        $.publish(that.updateEventUri);
      }
    };

    function init() {

      return that;
    }

    return init();
  }

  app.ResultListModel = ResultListModel;

}(wizerati, $));
