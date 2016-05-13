(function() {

  var app = angular.module('bumblebee');

  app.controller('LoginController',['$scope','GeneralService','$state','StorageService','bcrypt','$ionicHistory','ionicToast',
  function($scope, GeneralService, $state, StorageService, bcrypt, $ionicHistory, ionicToast) {

    $ionicHistory.clearHistory();

    if(StorageService.get("bumblebee_session")){
      $state.go("app.dashboard");
    }


    $scope.user = {};

    $scope.logged_in = StorageService.get("logged_in");

    $scope.login = function() {
      console.log("login called");
      // If logged in once, use local db for logging in
      if(StorageService.get("logged_in") == "true"){
        console.log("test");
        // var user_db = new PouchDB(StorageService.set("bumblebee_session").email);
        var actual_password = JSON.parse(StorageService.get("bumblebee_session")).password;
        console.log(actual_password);
        bcrypt.compare($scope.user.password, actual_password, function(err, matching) {
            // Password is correct
            console.log(err);
            console.log(matching);
            if(matching){
              var user_db = new PouchDB(JSON.parse(StorageService.get("bumblebee_session")).db_name);

              var user_db_remote = new PouchDB("https://hash1492.cloudant.com/" + JSON.parse(StorageService.get("bumblebee_session")).db_name);

              user_db.replicate.from(user_db_remote,{live:true},function(err){
                console.log(err);
              });
              $state.go("app.dashboard");
            }
            // Password is incorrect
            else{
              ionicToast.show("Incorrect password", 'bottom', false, 2500);
            }
        });
      }

      // If logging in for the first time, use remote master db for logging in
      else {
        GeneralService.login($scope.user)
        .then(function(response) {
          console.log(response);
          if(response.data.code == "LOGIN_SUCCESSFUL"){
            StorageService.set("bumblebee_session", JSON.stringify(response.data.data));
            StorageService.set("logged_in",true);

            var user_db = new PouchDB(JSON.parse(StorageService.get("bumblebee_session")).db_name);

            var user_db_remote = new PouchDB("https://hash1492.cloudant.com/" + JSON.parse(StorageService.get("bumblebee_session")).db_name);

            user_db.replicate.from(user_db_remote,{live:true},function(err){
              console.log(err);
            });
            $state.go("app.dashboard");
          }
          else if(response.data.code == "INCORRECT_PASSWORD"){
            ionicToast.show("Incorrect password", 'bottom', false, 2500);
          }
          else if(response.data.code == "INVALID_EMAIL"){
            ionicToast.show("User doesn't exist", 'bottom', false, 2500);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      }
    };

    $scope.gotoRegister = function() {
      $state.go("register");
    };

  }]);

})();
