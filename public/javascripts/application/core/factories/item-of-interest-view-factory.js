(function (app) {
  'use strict';

  function  ItemOfInterestViewFactory(signInIService, itemRepository, itemsOfInterestModel, hiddenItemsModel, actionedItemsModel, favoritesCubeModel) {

    if (!(this instanceof app.ItemOfInterestViewFactory)) {
      return new app.ItemOfInterestViewFactory(signInIService,
          itemRepository,
          itemsOfInterestModel,
          hiddenItemsModel,
          actionedItemsModel,
          favoritesCubeModel);
    }

    var that = this,
        _signInIService = null,
        _itemRepository = null,
        _itemsOfInterestModel = null,
        _hiddenItemsModel = null,
        _actionedItemsModel = null,
        _favoritesCubeModel = null,
        _roleEnum = app.mod('enum').UserRole;

    this.create = function (id, width, currentCubeFace, isSelectedItem, animateSelectedItem, done) {
      if (!id) {
        throw 'id not supplied.';
      }

      if (!width) {
        throw 'id not supplied.';
      }

      if (!currentCubeFace) {
        throw 'currentCubeFace not supplied.';
      }


      if (isSelectedItem === undefined || isSelectedItem === null) {
        throw 'isSelectedItem not supplied.';
      }

      if (animateSelectedItem === undefined || animateSelectedItem === null) {
        throw 'animateSelectedItem not supplied.';
      }

      if (!favoritesCubeModel) {
        throw 'favoritesCubeModel not supplied.';
      }

      if (!done) {
        throw 'done not supplied.';
      }

      var role = _signInIService.getCurrentRole();
      switch (role) {
        case _roleEnum.Employer:
        case _roleEnum.EmployerStranger:
          _itemRepository.getById(id, function (item) {
            item.isFavoritable = _favoritesCubeModel.getFavorites()[currentCubeFace].length < 6 && !_hiddenItemsModel.isHidden(item.id);
            item.isFavorite = item['isFavoriteOnFace' + currentCubeFace];
            item.isSelected = _itemsOfInterestModel.getSelectedItemId() === item.id;
            item.isPinned = !isSelectedItem;
            item.pinnedItemCount = _itemsOfInterestModel.getItemsOfInterest().pinnedItems.length;
            item.isPinnable = _itemsOfInterestModel.getItemsOfInterest().pinnedItems.length < 5 && !_.find(_itemsOfInterestModel.getItemsOfInterest().pinnedItems, function (i) {
              i === id;
            });
            item.shouldAnimateIn = animateSelectedItem && isSelectedItem && _itemsOfInterestModel.getItemsOfInterest().pinnedItems.length > 0 && !_itemsOfInterestModel.getPreviouslySelectedItemId();
            item.isHidden = _hiddenItemsModel.isHidden(item.id);
            item.isHideable = !(_favoritesCubeModel.isFavoriteOnAnyFace(item.id));
            item.isActioned = _actionedItemsModel.isActioned(item.id);
            item.width = width;
            var $e = new app.ContractorItemOfInterestView(item).render().$el;
            done($e);
          });
          break;
        case _roleEnum.Contractor:
        case _roleEnum.ContractorStranger:
          _itemRepository.getById(id, function (item) {
            item.isFavoritable = _favoritesCubeModel.getFavorites()[currentCubeFace].length < 6 && !_hiddenItemsModel.isHidden(item.id);
            item.isFavorite = item['isFavoriteOnFace' + currentCubeFace];
            item.isSelected = isSelectedItem;
            item.isPinned = !!(_.find(_itemsOfInterestModel.getItemsOfInterest().pinnedItems, function (i) {
              return i === item.id;
            }));
            item.pinnedItemCount = _itemsOfInterestModel.getItemsOfInterest().pinnedItems.length;
            item.isPinnable = !_hiddenItemsModel.isHidden(item.id) && (_itemsOfInterestModel.getItemsOfInterest().pinnedItems.length < 5 && (!_.find(_itemsOfInterestModel.getItemsOfInterest().pinnedItems, function (i) {
              return i === item.id;
            })));
            item.shouldAnimateIn = animateSelectedItem && isSelectedItem && _itemsOfInterestModel.getItemsOfInterest().pinnedItems.length > 0 && !_itemsOfInterestModel.getPreviouslySelectedItemId();
            item.isHidden = _hiddenItemsModel.isHidden(item.id);
            item.isHideable = !(_favoritesCubeModel.isFavoriteOnAnyFace(item.id)) && isSelectedItem && !_actionedItemsModel.isActioned(item.id);
            item.isActioned = _actionedItemsModel.isActioned(item.id);
            item.isActionable = !_hiddenItemsModel.isHidden(item.id);
            item.width = width;
            done(new app.ContractItemOfInterestView(item).render().$el);
          });
          break;
        default:
          throw 'invalid user role "' + role + '"';
      }
    };

    function init() {
      if (!signInIService) {
        throw 'loginService not supplied.';
      }

      if (!itemRepository) {
        throw 'itemRepository not supplied.';
      }

      if (!itemsOfInterestModel) {
        throw 'itemsOfInterestModel not supplied.';
      }

      if (!hiddenItemsModel) {
        throw 'hiddenItemsModel not supplied.';
      }

      if (!actionedItemsModel) {
        throw 'actionedItemsModel not supplied.';
      }

      if (!favoritesCubeModel) {
        throw 'favoritesCubeModel not supplied.';
      }

      _signInIService = signInIService;
      _itemRepository = itemRepository;
      _itemsOfInterestModel = itemsOfInterestModel;
      _hiddenItemsModel = hiddenItemsModel;
      _actionedItemsModel = actionedItemsModel;
      _favoritesCubeModel = favoritesCubeModel;

      return that;
    }

    return init();
  }

  app.ItemOfInterestViewFactory = ItemOfInterestViewFactory;

}(wizerati));
