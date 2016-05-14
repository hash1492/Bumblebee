(function() {

  var app = angular.module('bumblebee');

  app.controller('IntroSliderController',['$scope','$state','$ionicSlideBoxDelegate','StorageService',
  function($scope, $state, $ionicSlideBoxDelegate, StorageService) {

    if(StorageService.get("intro_done") === true){
      $state.go("register");
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
