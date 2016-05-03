(function() {

  var app = angular.module('bumblebee');

  app.factory('pouchdb', function() {
    return new PouchDB('myApp');
  });

})();
