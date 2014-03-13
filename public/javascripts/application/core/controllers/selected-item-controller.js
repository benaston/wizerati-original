(function (app) {
  'use strict';

  function SelectedItemController(selectedItemModel, searchPanelModel, resultListModel, itemsOfInterestModel) {

    if (!(this instanceof app.SelectedItemController)) {
      return new app.SelectedItemController(selectedItemModel, searchPanelModel, resultListModel, itemsOfInterestModel);
    }

    var that = this,
        _selectedItemModel = null,
        _searchPanelModel = null,
        _resultListModel = null,
        _itemsOfInterestModel = null,
        _searchPanelModeEnum = app.mod('enum').SearchPanelMode,
        _resultListModeEnum = app.mod('enum').ResultListMode,
        _itemSelectionSourceEnum = app.mod('enum').ItemSelectionSource;

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
        _itemsOfInterestModel.setSelectedItemId(dto.id, { silent: true }); //do not want to trigger repaint the items of interest here

        if (dto.source === _itemSelectionSourceEnum.Results) {
          _searchPanelModel.setMode(_searchPanelModeEnum.Minimized);
        } else if (dto.source === _itemSelectionSourceEnum.Favorites) {
          _resultListModel.setMode(_resultListModeEnum.Minimized, {silent: true});
        } else {
          throw "invalid source.";
        }

        _selectedItemModel.setSelectedItemId(dto.id);
      } catch (err) {
        console.log('SelectedItemController::update exception: ' + err);
      }
    };

    function init() {
      if (!selectedItemModel) {
        throw 'selectedItemModel not supplied.';
      }

      if (!searchPanelModel) {
        throw 'searchPanelModel not supplied.';
      }

      if (!resultListModel) {
        throw 'resultListModel not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'itemsOfInterestModel not supplied.';
      }

      _selectedItemModel = selectedItemModel;
      _searchPanelModel = searchPanelModel;
      _resultListModel = resultListModel;
      _itemsOfInterestModel = itemsOfInterestModel;

      return that;
    }

    return init();
  }

  app.SelectedItemController = SelectedItemController;

}(wizerati));
