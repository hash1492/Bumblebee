(function() {

  var app = angular.module('bumblebee');

  app.controller('SettingsController',['$scope','$state','$stateParams','pouchdb','StorageService',
  function($scope, $state, $stateParams, pouchdb, StorageService) {

    StorageService.get("bumblebee_settings");
    console.log(StorageService.get("bumblebee_settings"));
    console.log(typeof StorageService.get("bumblebee_settings"));

    $scope.settings = {};

    $scope.time_vales = [
      {
        time: "15 secs",
        value: 15000
      },
      {
        time: "30 secs",
        value: 30000
      },
      {
        time: "45 secs",
        value: 45000
      },
      {
        time: "1 min",
        value: 60000
      },
      {
        time: "5 min",
        value: 300000
      },
      {
        time: "Never",
        value: 0
      }
      ];


  }]);

})();
