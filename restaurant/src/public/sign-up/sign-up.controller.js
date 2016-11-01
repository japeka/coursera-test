(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService','BaseURL','$timeout'];
function SignUpController(MenuService,BaseURL,$timeout) {
    var $ctrl = this;
    $ctrl.userIsRegistered = MenuService.isRegistered();
    if($ctrl.userIsRegistered==true) {
      $ctrl.userPreference = MenuService.getUserPrefences();
    }
    $ctrl.BaseURL = BaseURL;
    $ctrl.submit = function () {
        if($ctrl.user.favoriteDish) {
          MenuService.getDish($ctrl.user.favoriteDish).then(
            function(response) {
              $ctrl.completed = true;
              if(response.status==500) {
                $ctrl.completedMessage ="No such menu number exists!";
              } else {
               var success = MenuService.saveDish($ctrl.user,response);
               if(success) {
                 $ctrl.completedMessage = "Your information has been saved! Forwarding to user preferences...";
                 $timeout(function () {
                   $ctrl.userIsRegistered = true;
                   $ctrl.userPreference = MenuService.getUserPrefences();
                 }, 5000);
               } else {
                 $ctrl.completedMessage = "Your information received, but not saved correctly!";
               }
              }
            });
        }
    }
}
})();
