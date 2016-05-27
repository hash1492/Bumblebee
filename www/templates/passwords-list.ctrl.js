(function() {

  var app = angular.module('bumblebee');

  app.controller('PasswordsListController',['$scope','$state','pouchdb','StorageService',
  function($scope, $state, pouchdb, StorageService) {

    // $scope.letters =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    $scope.search = "";

    $scope.passwords = [];

    var user_db = new PouchDB(JSON.parse(StorageService.get("bumblebee_session")).db_name);
    // console.log(user_db);

    user_db.allDocs({
      include_docs: true,
      startkey: 'password',
      endkey: 'password\uffff'
    })
    .then(function(result) {
       console.log(result);
       result.rows.forEach(function(password) {
        //  if(password.doc.doc_type == "password"){
          $scope.passwords.push(password);
        //  }
       });
       console.log($scope.passwords);
    }).catch(function(err) {
        console.log(err);
    });

  }]);

})();
