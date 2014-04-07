(function (app, $, invertebrate, _) {
  'use strict';

  function MyAccountModel() {

    if (!(this instanceof app.MyAccountModel)) {
      return new app.MyAccountModel();
    }

    var that = this,
        _isWaiting = false,
        _myAccountModeEnum = app.mod('enum').MyAccountMode,
        _mode = _myAccountModeEnum.Minimized;

    this.eventUris = {
      default: 'update://myaccountmodel',
      setMode: 'update://myaccountmodel/setmode',
      setIsWaiting: 'update://myaccountmodel/setiswaiting'
    };

    this.getMode = function () {
      return _mode;
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

    this.setIsWaiting= function (value) {
      if (value === _isWaiting) {
        return;
      }
      _isWaiting = value;

      $.publish(that.eventUris.setIsWaiting, value);
    };

    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.MyAccountModel = MyAccountModel;
  invertebrate.Model.isExtendedBy(app.MyAccountModel);

}(wizerati, $, invertebrate, _));
