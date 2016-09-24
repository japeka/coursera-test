(function() {
'use strict';

var app = angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyShoppingController.$inject=['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuyList = this;
  toBuyList.items = ShoppingListCheckOffService.getInitialToBuyItems();
  toBuyList.moveItem = function(index) {
    if(ShoppingListCheckOffService.moveItem(index)) {
    }
  };
  toBuyList.isEmpty = function() {
    var items = ShoppingListCheckOffService.getToBuyItems();
    return items.length===0 ? true: false;
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;
  alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  alreadyBoughtList.isEmpty = function() {
    var items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    return items.length===0  ? true : false;
  }
}

function ShoppingListCheckOffService() {
  var service = this;
  var toBuyItems = [
      { id:0, name: "cookies", quantity: 10 },
      { id:1,name: "rookies", quantity: 4},
      { id:2,name: "zookies", quantity: 5 },
      { id:3,name: "mookies", quantity: 21 },
      { id:4,name: "wookies", quantity: 12 }];

   var initialToBuyItems = [
       { id:0,name: "cookies", quantity: 10 },
       { id:1,name: "rookies", quantity: 4},
       { id:2,name: "zookies", quantity: 5 },
       { id:3,name: "mookies", quantity: 21 },
       { id:4,name: "wookies", quantity: 12 }];

   service.getInitialToBuyItems =  function() {
     return initialToBuyItems;
   }

   service.getToBuyItems = function() {
      return toBuyItems;
   }

   var alreadyBoughtItems = [];
   service.getAlreadyBoughtItems =  function() {
     return alreadyBoughtItems;
   }

   service.moveItem = function(index) {
       if(toBuyItems.length > 0) {
        var t_ = [];
        for(var i=0;i<toBuyItems.length;i++) {
          if(toBuyItems[i].id!==index){
            t_.push(toBuyItems[i]);
          }
        }
        toBuyItems = angular.copy(t_);
        if(alreadyBoughtItems.length > 0) {
          var bFound = false;
          for(var j=0;j<alreadyBoughtItems.length;j++) {
            if(alreadyBoughtItems[j].id === index) {
              bFound = true;
              break;
            }
          }
          if(bFound===false) {
            alreadyBoughtItems.push(initialToBuyItems[index]);
          }
        } else {
          alreadyBoughtItems.push(initialToBuyItems[index]);
        }
        return true;
       }
       return false;
   }
}
})();
