//(function (app) {
//  'use strict';
//
//  function ItemsOfInterestPanelModeController(itemsOfInterestModel) {
//
//    if (!(this instanceof app.ItemsOfInterestPanelModeController)) {
//      return new app.ItemsOfInterestPanelModeController(itemsOfInterestModel);
//    }
//
//    var that = this,
//        _itemsOfInterestModel = null;
//
//    this.update = function (dto) {
//      try {
//        if (itemsOfInterestModel.getMode() !== dto.mode) {
//          _itemsOfInterestModel.setMode(dto.mode);
//        }
//      } catch (err) {
//        console.log('error: ItemsOfInterestPanelModeController.update. ' + err);
//      }
//    };
//
//    function init() {
//      if (!itemsOfInterestModel) {
//        throw 'ItemsOfInterestPanelModeController::init itemsOfInterestModel not supplied.';
//      }
//
//      _itemsOfInterestModel = itemsOfInterestModel;
//
//      return that;
//    }
//
//    return init();
//  }
//
//  app.ItemsOfInterestPanelModeController = ItemsOfInterestPanelModeController;
//
//}(wizerati));
