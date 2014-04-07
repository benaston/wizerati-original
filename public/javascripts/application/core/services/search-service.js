//try forcing service types to communicate with the UI only via routing and local storage?
(function (app, $) {
  'use strict';

  function SearchService(croniclIService, itemCache) {

    if (!(this instanceof app.SearchService)) {
      return new app.SearchService(croniclIService, itemCache);
    }

    var that = this,
        _croniclIService = null,
        _itemCache = null;

    //rename to success, plus add timeout argument and error
    this.runSearch = function (keywords, rate, done) {
      done = !done ? function (data) {
      } : done;

      $.ajax({
        url: _croniclIService.getCroniclUri() + 'search',
        success: success,
        cache: false
      });

      function success(data) {
        if (!data) {
          throw 'data not supplied';
        }

        var results = $.parseJSON(data);
        _itemCache.insert(results);
        done(results);
      }
    };

    function init() {
      try {
        if (!croniclIService) {
          throw 'croniclService not supplied.';
        }

        if (!itemCache) {
          throw 'itemCache not supplied.';
        }

        _croniclIService = croniclIService;
        _itemCache = itemCache;

        return that;
      } catch (e) {
        throw 'SearchService::init ' + e;
      }
    }

    return init();
  }

  app.SearchService = SearchService;

}(wizerati, $));

//throw 'next: use cronicl service to get the uri,
// then pass it into done argument (which should update the relevant models - and hence the UI)';

//use a factory for the search URI?
//var defaults = {
//    searchUri: './items?q=',
//    keywords: null,
//    filterModel: null,
//    pre: function () {
//    },
//    success: function () {
//    }, //function(data) - instantiate the relevant models from the json for use by the application
//    error: function (e) {
//        throw 'runSearch error: ' + e;
//    }
//};
//
//options = _.extend({}, defaults, options);
//
//if (!data) {
//    throw 'data not supplied';
//}

//            console.log(data);
//write the results to local storage, then return to the controller
//the controller can then coordinate the updating of any views

//var results = $.parseJSON(data);
//console.log(data);
//            var resultModels = [];
//
//            _.each(results, function (r) {
//                resultModels.push(_modelFactory.create(r));
//            });
//
//
//            _resultListModel.setResults(resultModels);

//                var resultModels = [];
//
//                _.each(results, function (r) {
//                    resultModels.push(_resultModelFactory.create(r));
//                });
