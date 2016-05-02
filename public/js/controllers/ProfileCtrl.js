'use strict';
// public/js/controllers/ProfileCtrl.js

angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, $location,$cookies,$window, currentParseUser, ExtendedUser, UserService) {
    /*declare scope variables*/
    var extendedUser = {};
    var parseUser = {};
     
    var currentExtUser = {};// this is to check current users permissions
    $scope.roles      = ExtendedUser.CORPORATE_ROLES;
    UserService.getCurrentExtUser().then(function(queriedUser){
        console.log("Success");
        currentExtUser = queriedUser;
        if(queriedUser.hasOwnProperty(ExtendedUser.CORPORATE_ROLE) && queriedUser.isAdmin()){
            $('#role').prop('disabled', false);
        }
    });

    if(UserService.isAddEdit()===UserService.IS_PROFILE){
        console.log("Is Profile");
        UserService.get(currentParseUser).then(function(queriedUser){
            extendedUser = queriedUser[0];
            $scope.$apply(function(){
                parseUser = currentParseUser;
                setParseScope(currentParseUser);
                setExtScope(extendedUser);
            });
            }, function(error){
                console.log(error);
        });
    }else if(UserService.isAddEdit()===UserService.IS_EDIT){
        console.log("Is Edit");
        UserService.get().then(function(queriedUser){
            extendedUser = queriedUser;
            if(extendedUser){
                var parseUserRef = extendedUser.get(ExtendedUser.PARSE_USER);
                parseUserRef.fetch({
                    success: function(queriedParseUser){
                        console.log(parseUser);
                        $scope.$apply(function(){
                            parseUser = queriedParseUser;
                            setParseScope(parseUser);
                            setExtScope(extendedUser);
                        });
                    }                            
                });
            }
        });
    }else if(UserService.isAddEdit()===UserService.IS_ADD){
        extendedUser = new ExtendedUser();
        $('#role').prop('disabled', false);
        $('#username').prop('disabled', false);
    }
    function setExtScope(extended_user){
        /*Extended user attributes*/
        if(extended_user.has(ExtendedUser.FIRST_NAME)){
            $scope.first_name = extended_user.get(ExtendedUser.FIRST_NAME);
            $('#first_name_lbl').addClass('active');
        }
        if(extended_user.has(ExtendedUser.LAST_NAME)){
            $scope.last_name  = extended_user.get(ExtendedUser.LAST_NAME);
            $('#last_name_lbl').addClass('active');
        }
        if(extended_user.has(ExtendedUser.CORPORATE_ROLE)){
            $scope.role       = extended_user.get(ExtendedUser.CORPORATE_ROLE);
        }
        /*add active class if there is a value for the input fields*/
        
    }
    function setParseScope(parse_user){
        $scope.username = parse_user.get(ExtendedUser.USERNAME);
        $scope.email    = parse_user.get(ExtendedUser.EMAIL);
        if($scope.username){
            $('#username_lbl').addClass('active');
        }
        if($scope.email){
            $('#email_lbl').addClass('active');
        }
    }
    
    

    /*Save profile*/
    $scope.saveUser = function(form) {
        console.log("STUFF");
        if(form.$valid){
            if(UserService.isAddEdit()===UserService.IS_ADD){
                var username = $scope.username;
                var password = $scope.password;
                Parse.User.signUp(username, password,
                   { //'fullName': 'Paul Hovley', //additional attributes go here
                   ACL: new Parse.ACL() }, 
                   {
                    success: function(user) {
                      //redirect to home page
                      extendedUser = setUserFromScope(extendedUser);
                      saveExtendedUser(extendedUser);
                    },
                    error: function(user, error) {
                      $(".error").html('Someone with that username already exists').show();
                      $("#overlay").removeClass("currently-loading");
                    }
                  });
            }else{
                $("#overlay").addClass("currently-loading");
                extendedUser = setUserFromScope(extendedUser);
                console.log(parseUser);
                if($scope.password){
                    parseUser.set(ExtendedUser.PASSWORD, $scope.password);
                }
                parseUser.set(ExtendedUser.EMAIL, $scope.email);
                parseUser.save(null, {
                    success: function(user){
                        console.log("saved password");
                    }
                });
                saveExtendedUser(extendedUser);
            }
        }

    }
    function saveExtendedUser(extendedUser){
        UserService.saveExtUser(extendedUser).then(function(user){
            $window.location.href= '/profile';
            $("#overlay").removeClass("currently-loading");
        }, function(error){
            $(".error").html("Couldn't update user...").show();
                $("#overlay").removeClass("currently-loading");
        });
    }

    function setUserFromScope(extendedUser){
        extendedUser.set(ExtendedUser.FIRST_NAME,    $scope.first_name);
        extendedUser.set(ExtendedUser.LAST_NAME,    $scope.last_name);
        extendedUser.set(ExtendedUser.CORPORATE_ROLE, $scope.role);
        return extendedUser;
    }


    
    
});