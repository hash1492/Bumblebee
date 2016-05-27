(function() {

  var app = angular.module('bumblebee');

  app.controller('DashboardController',['$scope', 'StorageService',
  function($scope, StorageService) {

    $scope.user = {
      passwords: 0,
      notes: 0
    };

    var user_db = new PouchDB(JSON.parse(StorageService.get("bumblebee_session")).db_name);

    var user_db_remote = new PouchDB("https://hash1492:bumblebeepass@hash1492.cloudant.com/" + JSON.parse(StorageService.get("bumblebee_session")).db_name);

    user_db.allDocs({
      include_docs: true,
      startkey: 'secure_note',
      endkey: 'secure_note\uffff'
    })
    .then(function(result) {
       console.log(result);
       $scope.user.notes = result.rows.length;
    }).catch(function(err) {
        console.log(err);
    });

    user_db.allDocs({
      include_docs: true,
      startkey: 'password',
      endkey: 'password\uffff'
    })
    .then(function(result) {
       console.log(result);
       $scope.user.passwords = result.rows.length;
    }).catch(function(err) {
        console.log(err);
    });

  }]);

})();
