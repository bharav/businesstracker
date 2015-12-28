(function () {
  'use strict'
  angular.module('businesstracker').controller('NewOrderCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', 'Orders', 'Customers','Products', NewOrderCtrl]);
  function NewOrderCtrl($scope, $state, $stateParams, $ionicLoading, Orders, Customers,Products) {
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
     Customers.getCustomers().then(function (data) {
       console.log(data);
        $scope.custitems = data;
      });
     Products.getProducts().then(function (data) {
       console.log(data);
         $scope.prditems =  data;
      });;
      $scope.name = ""; 
      $scope.onCustSelected = function () {
        console.log('selected=' + $scope.neworder.customer._id);
        $scope.neworder.custid = $scope.neworder.customer._id;
        $scope.neworder.custname=$scope.neworder.customer.name;
        $scope.neworder.custphone=$scope.neworder.customer.phone;
        $scope.neworder.custemail=$scope.neworder.customer.email;
        $scope.neworder.custaddress=$scope.neworder.customer.address1 + ", " + $scope.neworder.customer.address2 + ", "+$scope.neworder.customer.city;
      }
      $scope.onPrdSelected=function(){
         console.log('selected=' + $scope.product.prd._id);
         $scope.product.productid = $scope.product.prd._id
         $scope.product.productname=$scope.product.prd.name;
         $scope.product.productunitprice=$scope.product.prd.currentSP;
         $scope.product.prd =null;
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
        productid: $scope.product.productid,
        productname: $scope.product.productname,
        productunit: $scope.product.productunit,
        productunitprice: $scope.product.productunitprice
      };
      $scope.totalamount += ($scope.product.productunitprice * $scope.product.productunit);
      $scope.productListConsolidate.push(productlist);
      $scope.product.productid='';
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
