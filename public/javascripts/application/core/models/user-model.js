(function (app, $, invertebrate) {
  'use strict';

  function UserModel() {

    if (!(this instanceof app.UserModel)) {
      return new app.UserModel();
    }

    var that = this,
        _userId = null;

    this.eventUris = { default: 'update://usermodel/' };

    this.getUserId = function () {
      return _userId;
    };

    this.setUserId = function (value) {
      _userId = value;

      $.publish(that.eventUris.default, value);
    };

    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.UserModel = UserModel;
  invertebrate.Model.isExtendedBy(app.UserModel);

}(wizerati, $, invertebrate));
