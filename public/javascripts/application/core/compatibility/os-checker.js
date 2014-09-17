(function (app) {
  'use strict';

  function OSChecker() {
    if (!(this instanceof OSChecker)) {
      return new OSChecker();
    }

    var osEnum = app.mod('enum').OS;

    this.getOS = function () {
      if(/(Windows)/g.test( navigator.userAgent )) {
        return osEnum.Windows;
      }

      if(/(Unix|Linux|Solaris)/g.test( navigator.userAgent )) {
        return osEnum.Unix;
      }

      if(/(Macintosh)/g.test( navigator.userAgent )) {
        return osEnum.Mac;
      }
    };
  }

  app.OSChecker = OSChecker;

}(wizerati));
