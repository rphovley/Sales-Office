'use strict';
// public/js/controllers/ArtistCtrl.js

angular.module('ArtistCtrl', []).controller('ArtistController', function($scope, $location) {
    Parse.initialize("test_id");
    Parse.serverURL = 'http://nextbigparseserver.azurewebsites.net/parse';
    
    
    $scope.search = function(event) {
        var keyValue = String.fromCharCode(event.keyCode);
        console.log(keyValue);
    }
    
    
    //dynamic list
    var artistList = [];
    $scope.artists = [];
    
    var Artist = Parse.Object.extend("Artist");
    //console.log(Artist);
    var queryObject = new Parse.Query(Artist);

    queryObject.find({
        success: function (artistResults) {
            for (var i = 0; i < artistResults.length; i++) {
                // Iteratoration for class object.
                
                var artistObj = {name: artistResults[i].get("name"), imgURL: artistResults[i].get("imgURL"), 
                                 info: artistResults[i].get("info")};
                
                artistList.push(artistObj);
                
                $scope.$apply(function () {
                    $scope.artists = artistList;
                });
                
                //console.log(artistList);
                console.log($scope.artists[i].name);
            }
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });   

//    $scope.UpdateArtist = function() {
//        var Artist = Parse.Object.extend("Artist");
//        var query = new Parse.Query(Artist);
//            
//        query.get("nO74CU11KY", {
//          success: function(artist) {
//            // The object was retrieved successfully.
//              console.log(artist.get("name"));
//              artist.set("imgURL", "../img/Lionite.png");
//              artist.save();
//              console.log(artist.get("imgURL"));
//          },
//          error: function(object, error) {
//            // The object was not retrieved successfully.
//            // error is a Parse.Error with an error code and message.
//              console.log("SUCK");
//          }
//        });
//    }
    
//    $scope.createArtist = function() {
//        
//        var Artist = Parse.Object.extend("Artist");
//        var artist = new Artist();
//
//        artist.set("name", "Pearl Jam");
//        artist.set("imgURL", "../img/PearlJam.png")
//        artist.set("info", "Pearl Jam was one of the big four of the Seattle grunce music scene.");
//
//        artist.save(null, {
//          success: function(artist) {
//                // Execute any logic that should take place after the object is saved.
//                console.log("Created new object!!! It's ID is " + artist.id);
//          },
//          error: function(artist, error) {
//            // Execute any logic that should take place if the save fails.
//            // error is a Parse.Error with an error code and message.
//            console.log('Failed to create new object');
//          }
//        });
//    }
    
});