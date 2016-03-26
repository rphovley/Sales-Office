'use strict';
// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope) {

    $scope.tagline = 'To the moon and back!';   
    $scope.parent = 'parent stuff';
    Parse.initialize("test_id");
    Parse.serverURL = 'http://nextbigparseserver.azurewebsites.net:1337/parse';
    $scope.authorized = true
    if(!Parse.User.current()){
    	$scope.authorized = false;
    }
    console.log($scope.authorized);
});