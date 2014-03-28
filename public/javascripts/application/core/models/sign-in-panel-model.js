(function (app, $, invertebrate) {
  'use strict';

  function SignInPanelModel() {

    if (!(this instanceof app.SignInPanelModel)) {
      return new app.SignInPanelModel();
    }

    var that = this,
        _username = null,
        _password = null,
        _isLoginFailedMessageVisible = false,
        _isVisible = false;

    this.updateEventUri = 'update://signinpanelmodel/';

    this.getUsername = function () {
      return _username;
    };

    this.setUsername = function (value) {
      _username = value;
    };

    this.getPassword = function () {
      return _password;
    };

    this.setPassword = function (value) {
      _password = value;
    };

    this.getIsLoginFailedMessageVisible = function () {
      return _isLoginFailedMessageVisible;
    };

    this.setIsLoginFailedMessageVisible = function (value) {
      _isLoginFailedMessageVisible = value;
      $.publish(that.updateEventUri);
    };

    this.getIsVisible = function () {
      return _isVisible;
    };

    this.setIsVisible = function (value) {
      _isVisible = value;
      $.publish(that.updateEventUri);
    };

    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.SignInPanelModel = SignInPanelModel;
  invertebrate.Model.isExtendedBy(app.SignInPanelModel);

}(wizerati, $, invertebrate));
