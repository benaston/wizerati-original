(function (app, $, invertebrate) {
  'use strict';

  function TabBarModel() {

    if (!(this instanceof app.TabBarModel)) {
      return new app.TabBarModel();
    }

    var that = this,
        _tabEnum = app.mod('enum').Tab,
        _selectedTab = _tabEnum.Search;

    this.updateEventUri = 'update://tabbarmodel';

    this.getSelectedTab = function () {
      return _selectedTab;
    };

    this.setSelectedTab = function (value) {
      _selectedTab = value;
      $.publish(that.updateEventUri);
    };

    function init() {
      return that;
    }

    return init();
  }

  app.TabBarModel = TabBarModel;
  invertebrate.Model.isExtendedBy(app.TabBarModel);

}(wizerati, $, invertebrate));
