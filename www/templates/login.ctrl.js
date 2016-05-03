(function() {

  var app = angular.module('bumblebee');

  app.controller('LoginController',['$scope','GeneralService',
  function($scope, GeneralService) {

    $scope.user = {};

    $scope.login = function() {
      console.log("login called");
      GeneralService.login($scope.user)
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
