(function() {

  var app = angular.module('bumblebee');

  app.controller('ViewNoteController',['$scope','$state','$stateParams','pouchdb','StorageService','$crypto',
  function($scope, $state, $stateParams, pouchdb, StorageService, $crypto) {

    console.log($stateParams);
    var note_id = $stateParams.note_id;

    var user_db = new PouchDB(JSON.parse(StorageService.get("bumblebee_session")).db_name);

    user_db.get(note_id).then(function (doc) {
      console.log(doc);
      $scope.note = doc;
      $scope.note.note = $crypto.decrypt($scope.note.note, $scope.note.pass_key);
    })
    .catch(function (err) {
      console.log(err);
    });


  }]);

})();
