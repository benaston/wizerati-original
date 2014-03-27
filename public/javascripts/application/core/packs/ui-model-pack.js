(function (app) {
  'use strict';

  function UIModelPack(uiRootModel, searchFormModel, resultListModel, itemsOfInterestModel, tabBarModel, bookmarkPanelModel) {

    if (!(this instanceof app.UIModelPack)) {
      return new app.UIModelPack(uiRootModel, searchFormModel, resultListModel, itemsOfInterestModel, tabBarModel, bookmarkPanelModel);
    }

    var that = this;

    this.uiRootModel = null;
    this.searchFormModel = null;
    this.resultListModel = null;
    this.itemsOfInterestModel = null;
    this.tabBarModel = null;
    this.bookmarkPanelModel = null;

    function init() {
      if (!uiRootModel) {
        throw 'SearchControllerHelper::init uiRootModel not supplied.';
      }

      if (!searchFormModel) {
        throw 'SearchControllerHelper::init searchFormModel not supplied.';
      }

      if (!resultListModel) {
        throw 'SearchControllerHelper::init resultListModel not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'SearchControllerHelper::init itemsOfInterestModel not supplied.';
      }

      if (!tabBarModel) {
        throw 'SearchControllerHelper::init tabBarModel not supplied.';
      }

      if (!bookmarkPanelModel) {
        throw 'SearchControllerHelper::init bookmarkPanelModel not supplied.';
      }

      that.uiRootModel = uiRootModel;
      that.searchFormModel = searchFormModel;
      that.resultListModel = resultListModel;
      that.itemsOfInterestModel = itemsOfInterestModel;
      that.tabBarModel = tabBarModel;
      that.bookmarkPanelModel = bookmarkPanelModel;

      return that;
    }

    return init();
  }

  app.UIModelPack = UIModelPack;

}(wizerati));
