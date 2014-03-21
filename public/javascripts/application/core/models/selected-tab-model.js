(function (app, $, invertebrate) {
  'use strict';

  function SelectedTabModel() {

    if (!(this instanceof app.SelectedTabModel)) {
      return new app.SelectedTabModel();
    }

    var that = this,
        _selectedCubeFaceId = '0';

    this.updateEventUri = 'update://selectedtabmodel';

    this.getSelectedTab = function () {
      return _selectedCubeFaceId;
    };

    this.setSelectedTab = function (value) {
      _selectedCubeFaceId = value;
      $.publish(that.updateEventUri);
    };

    function init() {
      return that;
    }

    return init();
  }

  app.SelectedTabModel = SelectedTabModel;
  invertebrate.Model.isExtendedBy(app.SelectedTabModel);

}(wizerati, $, invertebrate));
