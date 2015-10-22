angular.module('businesstracker.controllers', [])

  .controller('NewOrderCtrl', function ($scope, $state, Orders) {

    $scope.productListConsolidate = [];
    $scope.totalamount = 0.00;
    $scope.order = Orders.getOrderlocal();
    $scope.GoToProduct = function () {
      Orders.setOrderlocal($scope.order);
      $state.go("app.no-productdeatil");
    }

    if ($scope.order.product != null || $scope.order.product != undefined) {
      $scope.productListConsolidate = $scope.order.product;
      $scope.totalamount = $scope.order.totalamount;
    }


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


    $scope.GoToPayment = function () {
      $scope.order.product = $scope.productListConsolidate;
      $scope.order.totalamount = $scope.product.totalamount;
      Orders.setOrderlocal($scope.order);
      $state.go("app.new-order-payment");
    }
    $scope.SubmitOrder = function(){
     Orders.setOrderlocal($scope.order);
     Orders.setOrders($scope.order).then(function (data) {
       $state.go('app.order-summary',{'orderId':data._id});
      console.log(data);
    });
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

  .controller('OrderDashCtrl', function ($scope, Orders) {
    Orders.getOrders().then(function (data) {
      console.log(data);
      $scope.orders = data;
    });
  })
  .controller('OrderSummaryCtrl', function ($scope, $stateParams, Orders) {
    Orders.setOrderId($stateParams.orderId);
    Orders.getOrderbyId().then(function (data) {
      $scope.order = data;
    });
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
