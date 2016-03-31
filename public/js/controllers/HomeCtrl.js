'use strict';
// public/js/controllers/HomeCtrl.js
angular.module('HomeCtrl', []).controller('HomeController', function($scope) {

    $scope.tagline = 'To the moon and back!';   
    $scope.parent = 'home stuff';
    Parse.initialize("test_id");
    Parse.serverURL = 'http://nextbigparseserver.azurewebsites.net/parse';
    var currentUser = Parse.User.current();
    console.log(currentUser.get("fullName"));
});