(function() {

  var app = angular.module('bumblebee');

  app.controller('IntroSliderController',['$scope','$state','$ionicSlideBoxDelegate',
  function($scope, $state, $ionicSlideBoxDelegate) {

    $scope.previousSlide = function() {
      $ionicSlideBoxDelegate.previous();
    };

    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.skipIntro = function() {
      $state.go("register");
    };

    $scope.getStarted = function() {
      $state.go("register");
    };

    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };

  }]);

})();
