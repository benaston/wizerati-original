(function (app) {
  'use strict';

  function UIModelPack(uiRootModel,
                       searchFormModel, resultListModel, itemsOfInterestModel, tabBarModel, bookmarkListModel, accountModel) {

    if (!(this instanceof app.UIModelPack)) {
      return new app.UIModelPack(uiRootModel, searchFormModel, resultListModel, itemsOfInterestModel, tabBarModel, bookmarkListModel, accountModel);
    }

    var that = this;

    this.uiRootModel = null;
    this.searchFormModel = null;
    this.resultListModel = null;
    this.itemsOfInterestModel = null;
    this.tabBarModel = null;
    this.bookmarkPanelModel = null;
    this.accountModel = null;

    function init() {
      try {
        if (!uiRootModel) {
          throw 'uiRootModel not supplied.';
        }

        if (!searchFormModel) {
          throw 'searchFormModel not supplied.';
        }

        if (!resultListModel) {
          throw 'resultListModel not supplied.';
        }

        if (!itemsOfInterestModel) {
          throw 'itemsOfInterestModel not supplied.';
        }

        if (!tabBarModel) {
          throw 'tabBarModel not supplied.';
        }

        if (!bookmarkListModel) {
          throw 'bookmarkListModel not supplied.';
        }

        if (!accountModel) {
          throw 'accountModel not supplied.';
        }

        that.uiRootModel = uiRootModel;
        that.searchFormModel = searchFormModel;
        that.resultListModel = resultListModel;
        that.itemsOfInterestModel = itemsOfInterestModel;
        that.tabBarModel = tabBarModel;
        that.bookmarkPanelModel = bookmarkListModel;
        that.accountModel = accountModel;

        return that;
      } catch(e) {
        throw 'UIModelPack::init ' + e;
      }
    }

    return init();
  }

  app.UIModelPack = UIModelPack;

}(wizerati));
