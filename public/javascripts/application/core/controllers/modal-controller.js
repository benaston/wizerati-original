(function (app) {
  'use strict';

  function ModalController(uiRootModel) {

    if (!(this instanceof app.ModalController)) {
      return new app.ModalController(uiRootModel);
    }

    var that = this,
        _modalEnum = app.mod('enum').Modal,
        _uiRootModel = null;

    this.update = function (dto) {
      try {
        _uiRootModel.setModal(dto.id);
      } catch (err) {
        console.log('ModalController::index ' + err);
      }
    };

    this.destroy = function () {
      try {
        _uiRootModel.setModal(_modalEnum.None);
      } catch (err) {
        console.log('ModalController::destroy ' + err);
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
        throw 'ModalController::init ' + e;
      }
    }

    return init();
  }

  app.ModalController = ModalController;

}(wizerati));
