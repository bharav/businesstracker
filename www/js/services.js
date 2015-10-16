angular.module('businesstracker.services', [])

  .factory('Orders', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var customer = {};
    function setCustomer(data) {
      customer = data;
    }
    function getCustomer() {
      return customer;
    }

    return {
      setCustomer: setCustomer,
      getCustomer: getCustomer
    }

  });
