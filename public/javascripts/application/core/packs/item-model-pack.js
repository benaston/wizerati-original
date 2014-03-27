(function (app) {
  'use strict';

  function ItemModelPack(resultListModel, bookmarkBookModel, itemsOfInterestModel,  hiddenItemsModel, actionedItemsModel) {

    if (!(this instanceof app.ItemModelPack)) {
      return new app.ItemModelPack(resultListModel, bookmarkBookModel, itemsOfInterestModel,  hiddenItemsModel, actionedItemsModel);
    }

    var that = this;

    this.resultListModel = null;
    this.bookmarkBookModel = null;
    this.itemsOfInterestModel = null;
    this.hiddenItemsModel = null;
    this.actionedItemsModel = null;

    function init() {
      if (!resultListModel) {
        throw 'SearchControllerHelper::init resultListModel not supplied.';
      }

      if (!bookmarkBookModel) {
        throw 'SearchControllerHelper::init bookmarkBookModel not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'SearchControllerHelper::init itemsOfInterestModel not supplied.';
      }

      if (!hiddenItemsModel) {
        throw 'SearchControllerHelper::init hiddenItemsModel not supplied.';
      }

      if (!actionedItemsModel) {
        throw 'SearchControllerHelper::init actionedItemsModel not supplied.';
      }

      that.resultListModel = resultListModel;
      that.bookmarkBookModel = bookmarkBookModel;
      that.itemsOfInterestModel = itemsOfInterestModel;
      that.hiddenItemsModel = hiddenItemsModel;
      that.actionedItemsModel = actionedItemsModel;

      return that;
    }

    return init();
  }

  app.ItemModelPack = ItemModelPack;

}(wizerati));
