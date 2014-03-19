(function (app) {
  'use strict';

  function ApplyToContractDialogService(model, uiRootModel, authorizationService, itemRepository) {

    if (!(this instanceof app.ApplyToContractDialogService)) {
      return new app.ApplyToContractDialogService(model, uiRootModel, authorizationService, itemRepository);
    }

    var that = this,
        _model = null,
        _uiRootModel = null,
        _authorizationService = null,
        _itemRepository = null,
        _roleEnum = app.mod('enum').UserRole,
        _modalEnum = app.mod('enum').Modal,
        _dialogPanelEnum = app.mod('enum').ApplyToContractDialogPanel;

    this.show = function(itemId) {
      if(_authorizationService.getCurrentRole() == _roleEnum.Contractor) {
        _model.setCurrentDialogPanel(_dialogPanelEnum.CVSelection, {silent:true});
      } else {
        _model.setCurrentDialogPanel(_dialogPanelEnum.SignInOrContinue, {silent:true});
      }

      _itemRepository.getById(itemId, function(item){
        _model.setItem(item); //triggers render
        _uiRootModel.setModal(_modalEnum.ActionContract);
      })
    };

    this.hide = function() {
      _model.reset();
      _uiRootModel.setModal(_modalEnum.None);
    };

    function init() {
      if (!model) {
        throw 'model not supplied';
      }

      if (!uiRootModel) {
        throw 'uiRootModel not supplied';
      }

     if (!authorizationService) {
        throw 'authorizationService not supplied';
      }

      if (!itemRepository) {
        throw 'itemRepository not supplied';
      }

      _uiRootModel = uiRootModel;
      _authorizationService = authorizationService;
      _model = model;
      _itemRepository = itemRepository;

      return that;
    }

    return init();
  }

  app.ApplyToContractDialogService = ApplyToContractDialogService;

}(wizerati));
