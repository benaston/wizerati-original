(function (app) {
  'use strict';

  function ResultViewFactory(signInService, itemRepository, selectedItemModel, itemsOfInterestModel, hiddenItemsModel, actionedItemsModel) {

    if (!(this instanceof app.ResultViewFactory)) {
      return new app.ResultViewFactory(signInService,
          itemRepository,
          selectedItemModel,
          itemsOfInterestModel,
          hiddenItemsModel,
          actionedItemsModel);
    }

    var that = this,
        _signInService = null,
        _itemRepository = null,
        _selectedItemModel = null,
        _itemsOfInterestModel = null,
        _hiddenItemsModel = null,
        _actionedItemsModel = null,
        _roleEnum = app.mod('enum').UserRole;

    this.create = function (id, currentCubeFace, done) {
      if (!id) {
        throw 'id not supplied.';
      }

      if (!currentCubeFace) {
        throw 'currentCubeFace not supplied.';
      }

      if (!done) {
        throw 'done not supplied.';
      }

      var role = _signInService.getCurrentRole();
      switch (role) {
        case _roleEnum.Employer:
        case _roleEnum.EmployerStranger:
          _itemRepository.getById(id, function (item) {
            item.isFavorite = item['isFavoriteOnFace' + currentCubeFace];
            item.isSelected = _selectedItemModel.getSelectedItemId() === item.id;
            item.isHidden = _hiddenItemsModel.isHidden(item.id);
            item.isActioned = _actionedItemsModel.isActioned(item.id);
            done(new app.ContractorResultView(item).render().$el);
          });
          break;
        case _roleEnum.Contractor:
        case _roleEnum.ContractorStranger:
          _itemRepository.getById(id, function (item) {
            item.isFavorite = item['isFavoriteOnFace' + currentCubeFace];
            item.isSelected = _selectedItemModel.getSelectedItemId() === item.id;
            item.isHidden = _hiddenItemsModel.isHidden(item.id);
            item.isActioned = _actionedItemsModel.isActioned(item.id);
            item.isPinned = _itemsOfInterestModel.isPinned(item.id);
            done(new app.ContractResultView(item).render().$el);
          });
          break;
        default:
          throw 'invalid user role "' + role + '"';
      }
    };

    function init() {
      if (!signInService) {
        throw 'loginService not supplied.';
      }

      if (!itemRepository) {
        throw 'itemRepository not supplied.';
      }

      if (!selectedItemModel) {
        throw 'selectedItemModel not supplied.';
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

      _signInService = signInService;
      _itemRepository = itemRepository;
      _selectedItemModel = selectedItemModel;
      _itemsOfInterestModel = itemsOfInterestModel;
      _hiddenItemsModel = hiddenItemsModel;
      _actionedItemsModel = actionedItemsModel;

      return that;
    }

    return init();
  }

  app.ResultViewFactory = ResultViewFactory;

}(wizerati));
