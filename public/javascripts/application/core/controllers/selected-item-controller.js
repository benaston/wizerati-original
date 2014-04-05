(function (app) {
  'use strict';

  function SelectedItemController(resultListModel, itemsOfInterestModel, readItemService) {

    if (!(this instanceof app.SelectedItemController)) {
      return new app.SelectedItemController(resultListModel, itemsOfInterestModel, readItemService);
    }

    var that = this,
        _resultListModel = null,
        _itemsOfInterestModel = null,
        _readItemService = null;

    this.update = function (dto) {
      try {
        if (!dto) {
          throw 'dto not supplied';
        }

        if (dto.__isInvertebrateExternal__) {
          app.instance.router.redirect('/items/show?id=' + dto.id);
          return;
        }

        _readItemService.addReadItem(dto.id);
        //this has to be set before the mode change to ensure correct layout calculation
        _itemsOfInterestModel.setSelectedItemId(dto.id);
      } catch (err) {
        console.log('SelectedItemController::update exception: ' + err);
      }
    };

    function init() {
      try {
        if (!resultListModel) {
          throw 'resultListModel not supplied.';
        }

        if (!itemsOfInterestModel) {
          throw 'itemsOfInterestModel not supplied.';
        }

        if (!readItemService) {
          throw 'readItemService not supplied.';
        }

        _resultListModel = resultListModel;
        _itemsOfInterestModel = itemsOfInterestModel;
        _readItemService = readItemService;

        return that;
      } catch (e) {
        throw 'SelectedItemController::init ' + e;
      }
    }

    return init();
  }

  app.SelectedItemController = SelectedItemController;

}(wizerati));
