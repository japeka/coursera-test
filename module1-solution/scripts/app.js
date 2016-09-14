(function() {
'use strict';

var app = angular.module('LunchCheck', []);
app.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.output = "";
  $scope.color = "";

  $scope.checkIfTooMuch = function() {
    if(!$scope.lunchMenu) {
      $scope.output = "Please enter data first!";
      $scope.color = "colorRed";
    } else {
      $scope.color = "colorGreen";
      var lunches = $scope.lunchMenu.split(',');
      //remove all empty values
      var lunches_ = [];
      if(lunches) {
          for(var i=0;i<lunches.length;i++) {
            if(lunches[i].trim()) {
              lunches_.push(lunches[i].trim());
            }
          }
      }
      if(lunches_.length <=3) {
        $scope.output = "Enjoy!";
      } else {
        $scope.output = "Too much!";
      }
    }
  };
}


})();
