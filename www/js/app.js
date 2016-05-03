// Ionic bumblebee App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'bumblebee' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function() {
  var app = angular.module('bumblebee', ['ionic','ui.router']);

  app.config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state("app",{
      url: '/app',
      abstract: true,
      templateUrl: 'templates/app.base.tpl.html',
      controller: 'AppBaseController'
    })
    .state("login",{
      url: '/login',
      templateUrl: 'templates/login.tpl.html',
      controller: 'LoginController'
    })
    .state("app.dashboard",{
      url: '/dashboard',
      templateUrl: 'templates/dashboard.tpl.html',
      controller: 'DashboardController'
    })
    .state("intro-slider",{
      url: '/intro-slider',
      templateUrl: 'templates/intro-slider.tpl.html',
      controller: 'IntroSliderController'
    })
    .state("register",{
      url: '/register',
      templateUrl: 'templates/register.tpl.html',
      controller: 'RegisterController'
    });

    // Instead
  	$urlRouterProvider.otherwise(function ($injector) {
  		var $state = $injector.get("$state");
  		$state.go('login');
  	});
  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

  app.constant("REST_BASE_URL","http://localhost:1337");

})();
