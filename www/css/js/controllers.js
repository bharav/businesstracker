angular.module('businesstracker.controllers', [])

  .controller('NewOrderCtrl', function ($scope, $state,$stateParams, Orders) {
    if(typeof $stateParams.orderId != 'undefined')
    {
      Orders.setOrderId($stateParams.orderId);
      Orders.getOrderbyId().then(function (data) {
        $scope.neworder = data;
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
    $scope.productedit= function(product,index){
      $scope.product.productname = product.productname;
      $scope.product.productunit = product.productunit;
      $scope.product.productunitprice=product.productunitprice;
      $scope.totalamount -=(product.productunit*product.productunitprice);
      $scope.productListConsolidate.splice(index,1);
    }
    $scope.productdelete= function(product,index){
      $scope.totalamount -=(product.productunit*product.productunitprice);
      $scope.productListConsolidate.splice(index,1);
    }

    $scope.GoToPayment = function () {
      $scope.neworder.product = $scope.productListConsolidate;
      $scope.neworder.totalamount = $scope.product.totalamount;
      Orders.setOrderlocal($scope.neworder);
      $state.go("app.new-order-payment");
    }
    $scope.SubmitOrder = function(){
     Orders.setOrderlocal($scope.neworder);
     Orders.setOrders($scope.neworder).then(function (data) {
       $scope.neworder=null;
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
