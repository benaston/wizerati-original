(function (app, $, invertebrate) {
  'use strict';

  function UIRootModel() {

    if (!(this instanceof app.UIRootModel)) {
      return new app.UIRootModel();
    }

    var that = this,
        _uiModeEnum = app.mod('enum').UIMode,
        _modalEnum = app.mod('enum').Modal,
        _mainContainerVisibilityModeEnum = app.mod('enum').MainContainerVisibilityMode,
        _uiMode = _uiModeEnum.NotReady,
        _modal = _modalEnum.None,
        _visibilityMode = _mainContainerVisibilityModeEnum.Hidden,
        _areTransitionsEnabled = false, //was 'true'!
        _previousUrl = null;

    this.eventUris = { default: 'update://uirootmodel',
      setVisibilityMode: 'update://uirootmodel/setvisibilitymode',
      setAreTransitionsEnabled: 'update://uirootmodel/setaretransitionsenabled',
      setModal: 'update://uirootmodel/setmodal',
      setUIMode: 'update://uirootmodel/setuimode',
      setScrollLeft: 'update://uirootmodel/setscrollleft'
    };

    this.getVisibilityMode = function () {
      return _visibilityMode;
    };

    //used to show or hide the entire UI
    this.setVisibilityMode = function (value) {
      if (value === _visibilityMode) {
        return;
      }

      _visibilityMode = value;

      $.publish(that.eventUris.setVisibilityMode, value);
    };

    this.getAreTransitionsEnabled = function () {
      return _areTransitionsEnabled;
    };

    this.setAreTransitionsEnabled = function (value) {
      if (value === _areTransitionsEnabled) {
        return;
      }

      _areTransitionsEnabled = value;

      $.publish(that.eventUris.setAreTransitionsEnabled);
    };

    this.getUIMode = function () {
      return _uiMode || '';
    };

    this.getAndClearPreviousUrl = function () {
      var temp = _previousUrl;
      _previousUrl = null;

      return temp;
    };

    this.setPreviousUrl = function (value) {
      _previousUrl = value;
    };

    this.setUIMode = function (value, options) {
      options = options || {silent: false};

      if (value === _uiMode) {
        return;
      }

      _uiMode = value;

      if (!options.silent) {
        $.publish(that.eventUris.setUIMode, _uiMode);
      }
    };

    this.setScrollLeft = function (value, done) {
      $.publish(that.eventUris.setScrollLeft, value, done || function() {});
    };

    this.getModal = function () {
      return _modal || '';
    };

    this.setModal = function (value, options) {
      options = options || {silent: false};

      _modal = value;

      if (!options.silent) {
        $.publish(that.eventUris.setModal, _modal);
      }
    };

    this.clearModal = function () {
      that.setModal(_modalEnum.None);
    };


    function init() {
      that = $.decorate(that, app.mod('decorators').decorators.trace);
      return that;
    }

    return init();
  }

  app.UIRootModel = UIRootModel;
  invertebrate.Model.isExtendedBy(app.UIRootModel);

}(wizerati, $, invertebrate));

//wiz.mod('cronicl').CroniclSvc.getMyItemMetadata(function (metadata) {
//    $('#searchField').attr('placeholder', metadata.searchFieldPlaceholderValue);
//    $('#newItemLink').text('New ' + metadata.itemNameAlternative);
//    $('#emptyMessageMyItems').text('My  ' + metadata.itemNameAlternativePlural + ' are shown here');
//    metadata.prefetchTemplates();
//    metadata.prefetchPostRenderActions();
//});
//wiz.mod('cronicl').CroniclSvc.getSearchItemMetadata(function (metadata) {
//    metadata.prefetchTemplates();
//    metadata.prefetchPostRenderActions();
//});
