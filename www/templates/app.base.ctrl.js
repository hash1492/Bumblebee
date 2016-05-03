(function() {

  var app = angular.module('bumblebee');

  app.controller('AppBaseController',['$scope', function($scope, pouchdb) {

    // var dbLocal = new PouchDB('bumblebee');
    //
    // var dbRemote = new PouchDB('https://hash1492.cloudant.com/bumblebee');
    //
    // dbLocal.post({abc: "test"})
    // .then(function (response) {
    //   console.log(response);
    //   dbLocal.allDocs({
    //         include_docs: true
    //     }).then(function(result) {
    //        console.log(result);
    //     }).catch(function(err) {
    //         console.log(err);
    //     });
    // }).catch(function (err) {
    //     console.log(err);
    // });
    //
    // dbLocal.replicate.to(dbRemote,{live:true},function(err){
    //   console.log(err);
    // });

  }]);

})();
