angular.module('businesstracker.masterservice', [])
/*.factory('Products', function ($window, $http) {
     function getProducts() {
    if ($window.localStorage['products'] != null) {
      //return data from local storage which will be used frequently
      resetProductsLocal()
      return JSON.parse($window.localStorage['products'] || '{}');
    }
    else {
      //get values from http api and save the value in local storage
      return JSON.parse($window.localStorage['products'] || '{}');
    }
  }
  //function to get value from http service and store json value in local storage 
  function setProductsLocal() {
    $http.get("http://localhost:8000/api/products")
      .then(function(data) {
        $window.localStorage['products'] = JSON.stringify(data);
        console.log(data);
      });
  }
  //function to reset local storage value will new values from http services
  function resetProductsLocal()
  {
    $window.localStorage['products']=null;
    setProductsLocal();
  }
  return {
    getProducts: getProducts
  }
});*/
    .factory('Products', function ($http, $q) {
        var purchaselocal = {};
        function getProducts() {
            var deferred = $q.defer();
            $http.get("http://localhost:8000/api/products")
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    console.log("Error in http call.");
                    deferred.reject();
                });
            return deferred.promise;
        }
        function getPurchaseProductLocal() {
            return purchaselocal;
        }
        function setPurchaseProductLocal(purchase) {
            purchaselocal = purchase;
        }
        function UpdatePurchaseProduct(purchaseProductId) {
            if (purchaselocal != null) {
                purchaselocal.product.forEach(function (element) {
                    if (element._id == purchaseProductId) {
                        element.stockupdated = true;
                    }
                }, this);
            }
        }
        function ClearPurchaseProduct()
        {
            purchaselocal=null;
        }
        return {
            getProducts: getProducts,
            getPurchaseProductLocal:getPurchaseProductLocal,
            setPurchaseProductLocal:setPurchaseProductLocal,
            UpdatePurchaseProduct:UpdatePurchaseProduct,
            ClearPurchaseProduct:ClearPurchaseProduct
        }
    });
