(function() {

  var app = angular.module('bumblebee');

  app.controller('AppBaseController',['$scope','pouchdb','StorageService','$state','$ionicHistory','$rootScope','$interval',
   function($scope, pouchdb, StorageService, $state, $ionicHistory, $rootScope, $interval) {

     if(!StorageService.get("bumblebee_session")){
       $state.go("login");
       return;
     }

     $rootScope.bumblebee_session = JSON.parse(StorageService.get("bumblebee_session"));

     var user_db = new PouchDB(JSON.parse(StorageService.get("bumblebee_session")).db_name);

     var user_db_remote = new PouchDB("https://hash1492:bumblebeepass@hash1492.cloudant.com/" + JSON.parse(StorageService.get("bumblebee_session")).db_name);

     user_db.replicate.from(user_db_remote,{live:true},function(err){
       console.log(err);
     });

    $scope.logout = function() {
      StorageService.delete("bumblebee_session");
      $state.go("login");
    };

    $scope.gotoDashboard = function() {
      $state.go("app.dashboard");
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

    $scope.gotoPasswordGenerator = function() {
      $state.go("app.password-generator");
    };

    $scope.gotoNotesList = function() {
      $state.go("app.notes-list");
    };

    $scope.gotoAddNote = function () {
      $state.go("app.add-note");
    };

    $scope.gotoUpdateNote = function(note_id) {
      $state.go("app.update-note", {note_id: note_id});
    };

    $scope.gotoViewNote = function(note_id) {
      $state.go("app.view-note",{note_id: note_id});
    };

    $scope.gotoSettings = function() {
      $state.go("app.settings");
    };

    $scope.lockApp = function() {
      // StorageService.delete("bumblebee_session");
      $state.go("login");
    };

    var logout_timer = JSON.parse(StorageService.get("bumblebee_settings")).autolock_time;


    // reset the logout timer to the time set in settings
    $scope.$on('reset-lock-timer', function(event, args) {
        logout_timer = JSON.parse(StorageService.get("bumblebee_settings")).autolock_time;
    });

    // Handle the lock-app broadcasted event
    $scope.$on('lock-app', function(event, args) {
        $scope.lockApp();
    });


    // After each second, decrement the timer count by 1 second
    var interval_promise = $interval(function() {
      if(logout_timer == -1){
        $interval.cancel(interval_promise);
      }
      logout_timer = logout_timer - 1;
      $scope.timer_count = logout_timer;
      if(logout_timer === 0){
        $interval.cancel(interval_promise);
        $rootScope.$broadcast('lock-app');
      }
    }, 1000);


    // Add touch event listener to app body
    var app_body = document.getElementById("app-body");
    // On touch event, reset the logout timer
    app_body.addEventListener("touchstart", function() {
      $rootScope.$broadcast('reset-lock-timer');
    }, false);




  }]);

})();
