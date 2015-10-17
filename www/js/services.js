angular.module('businesstracker.services', [])

  .factory('Orders', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var customer = {};
    var orderproduct={};
    function setCustomer(data) {
      customer = data;
    }
    function getCustomer() {
      return customer;
    }
    function setOrderProduct(data){
      orderproduct=data;
    }
    function getOrderProduct(){
      return orderproduct;
    }

    return {
      setCustomer: setCustomer,
      getCustomer: getCustomer,
      setOrderProduct:setOrderProduct,
      getOrderProduct:getOrderProduct
    }

  });
