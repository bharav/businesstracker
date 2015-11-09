angular.module('businesstracker.controllers', [])

  .controller('NewOrderCtrl', function ($scope, $state, $stateParams, $ionicLoading, Orders) {
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
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('OrderDashCtrl', function ($scope, $state, $ionicLoading, Orders) {
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
    }
    $scope.GoToOrder = function (orderid) {
      $state.go('app.order-summary', { 'orderId': orderid });
    }
  })
  .controller('OrderSummaryCtrl', function ($scope, $stateParams, Orders, $ionicLoading) {
    Orders.setOrderId($stateParams.orderId);
    $ionicLoading.show({
      template: 'Loading...'
    });
    Orders.getOrderbyId().then(function (data) {
      $scope.order = data;
      $ionicLoading.hide();
    });
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })
    .controller('NewPurchaseCtrl', function ($scope, $state, $stateParams, $ionicLoading, Purchases) {
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
          $state.go('app.purchase-summary', { 'purchaseId': data._id });
          console.log(data);
        });
      }
      else {
        Purchases.setPurchaseId($scope.newpurchase._id);
        Purchases.updatePurchase($scope.newpurchase).then(function (data) {
          $scope.newpurchase = null;
          $state.go('app.purchase-summary', { 'purchaseId': data._id });
          console.log(data);
        });
      }
    }
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('PurchaseDashCtrl', function ($scope, $state, $ionicLoading, Purchases) {
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
    }
    $scope.GoToPurchase = function (purchaseid) {
      $state.go('app.purchase-summary', { 'purchaseId': purchaseid });
    }
  })
  .controller('PurchaseSummaryCtrl', function ($scope, $stateParams, Purchases, $ionicLoading) {
    Purchases.setPurchaseId($stateParams.purchaseId);
    $ionicLoading.show({
      template: 'Loading...'
    });
    Purchases.getPurchasebyId().then(function (data) {
      $scope.purchase = data;
      $ionicLoading.hide();
    });
  });
