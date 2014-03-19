(function (app, $, invertebrate) {
  'use strict';

  function ApplyToContractDialogModel() {

    if (!(this instanceof app.ApplyToContractDialogModel)) {
      return new app.ApplyToContractDialogModel();
    }

    var that = this,
        _currentDialogPanel = null,
        _item = null,
        _actionContractDialogPanelEnum = app.mod('enum').ActionContractDialogPanel,
        _isWaiting = '', //should identify the dom element to indicate waiting
        _isVisible = false,
        _notifications = []; //eg. [{ type: 'formField', id: 'foo' }]

    this.eventUris = {
      default: 'update://actioncontractmodalmodel',
      show: 'update://actioncontractmodalmodel/show' }

    this.reset = function() {
      _currentDialogPanel = null;
      _item = null;
    };

    this.getCurrentDialogPanel = function() {
      return _currentDialogPanel;
    };

    this.setCurrentDialogPanel = function(value, options) {
      options = options || {silent:false};

      _currentDialogPanel = value;

      if(!options.silent) {
        $.publish(that.eventUris.setCurrentDialogPanel, _currentDialogPanel);
      }
    };

    this.getItem = function() {
      return _item;
    };

    this.setItem = function(value, options) {
      options = options || {silent:false};

      _item = value;

      if(!options.silent) {
        $.publish(that.eventUris.default);
      }
    };


    function init() {

      return that;
    }

    return init();
  }

  app.ApplyToContractDialogModel = ApplyToContractDialogModel;
  invertebrate.Model.isExtendedBy(app.ApplyToContractDialogModel);

}(wizerati, $, invertebrate));
