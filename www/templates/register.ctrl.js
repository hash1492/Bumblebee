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
        // var user_db = new PouchDB(response.data.db_name);
        // var user_credentials_doc = {
        //   doc_type: 'user_credentials',
        //   db_name: response.data.db_name,
        //   email: response.data.email,
        //   password: user.data.password
        // };
        // user_db.put(user_credentials_doc)
        // .then(function(response) {
        //   console.log(response);
        //   $state.go("login");
        // })
        // .catch(function(err) {
        //   console.log(err);
        // });
        var user_db = new PouchDB(response.data.db_name);
        $state.go("login");
      })
      .catch(function(err) {
        console.log(err);
      });
    };

    $scope.gotoLogin = function() {
      $state.go("login");
    };

  }]);

})();
