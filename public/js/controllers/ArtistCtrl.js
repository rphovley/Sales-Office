'use strict';
// public/js/controllers/ArtistCtrl.js

angular.module('ArtistCtrl', []).controller('ArtistController', function($scope, $location, $window) {
    Parse.initialize("test_id");
    Parse.serverURL = 'http://nextbigparseserver.azurewebsites.net/parse';
    var currentUser = Parse.User.current();
    
    //var Artist = Parse.Object.extend("Artist");
    //var artist = new Artist();
    
    var delay = function(millis) {
        var promise = new Parse.Promise();
        setTimeout(function() {
            promise.resolve();
        }, millis);
        return promise;
    };
    
    var refreshID = function(){
       var container = document.getElementById("inside");
       var content = container.innerHTML;
       container.innerHTML = content;
    }
    
    var aList = [{name: "Lionite", imgURL: "../img/Lionite.png", info: "This is a sweet band called Lionite!! You should listen to them a ton"}, {name: "Jon Bellion", imgURL: "JonBellion.jpg", info: "Jon Bellion is an amazing artist who has written songs for Jason Derulo, Ceelo Green, and Eminem! Listen Now!!"}, {name: "Pearl Jam", imgURL: "../img/PearlJam.png", info: "Pearl Jam is one of the 4 bands to start the grunge movement in Seattle in the early nineties. And they still got it!"}];
    
    $scope.aList = aList;
    
    var artistList = [];
    
    $scope.artists = artistList;
    
    //var isDone = false;
    
    var Artist = Parse.Object.extend("Artist");
    var queryObject = new Parse.Query(Artist);

    queryObject.find({
        success: function (artistResults) {
            for (var i = 0; i < artistResults.length; i++) {
                // Iteration for class object.
                
                var artistObj = {name: artistResults[i].get("name"), imgURL: artistResults[i].get("imgURL"), 
                                 info: artistResults[i].get("info")};
                
                artistList.push(artistObj);
                
                //console.log(artistList[i]);
                
                $scope.artists = artistList;
                console.log($scope.artists[i].name);
            }
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });   
    
    delay(1000).then(function() {
        console.log($scope.artists[1].name);
        refreshID();
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
//        artist.set("info", "Pearl Jam was one of the big four of the Seattle grunce music scene. Check out their rock!!!!");
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