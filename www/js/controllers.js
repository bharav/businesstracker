angular.module('businesstracker.controllers', [])

  .controller('NewOrderCtrl', function ($scope, $state, Orders) {

    var data;
    $scope.productListConsolidate = [];
    $scope.GoToProduct = function () {
      var customer = {
        customername: $scope.customer.name,
        customeraddress: $scope.customer.address,
        customerphone: $scope.customer.phone,
        customeremail: $scope.customer.email
      }
      Orders.setCustomer(customer);
      $state.go("app.no-productdeatil");
    }
    $scope.AddProduct = function () {
      var productlist = {
        productname: $scope.product.name,
        productUnit: $scope.product.unit,
        productUnitCost: $scope.product.unitprice
      };
      $scope.productListConsolidate.push(productlist);
      $scope.product.name = '';
      $scope.product.unit = '';
      $scope.product.unitprice = '';

      $scope.getOrderTotalAmount = function () {
        var total = 0;
        for (var i = 0; i < $scope.productListConsolidate.length; i++) {
          var product = $scope.productListConsolidate[i];
          total += (product.productUnitCost * product.productUnit);
        }
        return total;
      }
      console.log(productlist);
      console.log($scope.productListConsolidate);
    }
    $scope.GoToPayment = function () {
      Orders.setOrderProduct($scope.productListConsolidate);
      $state.go("app.new-order-payment");
    }
    $scope.SubmitOrder = function () {
      var orderpayment = {};

      if (!$scope.payment.status || $scope.payment.status === 'undefined') {
        orderpayment.paymentstatus = false;
        orderpayment.nopaymentdesc = $scope.payment.nopaymentdesc;
      }
      else {
        orderpayment.paymentstatus = true;
        if ($scope.payment.type == 'Cash') {
          orderpayment.paymenttype = $scope.payment.type;
          orderpayment.cashpaymentdesc = $scope.payment.cashcomment;
        }
        else if ($scope.payment.type == "NetBanking") {
          orderpayment.paymenttype = $scope.payment.type;
          orderpayment.paymentbank = $scope.payment.bank;
          orderpayment.paymentnbcomment = $scope.payment.bankcomment;
        }
        else if ($scope.payment.type == "Wallet") {

          orderpayment.paymenttype = $scope.payment.type;
          orderpayment.paymentwallet = $scope.payment.wallet;
          orderpayment.paymentwcomment = $scope.payment.walletcomment;
        }
      }
      console.log(orderpayment);
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

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
