(function () {
'use strict';

angular.module('Data')
.component('catList', {
  templateUrl: 'src/templates/categories.component.html',
  bindings: {
    items: '<'
  },
  controller: CategoriesComponentController
});

CategoriesComponentController.$inject = ['$rootScope'];
function CategoriesComponentController($rootScope) {
  var $ctrl = this;
  var cancellers = [];

  $ctrl.$onInit = function () {
    var cancel = $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options){
    });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
    });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error){
    });
    cancellers.push(cancel);
  };

  $ctrl.$onDestroy = function () {
    cancellers.forEach(function (item) {
      item();
    });
  };
};

})();
