(function() {

  var app = angular.module('bumblebee');

  app.controller('PasswordGeneratorController',['$scope','$state','$stateParams','pouchdb','StorageService','$crypto','$cordovaClipboard','ionicToast',
  function($scope, $state, $stateParams, pouchdb, StorageService, $crypto, $cordovaClipboard, ionicToast) {

    var letters = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ";

    var digits = "0123456789";

    var symbols = "@#$%!&?";

    $scope.password = {
      letters: true,
      digits: true,
      symbols: true,
      password_length: 6,
      value: ""
    };

    $scope.generatePassword = function() {
      var password_chars = "";
      $scope.password.value = "";
      if($scope.password.letters){
        password_chars = password_chars + letters;
      }
      if($scope.password.digits){
        password_chars = password_chars + digits;
      }
      if($scope.password.symbols){
        password_chars = password_chars + symbols;
      }
      console.log(password_chars);
      for (var i = 0; i < 20; i++) {
        var random_index = Math.floor((Math.random() * password_chars.length) + 0);
        $scope.password.value = $scope.password.value + password_chars[random_index];
      }
      console.log($scope.password.value);
      $scope.password.value = $scope.password.value.substr(0, $scope.password.password_length);
    };
    $scope.generatePassword();

    $scope.copyToClipboard = function() {
        $cordovaClipboard
        .copy($scope.password.value)
        .then(function () {
          ionicToast.show("Copied to clipboard", 'bottom', false, 2500);
        }, function () {
          // error
        });
    };

  }]);

})();
