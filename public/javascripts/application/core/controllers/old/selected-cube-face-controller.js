//(function (app) {
//  'use strict';
//
//  function SelectedCubeFaceController(selectedCubeFaceModel) {
//
//    if (!(this instanceof app.SelectedCubeFaceController)) {
//      return new app.SelectedCubeFaceController(selectedCubeFaceModel);
//    }
//
//    var that = this,
//        _selectedCubeFaceModel = null;
//
//    this.update = function (dto) {
//      try {
//        _selectedCubeFaceModel.setSelectedCubeFaceId(dto.id);
//      } catch (err) {
//        console.log('SelectedCubeFaceController::update ' + err);
//      }
//    };
//
//    function init() {
//      if (!selectedCubeFaceModel) {
//        throw 'SelectedCubeFaceController:init selectedCubeFaceModel not supplied.';
//      }
//
//      _selectedCubeFaceModel = selectedCubeFaceModel;
//
//      return that;
//    }
//
//    return init();
//  }
//
//  app.SelectedCubeFaceController = SelectedCubeFaceController;
//
//}(wizerati));
