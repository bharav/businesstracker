// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('businesstracker', ['ionic',
    'businesstracker.services',
    'businesstracker.masterservice',
    'businesstracker.directive'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
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

    .config(function ($stateProvider, $urlRouterProvider) {

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
                cache: false,
                url: '/order',
                views: {
                    'dash-order': {
                        templateUrl: 'templates/order-dash.html',
                        controller: 'OrderDashCtrl'
                    }
                }
            })
            .state('dash.purchase', {
                url: '/purchase',
                views: {
                    'dash-purchase': {
                        templateUrl: 'templates/purchase-dash.html',
                        controller: 'PurchaseDashCtrl'
                    }
                }
            })
            .state('app', {
                cache: false,
                url: '/app',
                abstract: true,
                templateUrl: 'templates/app.html'
            })
            .state('app.customer', {
                url: '/customer',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/customer.html'
                    }
                }
            })
            .state('app.new-order', {
                cache: false,
                url: '/new-order',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/order-new.html',
                        controller: 'NewOrderCtrl'
                    }
                }
            })
            .state('app.editorder', {
                url: '/editorder/:orderId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/order-new.html',
                        controller: 'NewOrderCtrl'
                    }
                }
            })
            .state('app.no-productdeatil', {
                cache: false,
                url: '/no-productdeatil',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/order-productdetail.html',
                        controller: 'NewOrderCtrl'
                    }
                }
            })
            .state('app.new-order-payment', {
                cache: false,
                url: '/new-order-payment',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/order-payment.html',
                        controller: 'NewOrderCtrl'
                    }
                }
            })

            .state('app.order-summary', {
                cache: false,
                url: '/orders/:orderId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/order-summary.html'
                    }
                }
            })
            .state('app.new-purchase', {
                url: '/new-purchase',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/purchase-new.html',
                        controller: 'NewPurchaseCtrl'
                    }
                }
            })
            .state('app.purchase-productdeatil', {
                url: '/purchase-productdeatil',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/purchase-productdetail.html',
                        controller: 'NewPurchaseCtrl'
                    }
                }
            })
            .state('app.purchase-payment', {
                url: '/purchase-payment',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/purchase-payment.html',
                        controller: 'NewPurchaseCtrl'
                    }
                }
            })
            .state('app.purchase-summary', {
                url: '/purchases/:purchaseId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/purchase-summary.html'
                    }
                }
            })
            .state('app.purchasestockupdate', {
                url: '/purchasestockupdate/:purchaseId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/productList.html'
                    }
                }
            })
             .state('app.productdetail', {
                url: '/productdetail/:productId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/productdetail.html'
                    }
                }
            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/dash/order');

    });
