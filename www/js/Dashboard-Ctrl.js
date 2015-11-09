(function(){
  'use strict';
  angular.module('businesstracker').controller('OrderDashCtrl',['$scope','$state','$ionicLoading', 'Orders',OrderDashCtrl]);
  function OrderDashCtrl($scope, $state, $ionicLoading, Orders) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    Orders.getOrders().then(function (data) {
      console.log(data);
      $scope.orders = data;
      $ionicLoading.hide();
    });
    $scope.SearchOrderbyDate = function () {
      $ionicLoading.show({
        template: 'Loading...'
      });
      Orders.setOrderDate($scope.vm.orderdate);
      Orders.getOrdersbyDate().then(function (data) {
        console.log(data);
        $scope.orders = data;
        $ionicLoading.hide();
      });
    };
    $scope.GoToOrder = function (orderid) {
      $state.go('app.order-summary', { 'orderId': orderid });
    }
  }
  })();


(function(){
  'use strict';
  angular.module('businesstracker').controller('PurchaseDashCtrl',['$scope','$state','$ionicLoading', 'Purchases',PurchaseDashCtrl]);
  function PurchaseDashCtrl($scope, $state, $ionicLoading, Purchases) {
  $ionicLoading.show({
    template: 'Loading...'
  });
  Purchases.getPurchases().then(function (data) {
    console.log(data);
    $scope.purchases = data;
    $ionicLoading.hide();
  });
  $scope.SearchPurchasebyDate = function () {
    $ionicLoading.show({
      template: 'Loading...'
    });
    Purchases.setPurchaseDate($scope.vm.orderdate);
    Purchases.getPurchasesbyDate().then(function (data) {
      console.log(data);
      $scope.purchases = data;
      $ionicLoading.hide();
    });
  };
  $scope.GoToPurchase = function (purchaseid) {
    $state.go('app.purchase-summary', { 'purchaseId': purchaseid });
  }
}
})();
