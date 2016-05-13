(function() {

  var app = angular.module('bumblebee');

  app.controller('AddUpdatePasswordController',['$scope','GeneralService','$state','StorageService','$stateParams','pouchdb','bcrypt','$crypto','uuid4','ionicToast','$ionicPopup',
  function($scope, GeneralService, $state, StorageService, $stateParams, pouchdb, bcrypt, $crypto, uuid4, ionicToast, $ionicPopup) {


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
      var password = angular.copy($scope.password);
      password.doc_type = "password";
      password.pass_key = uuid4.generate();
      password.password = $crypto.encrypt(password.password,password.pass_key);
      console.log(password);

      if(!$scope.edit_mode){
        password._id = "password_" + uuid4.generate();
      }
      user_db.put(password)
      .then(function (response) {
        console.log(response);
        ionicToast.show('Password saved', 'bottom', false, 2500);
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

    // A confirm dialog
   $scope.deletePassword = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Delete Password',
       template: 'Are you sure?'
     });

     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
         user_db.remove($scope.password)
         .then(function (result) {
            // handle result
            ionicToast.show("Password deleted", 'bottom', false, 2500);
            $scope.gotoPasswordsList();
          }).catch(function (err) {
            console.log(err);
          });
       } else {
         console.log('You are not sure');
       }
     });
   };

  }]);

})();
