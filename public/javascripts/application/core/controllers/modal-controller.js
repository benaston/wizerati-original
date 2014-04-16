(function (app) {
  'use strict';

  function ModalController(uiRootModel) {

    if (!(this instanceof app.ModalController)) {
      return new app.ModalController(uiRootModel);
    }

    var that = this,
        _modalEnum = app.mod('enum').Modal,
        _uiRootModel = null;

    this.dtoPopulators = {};

    this.update = function (dto) {
      try {
        _uiRootModel.setModal(dto.id);
      } catch (err) {
        console.log('ModalController::update ' + err);
      }
    };

    this.destroy = function (dto) {
      try {
        _uiRootModel.setModal(_modalEnum.None);
        app.instance.router.redirect(_uiRootModel.getAndClearPreviousUrl() || '/');
      } catch (err) {
        console.log('ModalController::destroy ' + err);
      }
    };

    function dtoPopulatorSignIn(dto) {
      //Guard is important. If coming from external URL then the previous URL would be the very page we are visiting,
      //meaning that when clicking the close button on the sing-in dialog, we navigate back to the dialog.
      if (location.pathname !== '/signin') {
        dto.previousUrl = location.pathname + location.search;
      }

      return dto;
    }

    function init() {
      try {
        if (!uiRootModel) {
          throw 'uiRootModel not supplied.';
        }

        _uiRootModel = uiRootModel;

        that = $.decorate(that, app.mod('decorators').decorators.trace);

        that.dtoPopulators['/signin'] = dtoPopulatorSignIn;

        return that;
      } catch (e) {
        throw 'ModalController::init ' + e;
      }
    }

    return init();
  }

  app.ModalController = ModalController;

}(wizerati));
