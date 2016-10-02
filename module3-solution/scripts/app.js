(function() {
'use strict';

var app = angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',foundItems);

function foundItems() {
  var ddo = {
    templateUrl: 'templates/foundItems.html',
    scope: {
      items: '<',
	  onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'narrow',
    bindToController: true 
  };
  
  return ddo;
}

function FoundItemsDirectiveController() {
  var narrow = this;
  narrow.errorMessage = "";
  narrow.isEmpty = function() {
    if(narrow.items) {
	  if(narrow.items.length === 0) {
		narrow.errorMessage = "NOTHING FOUND!";
		return true;
	  } else {
		narrow.errorMessage = "";
		return false;
	  }
    } else {
	  narrow.errorMessage = "";
      return true;
    }
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  service.getMatchedMenuItems = function(searchTerm) {
    var foundItems = [];
    if(searchTerm) {
      return $http({
       method: "GET",
       url: "https://davids-restaurant.herokuapp.com/menu_items.json"
     }).then(function(result) {
      var items = result.data.menu_items;
      if(items.length>0) {
        for(var i=0;i<items.length;i++) {
          if(items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1) {
              var menuItem = {
                name: items[i].name,
                short_name: items[i].short_name,
                description: items[i].description
              };
              foundItems.push(menuItem);
          }
        }
      }
      return foundItems;
     });

    } else {
      return foundItems;
    }
  }
}

NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  narrow.searchTerm = "";
  narrow.search = function() {
    var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
    if(angular.isArray(promise)) {
      narrow.items = [];
    } else {
      promise.then(function(payload) {
        narrow.items = payload;
      });
    }
  };
  narrow.removeItem = function(index) {
    if(narrow.items.length>0) {
      narrow.items.splice(index,1);
    }
  };
}
})();
