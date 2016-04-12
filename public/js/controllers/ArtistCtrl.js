'use strict';
// public/js/controllers/EditProfileCtrl.js

angular.module('ArtistCtrl', []).controller('ArtistController', function($scope, $location) {
    Parse.initialize("test_id");
    Parse.serverURL = 'http://nextbigparseserver.azurewebsites.net/parse';
    var currentUser = Parse.User.current();
    console.log(currentUser.get("band_name"));
    
    //display current band name or placeholder
    if(currentUser.get("band_name")){
        $scope.band_name = currentUser.get("band_name");
    }
    else {$scope.band_name = "No band name listed yet!"}
    
    //display current band info or placeholder
    if(currentUser.get("band_info")){
        $scope.band_info = currentUser.get("band_info");
    }
    else {$scope.band_info = "No band info listed yet!"}
    
});