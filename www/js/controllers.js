angular.module('businesstracker.controllers', [])

  .controller('NewOrderCtrl', function ($scope) {
    
    var data;
    $scope.productListConsolidate = [];
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
