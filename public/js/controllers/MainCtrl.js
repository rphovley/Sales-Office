'use strict';
// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $window, currentUser) {

    $scope.tagline = 'To the moon and back!';   
    $scope.parent = 'parent stuff';
    $scope.authorized = true
    console.log("Authorized:" + $scope.authorized);
    console.log(currentUser);

    if(!Parse.User.current()){
    	$scope.authorized = false;
    }
    console.log($scope.authorized);

    $scope.logout = function(){
        console.log("Logout");
    	Parse.User.logOut();  
    	$window.location.reload();
    }

    
    
});