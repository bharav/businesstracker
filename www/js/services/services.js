angular.module('businesstracker.services', [])
  .factory('Orders', function ($http, $q) {
    // Might use a resource here that returns a JSON array
    // Some fake testing data
    var currentorderId;
    var orderlocal = {};
    var searchorderdate;
    
    // Set Order in local variable need to change to local storage
    function setOrderlocal(data) {
      orderlocal = data;
    }
    //Get Order from local variable need to change it from local variable
    function getOrderlocal() {
      return orderlocal;
    }
    //Get list of orders from server
    function getOrders() {
      var deferred = $q.defer();
      $http.get("http://localhost:8000/api/orders")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    //Set order details in server
    function setOrders(order) {
      var deferred = $q.defer();
      var req = {
        method: 'POST',
        url: 'http://localhost:8000/api/orders',
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
    //Update order details in server
    function updateOrder(order) {
      var deferred = $q.defer();
      var req = {
        method: 'PUT',
        url: 'http://localhost:8000/api/orders/' + currentorderId,
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
    //Get order details from server "Parameter" orderId
    function getOrderbyId() {
      var deferred = $q.defer();
      $http.get("http://localhost:8000/api/orders/" + currentorderId)
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
    //Get order list from server "Parameter" orderbydate
    function getOrdersbyDate() {
      var deferred = $q.defer();
      $http.get("http://localhost:8000/api/orders?orderdate=" + searchorderdate)
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
    // Set order id in local variable
    function setOrderId(orderId) {
      currentorderId = orderId;
    }
    //set order date in local variable
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
      $http.get("http://localhost:8000/api/purchases")
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
        url: 'http://localhost:8000/api/purchases',
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
        url: 'http://localhost:8000/api/purchases/' + currentpurchaseId,
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
      $http.get("http://localhost:8000/api/purchases/" + currentpurchaseId)
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
      $http.get("http://localhost:8000/api/purchases?purchasedate=" + searchpurchasedate)
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

  })
  .factory('Customers', function ($http, $q) {
    function getCustomers() {
      var deferred = $q.defer();
      $http.get("http://localhost:8000/api/customers")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function getCustomerbyId(custId) {
       var deferred = $q.defer();
      $http.get("http://localhost:8000/api/customers/"+ custId)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error in http call.");
          deferred.reject();
        });
      return deferred.promise;
    }
    function setCustomer(customer) {
      var deferred = $q.defer();
      var req = {
        method: 'POST',
        url: 'http://localhost:8000/api/customers',
        headers: {
          'Content-Type': "application/json"
        },
        data: customer
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
    return {
      getCustomers: getCustomers,
      setCustomer: setCustomer,
      getCustomerbyId:getCustomerbyId
    }
  });

