(function() {

  var app = angular.module('bumblebee');

  app.controller('AddUpdatePasswordController',['$scope','GeneralService','$state','StorageService','$stateParams','pouchdb','bcrypt','$crypto','uuid4',
  function($scope, GeneralService, $state, StorageService, $stateParams, pouchdb, bcrypt, $crypto, uuid4) {


    $scope.password = {};
    $scope.password_input_type = "password";

    var user_db = new PouchDB(JSON.parse(StorageService.get("bumblebee_session")).db_name);

    var user_db_remote = new PouchDB("https://hash1492.cloudant.com/" + JSON.parse(StorageService.get("bumblebee_session")).db_name);

    console.log($stateParams);
    // Edit password
    if($stateParams.password_id){

      $scope.edit_mode = true;

      user_db.get($stateParams.password_id)
      .then(function (doc) {
        console.log(doc);
        $scope.password = doc;
        $scope.password.password = $crypto.decrypt($scope.password.password, $scope.password.pass_key);
        console.log($scope.password.password);
      }).catch(function (err) {
          console.log(err);
      });
    }




    $scope.savePassword = function() {
      $scope.password.doc_type = "password";
      $scope.password.pass_key = uuid4.generate();
      $scope.password.password = $crypto.encrypt($scope.password.password, $scope.password.pass_key);
      console.log($scope.password);
      user_db.post($scope.password)
      .then(function (response) {
        console.log(response);
        $scope.gotoPasswordsList();
      }).catch(function (err) {
          console.log(err);
      });

      user_db.replicate.to(user_db_remote,{live:true},function(err){
        console.log(err);
      });
    };

    $scope.togglePassword = function() {
      if($scope.password_input_type === "text") {
          $scope.password_input_type = "password";
      }
      else {
        $scope.password_input_type = "text";
      }
    };

  }]);

})();
