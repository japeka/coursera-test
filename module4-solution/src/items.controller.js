(function () {
'use strict';

angular.module('Data')
.controller('MenuItemsController', MenuItemsController);

MenuItemsController.$inject = ['items'];
function MenuItemsController(items) {
  var catDetails = this;
  catDetails.menuItems = items.data.menu_items;
};

})();
