// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('businesstracker', ['ionic', 'businesstracker.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('dash', {
    url: '/dash',
    abstract: true,
    templateUrl: 'templates/dashboard.html'
  })
 // Each tab has its own nav history stack:
  .state('dash.order', {
    url: '/order',
    views: {
      'dash-order': {
        templateUrl: 'templates/order-dash.html'
      }
    }
  })
  .state('dash.purchase', {
    url: '/purchase',
    views: {
      'dash-purchase': {
        templateUrl: 'templates/purchase-dash.html'
      }
    }
  })
 .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app.html'
  })
  
  .state('app.new-order', {
    url: '/new-order',
    views: {
      'menuContent': {
        templateUrl: 'templates/order-new.html'
      }
    }
  })
   .state('app.no-productdeatil', {
    url: '/no-productdeatil',
    views: {
      'menuContent': {
        templateUrl: 'templates/order-productdetail.html'
      }
    }
  })
   .state('app.new-order-payment', {
    url: '/new-order-payment',
    views: {
      'menuContent': {
        templateUrl: 'templates/order-payment.html',
        Controller:'NewOrderCtrl'
      }
    }
  })
  .state('app.new-purchase', {
    url: '/new-purchase',
    views: {
      'menuContent': {
        templateUrl: 'templates/purchase-new.html'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/dash/order');

});
