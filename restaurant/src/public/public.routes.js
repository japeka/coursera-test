(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true, //  parent state, you cannot go directly to abstract state
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', { //child template for public abstract state
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', { // in html used like this:    ui-sref="public.menu"
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function(MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      templateUrl: 'src/public/menu-items/menu-items.html',
      url:'/menu/{category}',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function($stateParams,MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.signup', {
      templateUrl: 'src/public/sign-up/sign-up.html',
      url:'/signup'
    });
}
})();
