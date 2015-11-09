(function() {
  'use strict'
  angular.module('businesstracker').controller('NewPurchaseCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', 'Purchases', NewPurchaseCtrl]);
  function NewPurchaseCtrl($scope, $state, $stateParams, $ionicLoading, Purchases) {
    if (typeof $stateParams.orderId != 'undefined') {
      $ionicLoading.show({
        template: 'Loading...'
      });
      Purchases.setPurchaseId($stateParams.orderId);
      Purchases.getPurchasebyId().then(function (data) {
        $scope.newpurchase = data;
        $ionicLoading.hide();
      });
    }
    $scope.productListConsolidate = [];
    $scope.purchasetotalamount = 0.00;
    $scope.newpurchase = Purchases.getPurchaselocal();
    $scope.GoToPurchasePrd = function () {
      Purchases.setPurchaselocal($scope.newpurchase);
      $state.go("app.purchase-productdeatil");
    }

    if ($scope.newpurchase.product != null || $scope.newpurchase.product != undefined) {
      $scope.productListConsolidate = $scope.newpurchase.product;
      $scope.purchasetotalamount = $scope.newpurchase.purchasetotalamount;
    }
    $scope.listCanSwipe = true

    $scope.AddProduct = function () {
      var productlist = {
        productname: $scope.product.productname,
        productunit: $scope.product.productunit,
        productunitpurhaseprice: $scope.product.productunitpurhaseprice
      };
      $scope.purchasetotalamount += ($scope.product.productunitpurhaseprice * $scope.product.productunit);
      $scope.productListConsolidate.push(productlist);
      $scope.product.productname = '';
      $scope.product.productunit = '';
      $scope.product.productunitpurhaseprice = '';


      console.log(productlist);
      console.log($scope.productListConsolidate);
    }
    $scope.productedit = function (product, index) {
      $scope.product.productname = product.productname;
      $scope.product.productunit = product.productunit;
      $scope.product.productunitpurhaseprice = product.productunitpurhaseprice;
      $scope.purchasetotalamount -= (product.productunit * product.productunitpurhaseprice);
      $scope.productListConsolidate.splice(index, 1);
    }
    $scope.productdelete = function (product, index) {
      $scope.purchasetotalamount -= (product.productunit * product.productunitpurhaseprice);
      $scope.productListConsolidate.splice(index, 1);
    }

    $scope.GoToPurchasePayment = function () {
      $scope.newpurchase.product = $scope.productListConsolidate;
      $scope.newpurchase.purchasetotalamount = $scope.purchasetotalamount;
      Purchases.setPurchaselocal($scope.newpurchase);
      $state.go("app.purchase-payment");
    }
    $scope.SubmitPurchase = function () {
      Purchases.setPurchaselocal($scope.newpurchase);
      if ($scope.newpurchase._id === undefined) {
        Purchases.setPurchases($scope.newpurchase).then(function (data) {
          $scope.newpurchase = null;
          $state.go('app.purchase-summary', {'purchaseId': data._id});
          console.log(data);
        });
      }
      else {
        Purchases.setPurchaseId($scope.newpurchase._id);
        Purchases.updatePurchase($scope.newpurchase).then(function (data) {
          $scope.newpurchase = null;
          $state.go('app.purchase-summary', {'purchaseId': data._id});
          console.log(data);
        });
      }
    }
  }
})();



