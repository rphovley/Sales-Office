'use strict';
// public/js/controllers/HomeCtrl.js
angular.module('HomeCtrl', []).controller('HomeController', function($scope, currentParseUser) {

    $scope.tagline = 'To the moon and back!';   
    $scope.parent = 'home stuff';
    console.log(currentParseUser);
});