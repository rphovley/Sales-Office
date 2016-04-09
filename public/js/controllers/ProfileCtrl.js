'use strict';
// public/js/controllers/ProfileCtrl.js

angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, $location) {
    Parse.initialize("test_id");
    Parse.serverURL = 'http://nextbigparseserver.azurewebsites.net/parse';
    var currentUser = Parse.User.current();
    
    //display current band name or placeholder
    if(currentUser.get("band_name")){
        $scope.band_name = currentUser.get("band_name");
    }
    else {$scope.band_name = "No band name listed yet!"}
    
    //display current home city or placeholder
    if(currentUser.get("home_city")){
        $scope.home_city = currentUser.get("home_city");
    }
    else {$scope.home_city = "No home city listed yet!"}
    
    //display current record label or placeholder
    if(currentUser.get("record_label")){
        $scope.record_label = currentUser.get("record_label");
    }
    else {$scope.record_label = "No record label listed yet!"}
    
    //display current influences or placeholder
    if(currentUser.get("influences")){
        $scope.influences = currentUser.get("influences");
    }
    else {$scope.influences = "No influences listed yet!"}
    
    //display current band info or placeholder
    if(currentUser.get("band_info")){
        $scope.band_info = currentUser.get("band_info");
    }
    else {$scope.band_info = "No band info listed yet!"}
    
    //when Edit Profile button is clicked, redirect user to the editProfile.html page
    $scope.editProfileRedirect = function() {
        $location.url('/editProfile');
    }
});