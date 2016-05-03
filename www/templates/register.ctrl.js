(function() {

  var app = angular.module('bumblebee');

  app.controller('RegisterController',['$scope','GeneralService','$state',
  function($scope, GeneralService, $state) {
    $scope.user = {};

    $scope.register = function() {
      console.log("register called");

      if($scope.user.password !== $scope.user.confirm_password){
        alert("Passwords don't match");
        return;
      }

      GeneralService.register($scope.user)
      .then(function(response) {
        console.log(response);
        $state.go("login");
      })
      .catch(function(err) {
        console.log(err);
      });
    };

  }]);

})();
