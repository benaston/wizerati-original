(function (app) {
  'use strict';

  function PurchasePanelController(purchasePanelModel, uiRootModel) {

    if (!(this instanceof app.PurchasePanelController)) {
      return new app.PurchasePanelController(purchasePanelModel, uiRootModel);
    }

    var that = this,
        _purchasePanelModel = null,
        _uiRootModel = null,
        _modalEnum = app.mod('enum').Modal;

    this.index = function (dto) {
      try {
        if (_uiRootModel.getModal() != _modalEnum.Purchase) {
          _uiRootModel.setModal(_modalEnum.Purchase);
        }

        _purchasePanelModel.setActiveTab(dto.tab);
      } catch (err) {
        console.log('error: PurchasePanelController.show. ' + err);
      }
    };

    this.destroy = function (dto) {
      try {
        _uiRootModel.setModal(null);
      } catch (err) {
        console.log('error: PurchasePanelController.destroy. ' + err);
      }
    };

    function init() {
      if (!purchasePanelModel) {
        throw 'PurchasePanelController::init purchasePanelModel not supplied.';
      }

      if (!uiRootModel) {
        throw 'PurchasePanelController::init uiRootModel not supplied.';
      }

      _purchasePanelModel = purchasePanelModel;
      _uiRootModel = uiRootModel;

      return that;
    }

    return init();
  }

  app.PurchasePanelController = PurchasePanelController;

}(wizerati));
