(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // See list of categories categoryList
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categorylist.template.html',
     controller: 'CategoryListController as list',
     resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('categories.menuItems', {
    url: '/items/{catId}',
    templateUrl: 'src/templates/items.template.html',
    controller: 'MenuItemsController as catDetails',
    resolve: {
      items: ['$stateParams', 'MenuDataService',function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.catId);
        }]
    }
  });
}
})();
