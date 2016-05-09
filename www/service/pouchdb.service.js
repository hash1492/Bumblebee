(function() {

  var app = angular.module('bumblebee');

  app.factory('pouchdb', function() {

    var _local = new PouchDB('bumblebee');

    var _remote = new PouchDB('https://hash1492.cloudant.com/bumblebee');

    return {
      local: _local,
      remote: _remote
    };
  });

})();
