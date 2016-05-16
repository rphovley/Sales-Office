'use strict';
// public/js/controllers/UserCtrl.js

angular.module('UserCtrl', []).controller('UserController', function($scope, $location, UserService, OfficeService) {

    $scope.searchValue = "";
    /*$scope.search = function() {

        //var keyValue = String.fromCharCode(event.keyCode);
        console.log($scope.searchValue);
        var searchValue = $scope.searchValue;
        $.grep($scope.users, function(e){ return e.id == searchValue; });
        for (var i = 0; i < $scope.users.length; i++){
            var extUser = $scope.users[i].extUser;
            var parseUser = $scope.users[i].parseUser;

        }
        //console.log($.grep($scope.users, function(e){ return e.id === searchValue; }))  ;
    }*/
    var ExtendedUser = UserService.ExtendedUser
    var Office = OfficeService.Office;
    //dynamic list
    var userList = [];
    $scope.users = [];
    $scope.roles = ExtendedUser.CORPORATE_ROLES;
    $scope.model = {
        first_name : "",
        last_name  : "",
        username   : "",
        email      : "",
        corporate_role: "",
        office     : ""
    };  
    /*
        {
            extUser: 
            parseUser: 
        }
    */
    $scope.User = ExtendedUser;
    var queryObject = new Parse.Query(ExtendedUser.CLASS_NAME);
    $("#overlay").addClass("currently-loading");
    //get all extended users and their corresponding parseUser
    queryObject.find({
        success: function (extUserResults) {
            console.log(extUserResults.length);
            for (var i = 0; i < extUserResults.length; i++) {
                // Iteratoration for class object.
                var extUserObj = extUserResults[i];
                var office = extUserObj.get(ExtendedUser.OFFICE);
                
                (function(extUserObj){
                    var parseUser = extUserObj.get(ExtendedUser.PARSE_USER);
                    parseUser.fetch({
                        success: function(queriedParseUser){   
                            $("#overlay").removeClass("currently-loading");
                            $scope.$apply(function(){
                                var user = {
                                    extUser   : extUserObj,
                                    parseUser : queriedParseUser
                                }
                                userList.push(user);
                            });                   
                        },
                        error: function(error){
                            console.log(error);
                        }
                    });

                })(extUserObj);

                
                userList.length;
                
            }
            $scope.users = userList;
            
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
            $("#overlay").addClass("currently-loading");
        }
    }); 

    OfficeService.getAll().then(function(offices){
        $scope.offices = offices;
        console.log("offices received");
    });


    /*Save profile*/
    $scope.saveUser = function(form) {
        console.log(form);
        if(form.$valid){
            displaySpinner(true);
            var username = $scope.model.username;
            var password = $scope.model.password;
            var newACL = new Parse.ACL();
            newACL.setPublicReadAccess(true);
            Parse.User.signUp(username, password,
               { 'email' : $scope.model.email, //additional attributes go here
                   newACL }, 
                   {
                success: function(user) {
                  //redirect to home page
                  var extendedUser = new ExtendedUser();
                  extendedUser.set(ExtendedUser.PARSE_USER, user);
                  extendedUser = setUserFromScope(extendedUser);
                  saveExtendedUser(extendedUser, user);
                },
                error: function(user, error) {
                  $(".error").html('Someone with that username already exists').show();
                  displaySpinner(false);
                }
            });
            
        }
    }
    $scope.deleteUser = function(user){
            console.log("Running");

            Parse.Cloud.run('hello',{}, {
                success: function(status){
                    console.log("test:"+status);
                }
            });

            Parse.Cloud.run('deleteUser', { id: 'user.id' }, {
              success: function(status) {
                // the user was updated successfully
                    console.log("status:" + status);
              },
              error: function(error) {
                console.log(error);
                // error
              }
            });
                /*user.extUser.destroy({
                    success: function(managedOffice){
                        //notification('Office deleted', 'text-danger');
                        $window.location.reload();
                    },
                    error : function(managedOffice, error){
                        //notification('Error deleting office', 'text-danger');
                    }
                });
                user.parseUser.destroy();*/
            }
    var saveExtendedUser = function(extendedUser, parseUser){
        UserService.saveExtUser(extendedUser).then(function(savedExtUser){
            //$window.location.href= '/profile';
            displaySpinner(false);
            var userList = $scope.users;
            var user = {
                extUser   : savedExtUser,
                parseUser : parseUser
            }
            userList.push(user);
            $scope.users = userList;
            $scope.model = {
                first_name : "",
                last_name  : "",
                username   : "",
                email      : "",
                corporate_role: "",
                office     : "",
                confirmPassword: ""
            };  
            $scope.$apply();
        }, function(error){
            $(".error").html("Couldn't update user...").show();
            displaySpinner(false);
        });
    }

    var setUserFromScope = function(extendedUser){
        extendedUser.set(ExtendedUser.FIRST_NAME,    $scope.model.first_name);
        extendedUser.set(ExtendedUser.LAST_NAME,    $scope.model.last_name);
        extendedUser.set(ExtendedUser.CORPORATE_ROLE, $scope.model.corporate_role);
        extendedUser.set(ExtendedUser.OFFICE, $scope.model.office);
        return extendedUser;
    }

    $scope.addUser = function(){
        $scope.isAdd = true;
    } 

    var displaySpinner = function(isLoading){
        if(isLoading){
            $("#overlay").addClass("currently-loading");
        }else{
            $("#overlay").removeClass("currently-loading");
        }
    }
});