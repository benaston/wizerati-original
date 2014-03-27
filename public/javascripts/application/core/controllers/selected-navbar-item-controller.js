//(function (app) {
//  'use strict';
//
//  function SelectedNavbarItemController(model, searchPanelModel, bookmarkPanelModel, itemsOfInterestModel) {
//
//    if (!(this instanceof app.SelectedNavbarItemController)) {
//      return new app.SelectedNavbarItemController(model, searchPanelModel, bookmarkPanelModel, itemsOfInterestModel);
//    }
//
//    var that = this,
//        _model = null,
//        _searchPanelModel = null,
//        _bookmarkPanelModel = null,
//        _itemsOfInterestModel = null,
//        _resultListPanelModel = null,
//        _tabEnum = app.mod('enum').Tab,
//        _searchPanelModeEnum = app.mod('enum').SearchPanelMode,
//        _bookmarkPanelModeEnum = app.mod('enum').BookmarkPanelMode,
//        _itemsOfInterestModeEnum = app.mod('enum').ItemsOfInterestMode,
//        _resultListPanelModeEnum = app.mod('enum').ResultListMode;
//
//    this.update = function (dto) {
//      try {
//        if (_model.getSelectedTab() === dto.navbarItem) {
//          return;
//        }
//
//        _model.setSelectedTab(dto.navbarItem);
//
//        //move coordination of minimization etc into controllers redirected to
//        if (dto.navbarItem === _tabEnum.Search) {
//          _searchPanelModel.setMode(_searchPanelModeEnum.Minimized);
//          _resultListPanelModel.setMode(_resultListPanelModeEnum.Default);
//          _bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
//          _itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
//
//          app.instance.router.redirect('/search', { keywords: _searchPanelModel.getKeywords(), r: _searchPanelModel.getRate() }); //consider avoiding the running of new search unnecessarily
//        } else if (dto.navbarItem === _tabEnum.Bookmark) {
//          _searchPanelModel.setMode(_searchPanelModeEnum.Minimized);
//          _resultListPanelModel.setMode(_resultListPanelModeEnum.Default);
//          _bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Default);
//          _itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.Default);
//          app.instance.router.redirect('/bookmarks');
//        } else if (dto.navbarItem === _tabEnum.ComparisonList) {
//          _searchPanelModel.setMode(_searchPanelModeEnum.Minimized);
//          _bookmarkPanelModel.setMode(_bookmarkPanelModeEnum.Minimized);
//          _itemsOfInterestModel.setMode(_itemsOfInterestModeEnum.PinnedItemsExpanded);
//          app.instance.router.redirect('/comparisonlist');
//        }
//      } catch (err) {
//        console.log('SelectedNavbarItemController::update ' + err);
//      }
//    };
//
//    function init() {
//      if (!model) {
//        throw 'SelectedNavbarItemController::init model not supplied.';
//      }
//
//      if (!searchPanelModel) {
//        throw 'SelectedNavbarItemController::init searchPanelModel not supplied.';
//      }
//
//      if (!bookmarkPanelModel) {
//        throw 'SelectedNavbarItemController::init bookmarkPanelModel not supplied.';
//      }
//
//      if (!itemsOfInterestModel) {
//        throw 'SelectedNavbarItemController::init itemsOfInterestModel not supplied.';
//      }
//
//      _model = model;
//      _searchPanelModel = searchPanelModel;
//      _bookmarkPanelModel = bookmarkPanelModel;
//      _itemsOfInterestModel = itemsOfInterestModel;
//
//      return that;
//    }
//
//    return init();
//  }
//
//  app.SelectedNavbarItemController = SelectedNavbarItemController;
//
//}(wizerati));
