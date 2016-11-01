(function(){
"use strict";

angular.module('common',[])
.constant('BaseURL','https://japeka-course5.herokuapp.com')
.config(config);
config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
