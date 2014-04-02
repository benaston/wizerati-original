(function (app) {
  'use strict';

  function SearchFormModeController(searchFormModel) {

    if (!(this instanceof app.SearchFormModeController)) {
      return new app.SearchFormModeController(searchFormModel);
    }

    var that = this,
        _searchFormModeEnum = app.mod('enum').SearchFormMode,
        _searchFormModel = null;

    this.update = function (dto) {
      try {
        if (_searchFormModel.getMode() !== dto.mode) { //refactor off?


          _searchFormModel.setMode(dto.mode);

          //workaround for height bug on static elements with the keyboard
          if(/(iPad|iPhone|iPod)/g.test( navigator.userAgent )) {
            if(dto.mode === _searchFormModeEnum.Default) {
              $('#bookmark-panel-container').css({'display': 'block'});
              setTimeout(function(){
                $('#bookmark-panel-container').css({'display': 'inline-block'});
              }, 62)
            }
          }

          if (dto.mode === _searchFormModeEnum.Minimized) {
            app.instance.router.redirect('/search');
          } else if (dto.mode === _searchFormModeEnum.Default) {
            app.instance.router.redirect('/search/edit');
          } else {
            throw 'invalid mode.';
          }

        }
      } catch (err) {
        console.log('SearchFormModeController::update ' + err);
      }
    };

    function init() {
      if (!searchFormModel) {
        throw 'SearchFormModeController::init searchFormModel not supplied.';
      }

      _searchFormModel = searchFormModel;

      return that;
    }

    return init();
  }

  app.SearchFormModeController = SearchFormModeController;

}(wizerati));
