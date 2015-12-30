(function () {
    'use strict'
    angular.module('businesstracker').controller('PurchaseStockListCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', 'Purchases', PurchaseStockListCtrl]);
    function PurchaseStockListCtrl($scope, $state, $stateParams, $ionicLoading, Purchases) {
        Purchases.setPurchaseId($stateParams.purchaseId);
        $ionicLoading.show({
            template: 'Loading...'
        });
        Purchases.getPurchasebyId().then(function (data) {
            $scope.products = data.product;
            $ionicLoading.hide();
        });
    }
})()