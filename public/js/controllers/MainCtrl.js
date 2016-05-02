'use strict';
// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $window, UserService, currentParseUser) {

    $scope.tagline = 'To the moon and back!';   
    $scope.parent = 'parent stuff';
    $scope.authorized = true
    console.log("Authorized:" + $scope.authorized);

    /*if(!currentParseUser.id){
        UserService.setCurrentExtUser(currentParseUser);
    }*/
    if(!Parse.User.current()){
    	$scope.authorized = false;
    }
    console.log($scope.authorized);

    $scope.logout = function(){
        console.log("Logout");
    	Parse.User.logOut();  
    	$window.location.reload();
    }

    $scope.editProfile = function(){
        UserService.setAddEdit(UserService.IS_PROFILE);
        $window.location.href= '/profile';
    }
    
});