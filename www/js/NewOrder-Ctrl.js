(function(){
  'use strict'
  angular.module('businesstracker').controller('NewOrderCtrl',['$scope', '$state', '$stateParams', '$ionicLoading', 'Orders',NewOrderCtrl]);
  function NewOrderCtrl($scope, $state, $stateParams, $ionicLoading, Orders) {
    if (typeof $stateParams.orderId != 'undefined') {
      $ionicLoading.show({
        template: 'Loading...'
      });
      Orders.setOrderId($stateParams.orderId);
      Orders.getOrderbyId().then(function (data) {
        $scope.neworder = data;
        $ionicLoading.hide();
      });
    }
    $scope.productListConsolidate = [];
    $scope.totalamount = 0.00;
    $scope.neworder = Orders.getOrderlocal();
    $scope.GoToProduct = function () {
      Orders.setOrderlocal($scope.neworder);
      $state.go("app.no-productdeatil");
    }

    if ($scope.neworder.product != null || $scope.neworder.product != undefined) {
      $scope.productListConsolidate = $scope.neworder.product;
      $scope.totalamount = $scope.neworder.totalamount;
    }
    $scope.listCanSwipe = true

    $scope.AddProduct = function () {
      var productlist = {
        productname: $scope.product.productname,
        productunit: $scope.product.productunit,
        productunitprice: $scope.product.productunitprice
      };
      $scope.totalamount += ($scope.product.productunitprice * $scope.product.productunit);
      $scope.productListConsolidate.push(productlist);
      $scope.product.productname = '';
      $scope.product.productunit = '';
      $scope.product.productunitprice = '';


      console.log(productlist);
      console.log($scope.productListConsolidate);
    }
    $scope.productedit = function (product, index) {
      $scope.product.productname = product.productname;
      $scope.product.productunit = product.productunit;
      $scope.product.productunitprice = product.productunitprice;
      $scope.totalamount -= (product.productunit * product.productunitprice);
      $scope.productListConsolidate.splice(index, 1);
    }
    $scope.productdelete = function (product, index) {
      $scope.totalamount -= (product.productunit * product.productunitprice);
      $scope.productListConsolidate.splice(index, 1);
    }

    $scope.GoToPayment = function () {
      $scope.neworder.product = $scope.productListConsolidate;
      $scope.neworder.totalamount = $scope.totalamount;
      Orders.setOrderlocal($scope.neworder);
      $state.go("app.new-order-payment");
    }
    $scope.SubmitOrder = function () {
      Orders.setOrderlocal($scope.neworder);
      if ($scope.neworder._id === undefined) {
        Orders.setOrders($scope.neworder).then(function (data) {
          $scope.neworder = null;
          $state.go('app.order-summary', { 'orderId': data._id });
          console.log(data);
        });
      }
      else {
        Orders.setOrderId($scope.neworder._id);
        Orders.updateOrder($scope.neworder).then(function (data) {
          $scope.neworder = null;
          $state.go('app.order-summary', { 'orderId': data._id });
          console.log(data);
        });
      }
    }
  }
})();
