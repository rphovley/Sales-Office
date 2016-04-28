'use strict';
// public/js/controllers/UserCtrl.js

angular.module('UserCtrl', []).controller('UserController', function($scope, $location, User, UserService) {

    $scope.search = function(event) {
        var keyValue = String.fromCharCode(event.keyCode);
        console.log(keyValue);
    }
      
    //dynamic list
    var userList = [];
    $scope.users = [];
    
    var Users = Parse.User.extend();
    $scope.Users = Users;
    var queryObject = new Parse.Query(Users);

    queryObject.find({
        success: function (userResults) {
            console.log(userResults.length);
            for (var i = 0; i < userResults.length; i++) {
                // Iteratoration for class object.
                var userObj = userResults[i];
                console.log(userObj.get(Users.FIRST_NAME));
                userList.push(userObj);
                console.log(userList);
                console.log($scope.users);
            }
            $scope.$apply(function () {
                console.log("APPLY");
                $scope.users = userList;
            });
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });   

    $scope.editUser = function(user){
        UserService.set(user);
    }
    
});