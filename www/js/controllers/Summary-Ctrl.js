(function() {
  'use strict';
  angular.module('businesstracker').controller('PurchaseSummaryCtrl', ['$scope','$stateParams','$ionicLoading','Purchases',PurchaseSummaryCtrl]);
  function PurchaseSummaryCtrl($scope, $stateParams,$ionicLoading,Purchases) {
    Purchases.setPurchaseId($stateParams.purchaseId);
    $ionicLoading.show({
      template: 'Loading...'
    });
    Purchases.getPurchasebyId().then(function (data) {
      $scope.purchase = data;
      $ionicLoading.hide();
    });
  }
})();




(function() {
  'use strict';
  angular.module('businesstracker').controller('OrderSummaryCtrl', ['$scope','$stateParams','$ionicLoading','Orders','Customers',OrderSummaryCtrl]);
  function OrderSummaryCtrl($scope,$stateParams,$ionicLoading,Orders,Customers) {
  Orders.setOrderId($stateParams.orderId);
  $ionicLoading.show({
    template: 'Loading...'
  });
  Orders.getOrderbyId().then(function (data) {
    $scope.order = data;
      Customers.getCustomerbyId($scope.order.custid).then(function (data){
        $scope.order.customer = data;
        $ionicLoading.hide();
      });
    
  });
}
})();

