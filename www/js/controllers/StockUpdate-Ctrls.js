(function () {
    'use strict'
    angular.module('businesstracker').controller('PurchaseStockListCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', 'Purchases','Product', PurchaseStockListCtrl]);
    function PurchaseStockListCtrl($scope, $state, $stateParams, $ionicLoading, Purchases, Product) {
        Purchases.setPurchaseId($stateParams.purchaseId);
        $ionicLoading.show({
            template: 'Loading...'
        });
        Purchases.getPurchasebyId().then(function (data) {
            var localpurchase=Product.getPurchaseProductLocal()
            if(localpurchase==null){
                $scope.products = data.product;
                Product.setPurchaseProductLocal(data);
            }
            else
            {
                $scope.products=localpurchase.product;
                var stockNotupdated=false;
                localpurchase.product.forEach(function (element) {
                    if (element.stockupdated == false) {
                        stockNotupdated = true;
                    }
                }, this);
                if(stockNotupdated == false)
                {
                    Purchases.updatePurchase(localpurchase).then(function(data){
                       Product.ClearPurchaseProduct();
                       $state.go("dash.purchase");
                    });
                }
            }
            
            
            $ionicLoading.hide();
        });
    }
})();
(function(){
    'use strict'
    angular.module('businesstracker').controller('PurchaseStockListCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', 'Purchases','Product', PurchaseStockListCtrl]);
    function PurchaseStockListCtrl($scope, $state, $stateParams, $ionicLoading,Product) {
        
    }
})()