(function() {

  var app = angular.module('bumblebee');

  app.controller('SettingsController',['$scope','$state','$stateParams','pouchdb','StorageService','$rootScope',
  function($scope, $state, $stateParams, pouchdb, StorageService, $rootScope) {


    console.log(StorageService.get("bumblebee_settings"));
    console.log(typeof StorageService.get("bumblebee_settings"));

    $scope.settings = {};

    $scope.settings = JSON.parse(StorageService.get("bumblebee_settings"));

    $scope.time_values = [
      {
        time: "15 secs",
        value: 15
      },
      {
        time: "30 secs",
        value: 30
      },
      {
        time: "45 secs",
        value: 45
      },
      {
        time: "1 min",
        value: 60
      },
      {
        time: "5 min",
        value: 300
      },
      {
        time: "Never",
        value: 0
      }
      ];

      $scope.saveSettings = function() {
        StorageService.set("bumblebee_settings",JSON.stringify($scope.settings));
        $rootScope.$broadcast('reset-lock-timer');
      };


  }]);

})();
