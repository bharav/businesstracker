(function () {
  'use strict';
  angular.module('businesstracker').controller('CustomerCtrl', ['$scope', '$state', 'Customers', CustomerCtrl]);
  function CustomerCtrl($scope, $state, Customers) {
    $scope.SaveCustomerDetail = function () {
      Customers.setCustomer($scope.customer).then(function (data) {
        console.log(data);
        $state.go('dash.order');
      });
    }
  }
}
  )();