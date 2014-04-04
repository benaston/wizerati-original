(function (app) {
  'use strict';

  function ItemModelPack(resultListModel, bookmarkListModel, itemsOfInterestModel,  hiddenItemsModel, actionedItemsModel) {

    if (!(this instanceof app.ItemModelPack)) {
      return new app.ItemModelPack(resultListModel, bookmarkListModel, itemsOfInterestModel,  hiddenItemsModel, actionedItemsModel);
    }

    var that = this;

    this.resultListModel = null;
    this.bookmarkListModel = null;
    this.itemsOfInterestModel = null;
    this.hiddenItemsModel = null;
    this.actionedItemsModel = null;

    function init() {
      if (!resultListModel) {
        throw 'ItemModelPack::init resultListModel not supplied.';
      }

      if (!bookmarkListModel) {
        throw 'ItemModelPack::init bookmarkListModel not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'ItemModelPack::init itemsOfInterestModel not supplied.';
      }

      if (!hiddenItemsModel) {
        throw 'ItemModelPack::init hiddenItemsModel not supplied.';
      }

      if (!actionedItemsModel) {
        throw 'ItemModelPack::init actionedItemsModel not supplied.';
      }

      that.resultListModel = resultListModel;
      that.bookmarkListModel = bookmarkListModel;
      that.itemsOfInterestModel = itemsOfInterestModel;
      that.hiddenItemsModel = hiddenItemsModel;
      that.actionedItemsModel = actionedItemsModel;

      return that;
    }

    return init();
  }

  app.ItemModelPack = ItemModelPack;

}(wizerati));
