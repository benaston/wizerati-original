(function (app) {
  'use strict';

  function SelectedItemController(resultListModel, itemsOfInterestModel) {

    if (!(this instanceof app.SelectedItemController)) {
      return new app.SelectedItemController(resultListModel, itemsOfInterestModel);
    }

    var that = this,
        _resultListModel = null,
        _itemsOfInterestModel = null;

    this.update = function (dto) {
      try {
        if (!dto) {
          throw 'dto not supplied';
        }

        if (dto.__isInvertebrateExternal__) {
          app.instance.router.redirect('/items/show?id=' + dto.id);
          return;
        }

        //this has to be set before the mode change to ensure correct layout calculation
        _itemsOfInterestModel.setSelectedItemId(dto.id);
      } catch (err) {
        console.log('SelectedItemController::update exception: ' + err);
      }
    };

    function init() {
      if (!resultListModel) {
        throw 'SelectedItemController::init resultListModel not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'SelectedItemController::init itemsOfInterestModel not supplied.';
      }

      _resultListModel = resultListModel;
      _itemsOfInterestModel = itemsOfInterestModel;

      return that;
    }

    return init();
  }

  app.SelectedItemController = SelectedItemController;

}(wizerati));
