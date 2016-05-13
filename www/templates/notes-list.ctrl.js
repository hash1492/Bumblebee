(function() {

  var app = angular.module('bumblebee');

  app.controller('NotesListController',['$scope','GeneralService','$state','StorageService',
  function($scope, GeneralService, $state, StorageService) {

    // $scope.letters =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    $scope.notes = [];

    var user_db = new PouchDB(JSON.parse(StorageService.get("bumblebee_session")).db_name);
    // console.log(user_db);

    user_db.allDocs({
      include_docs: true,
      startkey: 'secure_note'
    })
    .then(function(result) {
       console.log(result);
       result.rows.forEach(function(note) {
        //  if(password.doc.doc_type == "password"){
          $scope.notes.push(note);
        //  }
       });
       console.log($scope.notes);
    }).catch(function(err) {
        console.log(err);
    });

  }]);

})();
