(function (app) {
  'use strict';

  function SelectedAccountTabController(myAccountModel) {

    if (!(this instanceof app.SelectedAccountTabController)) {
      return new app.SelectedAccountTabController(myAccountModel);
    }

    var that = this,
        _myAccountModel = null;

    this.update = function (dto) {
      try {
        if (!dto) {
          throw 'dto not supplied';
        }

        _myAccountModel.setSelectedTab(dto.id);
        app.instance.router.redirect('/account?tab=' + dto.id);
      } catch (err) {
        console.log('SelectedAccountTabController::update ' + err);
      }
    };

    function init() {
      try {
        if (!myAccountModel) {
          throw 'myAccountModel not supplied.';
        }

        _myAccountModel = myAccountModel;

        return that;
      } catch (e) {
        throw 'SelectedAccountTabController::init ' + e;
      }
    }

    return init();
  }

  app.SelectedAccountTabController = SelectedAccountTabController;

}(wizerati));
