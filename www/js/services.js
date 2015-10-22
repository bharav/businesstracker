angular.module('businesstracker.services', [])

  .factory('Orders', function ($http,$q) {
    // Might use a resource here that returns a JSON array
    // Some fake testing data
    var currentorderId;
    var orderlocal = {};
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
    function setOrderId(orderId) {
      currentorderId = orderId;
    }
    return {
      setOrderId: setOrderId,
      setOrderlocal: setOrderlocal,
      getOrderlocal: getOrderlocal,
      getOrders:getOrders,
      getOrderbyId:getOrderbyId
    }

  });
