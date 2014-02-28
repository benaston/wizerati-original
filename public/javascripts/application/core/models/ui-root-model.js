(function (app, $, invertebrate) {
  'use strict';

  function UIRootModel() {

    if (!(this instanceof app.UIRootModel)) {
      return new app.UIRootModel();
    }

    var that = this,
        _uiMode = '0',
        _modal = null,
        _uiModeEnum = app.mod('enum').UIMode;

    this.updateEventUri = 'update://UIRootModel/';

    this.getUIMode = function () {
      return _uiMode || '';
    };

    this.setUIMode = function (value, options) {
      options = options || {silent: false};

      _uiMode = value;

      if (!options.silent) {
        $.publish(that.updateEventUri);
      }
    };

    this.getModal = function () {
      return _modal || '';
    };

    this.setModal = function (value) {
      _modal = value;
      $.publish(that.updateEventUri);
    };

//    this.getPreviousUIMode = function () {
//      return _previousUIMode;
//    };

    function init() {
      _uiMode = _uiModeEnum.GreenfieldSearch;
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
