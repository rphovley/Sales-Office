'use strict';
// public/js/controllers/HomeCtrl.js
angular.module('HomeCtrl', []).controller('HomeController', function($scope, currentUser) {

    $scope.tagline = 'To the moon and back!';   
    $scope.parent = 'home stuff';
    console.log(currentUser);
});