(function() {

  var app = angular.module('bumblebee');

  app.controller('RegisterController',['$scope','GeneralService','$state','$ionicHistory','ionicToast','$ionicLoading','$cordovaNetwork',
  function($scope, GeneralService, $state, $ionicHistory, ionicToast, $ionicLoading, $cordovaNetwork) {

    $ionicHistory.clearHistory();

    $scope.user = {};

    $scope.register = function() {
      console.log("register called");
      if($cordovaNetwork.isOnline()){
        $ionicLoading.show({
          template: 'Registering...'
        });

        if($scope.user.password !== $scope.user.confirm_password){
          $ionicLoading.hide();
          ionicToast.show("Passwords don't match", 'bottom', false, 2500);
          return;
        }

        GeneralService.register($scope.user)
        .then(function(response) {
          console.log(response);
          // User with this email already exists
          if(response.data.code === "USER_EXISTS"){
            $ionicLoading.hide();
            ionicToast.show("User already exists", 'bottom', false, 2500);
            return;
          }
          // User registration successfull
          else if(response.data.code === "USER_REGISTERED"){
            var user_db = new PouchDB(response.data.data.db_name);
            $ionicLoading.hide();
            $state.go("login");
          }
        })
        .catch(function(err) {
          console.log(err);
          $ionicLoading.hide();
        });
      }
      else {
        ionicToast.show("Please connect to the internet", 'bottom', false, 2500);
      }
    };

    $scope.gotoLogin = function() {
      $state.go("login");
    };

  }]);

})();
