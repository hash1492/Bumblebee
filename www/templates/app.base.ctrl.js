(function() {

  var app = angular.module('bumblebee');

  app.controller('AppBaseController',['$scope','pouchdb','StorageService','$state','$ionicHistory',
   function($scope, pouchdb, StorageService, $state, $ionicHistory) {

     if(!StorageService.get("bumblebee_session")){
       $state.go("login");
       return;
     }

    $scope.logout = function() {
      StorageService.delete("bumblebee_session");
      $state.go("login");
    };

    $scope.gotoPasswordsList = function() {
      $state.go("app.passwords-list");
    };

    $scope.gotoAddPassword = function () {
      $state.go("app.add-password");
    };

    $scope.gotoUpdatePassword = function (password_id) {
      $state.go("app.update-password", {password_id: password_id});
    };

    $scope.gotoViewPassword = function(password_id) {
      $state.go("app.view-password",{password_id: password_id});
    };

    $scope.goBack = function() {
      $ionicHistory.goBack();
    };

    $scope.gotoLogin = function() {
      $state.go("login");
    };

    $scope.gotoRegister = function() {
      $state.go("register");
    };

  }]);

})();
