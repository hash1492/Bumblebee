(function() {

  var app = angular.module('bumblebee');

  app.controller('ViewPasswordController',['$scope','$state','$stateParams','pouchdb','StorageService','$crypto',
  function($scope, $state, $stateParams, pouchdb, StorageService, $crypto) {

    console.log($stateParams);
    var password_id = $stateParams.password_id;

    var user_db = new PouchDB(JSON.parse(StorageService.get("bumblebee_session")).db_name);

    user_db.get(password_id).then(function (doc) {
      console.log(doc);
      $scope.password = doc;
      $scope.password.password = $crypto.decrypt($scope.password.password, $scope.password.pass_key);
    })
    .catch(function (err) {
      console.log(err);
    });




    $scope.togglePassword = function() {
      $scope.show_password = !$scope.show_password;
    };

  }]);

})();
