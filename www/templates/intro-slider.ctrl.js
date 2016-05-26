(function() {

  var app = angular.module('bumblebee');

  app.controller('IntroSliderController',['$scope','$state','$ionicSlideBoxDelegate','StorageService',
  function($scope, $state, $ionicSlideBoxDelegate, StorageService) {

    console.log(StorageService.get("intro_done"));
    if(StorageService.get("intro_done") == "true" && StorageService.get("logged_in") !== "true"){
      $state.go("register");
      return;
    }

    if(StorageService.get("intro_done") == "true" && StorageService.get("logged_in") === "true"){
      $state.go("login");
      return;
    }

    $scope.slideIndex = 0;

    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
    };

    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.skipIntro = function() {
      StorageService.set("intro_done", true);
      $state.go("register");
    };

    $scope.getStarted = function() {
      StorageService.set("intro_done", true);
      $state.go("register");
    };

    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };

  }]);

})();
