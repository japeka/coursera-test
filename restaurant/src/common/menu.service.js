(function () {
  "use strict";

  angular.module('common')
  .service('MenuService', MenuService);

  MenuService.$inject=['$http','BaseURL','$window'];
  function MenuService($http,BaseURL,$window) {
    var service = this;
    service.getCategories = function () {
      return $http.get(BaseURL + '/categories.json').then(function (response) {
        return response.data;
      });
    };

    service.getMenuItems = function(category) {
      var config = {};
      if(category) {
        config.params = {'category':category};
      }
      return $http.get(BaseURL + '/menu_items.json', config).then(function(response) {
        return response.data;
      });
    };

    service.getDish = function(shortName) {
      return $http.get(BaseURL + '/menu_items/' + shortName + '.json').then(
        function(response) {
          return response.data;
        },
        function(err) {
          return err;
        });
    };

    service.saveDish = function(user,dish) {
      if( user && dish) {
          var u = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            dish: {
              short_name: dish.short_name,
              name: dish.name,
              description: dish.description,
              image_present: dish.image_present
            }
          };
         $window.localStorage['user'] = JSON.stringify(u);
         return true;
      }
      return false;
    };

    service.isRegistered = function() {
      if($window.localStorage['user']!==undefined) {
        var parsedObj = JSON.parse($window.localStorage['user']);
        if(parsedObj.firstname && parsedObj.lastname && parsedObj.dish.name) {
          return true;
        }
      }
      return false;
    };

    service.getUserPrefences = function() {
      if($window.localStorage['user']!==undefined) {
        var parsedObj = JSON.parse($window.localStorage['user']);
        if(parsedObj.firstname && parsedObj.lastname && parsedObj.dish.name) {
          return parsedObj;
        }
      }
      return null;
    }
  }
})();
