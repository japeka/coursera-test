(function () {
'use strict';

angular.module('Data')
.controller('CategoryListController', CategoryListController);

CategoryListController.$inject = ['items'];
function CategoryListController(items) {
  var list = this;
  list.items = items.data;
};

})();
