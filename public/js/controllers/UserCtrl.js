'use strict';
// public/js/controllers/UserCtrl.js

angular.module('UserCtrl', []).controller('UserController', function($scope, $location, UserService, OfficeService) {


    /*$scope.search = function(event) {
        var keyValue = String.fromCharCode(event.keyCode);
        console.log(keyValue);
    }
    var ExtendedUser = UserService.ExtendedUser
    var Office = OfficeService.Office;
    //dynamic list
    var userList = [];
    $scope.users = [];
    $scope.User = ExtendedUser;
    var queryObject = new Parse.Query(ExtendedUser.CLASS_NAME);
    $("#overlay").addClass("currently-loading");
    queryObject.find({
        success: function (userResults) {
            console.log(userResults.length);
            for (var i = 0; i < userResults.length; i++) {
                // Iteratoration for class object.
                var userObj = userResults[i];
                var office = userObj.get(ExtendedUser.OFFICE);
                userList.push(userObj);
                office.fetch({ //make sure we have the office object since parse just has a pointer
                    success: function(queriedOffice){
                        $scope.$apply(function () {
                            $scope.users = userList;
                            $("#overlay").removeClass("currently-loading");
                        });
                    }                            
                });
                
            }
            
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
            $("#overlay").addClass("currently-loading");
        }
    });   

    $scope.editUser = function(user){
        UserService.set(user);
        UserService.setAddEdit(UserService.IS_EDIT);
    }
    $scope.addUser = function(){
        UserService.setAddEdit(UserService.IS_ADD);
    }*/
    
});