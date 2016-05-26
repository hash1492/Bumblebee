(function() {

  var app = angular.module('bumblebee');

  app.controller('AddUpdateNoteController',['$scope','GeneralService','$state','StorageService','$stateParams','pouchdb','bcrypt','$crypto','uuid4','ionicToast','$ionicPopup','$ionicLoading',
  function($scope, GeneralService, $state, StorageService, $stateParams, pouchdb, bcrypt, $crypto, uuid4, ionicToast, $ionicPopup, $ionicLoading) {

    $scope.note = {};

    var user_db = new PouchDB(JSON.parse(StorageService.get("bumblebee_session")).db_name);

    var user_db_remote = new PouchDB("https://hash1492:bumblebeepass@hash1492.cloudant.com/" + JSON.parse(StorageService.get("bumblebee_session")).db_name);

    console.log($stateParams);
    // Edit note
    if($stateParams.note_id){

      $scope.edit_mode = true;

      user_db.get($stateParams.note_id)
      .then(function (doc) {
        console.log(doc);
        $scope.note = doc;
        $scope.note.note = $crypto.decrypt($scope.note.note, $scope.note.pass_key);
        console.log($scope.note.note);
      }).catch(function (err) {
          console.log(err);
      });
    }

    $scope.saveNote = function() {
      $ionicLoading.show({
        template: 'Saving Note...'
      });
      var note = angular.copy($scope.note);
      note.doc_type = "secure_note";
      note.pass_key = uuid4.generate();
      note.note = $crypto.encrypt(note.note, note.pass_key);
      console.log(note);

      if(!$scope.edit_mode){
        note._id = "secure_note_" + uuid4.generate();
      }
      user_db.put(note)
      .then(function (response) {
        console.log(response);
        $ionicLoading.hide();
        ionicToast.show('Note saved', 'bottom', false, 2500);
        $scope.gotoNotesList();
      }).catch(function (err) {
          console.log(err);
      });

      user_db.replicate.to(user_db_remote,{live:true},function(err){
        console.log(err);
      });
    };

    $scope.deleteNote = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Note',
        template: 'Are you sure?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          $ionicLoading.show({
            template: 'Deleting Note...'
          });
          console.log('You are sure');
          user_db.remove($scope.note)
          .then(function (result) {
             // handle result
             $ionicLoading.hide();
             ionicToast.show("Note deleted", 'bottom', false, 2500);
             $scope.gotoNotesList();
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
