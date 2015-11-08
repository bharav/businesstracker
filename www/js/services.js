angular.module('businesstracker.services', [])
  .factory('Orders', function ($http, $q) {
    // Might use a resource here that returns a JSON array
    // Some fake testing data
    var currentorderId;
    var orderlocal = {};
    var searchorderdate;
    function setOrderlocal(data) {
      orderlocal = data;
    }
    function getOrderlocal() {
      return orderlocal;
    }

    function getOrders() {
      var deferred = $q.defer();
      $http.get("http://businesstrackerapi.azurewebsites.net/api/orders")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function setOrders(order) {
      var deferred = $q.defer();
      var req = {
        method: 'POST',
        url: 'http://businesstrackerapi.azurewebsites.net/api/orders',
        headers: {
          'Content-Type': "application/json"
        },
        data: order
      }
      $http(req).success(function (data, status) {
        console.log("Posted order from HTTP", data, status);
        deferred.resolve(data);
      })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function updateOrder(order) {
      var deferred = $q.defer();
      var req = {
        method: 'PUT',
        url: 'http://businesstrackerapi.azurewebsites.net/api/orders/' + currentorderId,
        headers: {
          'Content-Type': "application/json"
        },
        data: order
      }
      $http(req).success(function (data, status) {
        console.log("Updated order from HTTP", data, status);
        deferred.resolve(data);
      })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function getOrderbyId() {
      var deferred = $q.defer();
      $http.get("http://businesstrackerapi.azurewebsites.net/api/orders/" + currentorderId)
        .success(function (data, status) {
          console.log("Received order from HTTP", data, status);
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function getOrdersbyDate() {
      var deferred = $q.defer();
      $http.get("http://businesstrackerapi.azurewebsites.net/api/orders?orderdate=" + searchorderdate)
        .success(function (data, status) {
          console.log("Received order from HTTP", data, status);
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function setOrderId(orderId) {
      currentorderId = orderId;
    }
    function setOrderDate(orderdate) {
      searchorderdate = orderdate;
    }
    return {
      setOrderId: setOrderId,
      setOrderlocal: setOrderlocal,
      getOrderlocal: getOrderlocal,
      getOrders: getOrders,
      setOrders: setOrders,
      updateOrder: updateOrder,
      getOrderbyId: getOrderbyId,
      setOrderDate: setOrderDate,
      getOrdersbyDate: getOrdersbyDate
    }

  })
  .factory('Purchases', function ($http, $q) {
    // Might use a resource here that returns a JSON array
    // Some fake testing data
    var currentpurchaseId;
    var purchaselocal = {};
    var searchpurchasedate;
    function setPurchaselocal(data) {
      purchaselocal = data;
    }
    function getPurchaselocal() {
      return purchaselocal;
    }

    function getPurchases() {
      var deferred = $q.defer();
      $http.get("http://businesstrackerapi.azurewebsites.net/api/purchases")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function setPurchases(purchase) {
      var deferred = $q.defer();
      var req = {
        method: 'POST',
        url: 'http://businesstrackerapi.azurewebsites.net/api/purchases',
        headers: {
          'Content-Type': "application/json"
        },
        data: purchase
      }
      $http(req).success(function (data, status) {
        console.log("Posted Purchase from HTTP", data, status);
        deferred.resolve(data);
      })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function updatePurchase(purchase) {
      var deferred = $q.defer();
      var req = {
        method: 'PUT',
        url: 'http://businesstrackerapi.azurewebsites.net/api/purchases/' + currentpurchaseId,
        headers: {
          'Content-Type': "application/json"
        },
        data: purchase
      }
      $http(req).success(function (data, status) {
        console.log("Updated purchase from HTTP", data, status);
        deferred.resolve(data);
      })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function getPurchasebyId() {
      var deferred = $q.defer();
      $http.get("http://businesstrackerapi.azurewebsites.net/api/purchases/" + currentpurchaseId)
        .success(function (data, status) {
          console.log("Received purchase from HTTP", data, status);
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function getPurchasesbyDate() {
      var deferred = $q.defer();
      $http.get("http://businesstrackerapi.azurewebsites.net/api/purchases?purchasedate=" + searchpurchasedate)
        .success(function (data, status) {
          console.log("Received purchase from HTTP", data, status);
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function setPurchaseId(purchaseId) {
      currentpurchaseId = purchaseId;
    }
    function setPurchaseDate(purchasedate) {
      searchpurchasedate = purchasedate;
    }
    return {
      setPurchaseId: setPurchaseId,
      setPurchaselocal: setPurchaselocal,
      getPurchaselocal: getPurchaselocal,
      getPurchases: getPurchases,
      setPurchases: setPurchases,
      updatePurchase: updatePurchase,
      getPurchasebyId: getPurchasebyId,
      setPurchaseDate: setPurchaseDate,
      getPurchasesbyDate: getPurchasesbyDate
    }

  });
