(function (app) {
  'use strict';

  function PostAJobController(uiRootModel) {

    if (!(this instanceof app.PostAJobController)) {
      return new app.PostAJobController(uiRootModel);
    }

    var that = this,
        _uiRootModel = null,
        _postAJobModel = null,
        _postAJobTabEnum = wizerati.mod('enum').PostAJobTab,
        _modalEnum = wizerati.mod('enum').Modal;

    this.index = function (dto) {
      try {
        _postAJobModel.setSelectedTab(dto.tab || _postAJobTabEnum.LogInOrSignUp);
        _uiRootModel.setModal(_modalEnum.SignIn);
      } catch (err) {
        console.log('PostAJobController::index ' + err);
      }
    };

    function init() {
      try {
        if (!uiRootModel) {
          throw 'uiRootModel not supplied.';
        }

        _uiRootModel = uiRootModel;

        that = $.decorate(that, app.mod('decorators').decorators.trace);

        return that;
      } catch (e) {
        throw 'PostAJobController::init ' + e;
      }
    }

    return init();
  }

  app.PostAJobController = PostAJobController;

}(wizerati));
