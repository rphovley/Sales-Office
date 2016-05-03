'use strict';
// public/js/controllers/ProfileCtrl.js

angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, $location,$cookies,$window, currentParseUser, ExtendedUser, UserService, OfficeService) {
    /*declare scope variables*/
    var extendedUser = {};
    var parseUser = {};
    var OfficeUser = OfficeService.OfficeUser;
    var currentExtUser = {};// this is to check current users permissions
    $scope.roles      = ExtendedUser.CORPORATE_ROLES;
    
    $scope.offices = []; 
    $scope.managed_offices = [];

    UserService.getCurrentExtUser().then(function(queriedUser){
        currentExtUser = queriedUser;
        if(queriedUser.has(ExtendedUser.CORPORATE_ROLE) && queriedUser.isAdmin()){
            $('#role').prop('disabled', false);
            $('#office').prop('disabled', false);
        }
    });

    OfficeService.getAll().then(function(queriedOffices){
        $scope.offices = queriedOffices;
        console.log("offices" + queriedOffices);
    }); 


    /*************************CONDITIONALS TO SETUP CONTROLLER BASED ON ADD/EDIT/PROFILE VIEWS****************/
    if(UserService.isAddEdit()===UserService.IS_PROFILE){
        console.log("Is Profile");
        UserService.get(currentParseUser).then(function(queriedUser){
            extendedUser = queriedUser[0];
            OfficeService.getManagedOffices(extendedUser).then(function(queriedOffices){
                console.log("Queried offices: "+queriedOffices);
                $scope.$apply(function(){
                    $scope.managed_offices = queriedOffices;
                    parseUser = currentParseUser;
                    setParseScope(currentParseUser);
                    setExtScope(extendedUser);
                });
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
                        OfficeService.getManagedOffices(extendedUser).then(function(queriedOffices){
                            console.log("Queried offices: "+queriedOffices);
                            $scope.$apply(function(){
                                $scope.managed_offices = queriedOffices;
                                parseUser = queriedParseUser;
                                setParseScope(parseUser);
                                setExtScope(extendedUser);
                            });
                        });
                    }                            
                });
            }
        });
    }else if(UserService.isAddEdit()===UserService.IS_ADD){
        extendedUser = new ExtendedUser();
        $scope.extendedUser = extendedUser;
        $('#role').prop('disabled', false);
        $('#username').prop('disabled', false);
    }

    function setExtScope(extended_user){ //set scope for extended user attributes
        /*Extended user attributes*/
        $scope.extendedUser = extendedUser;
        if(extended_user.has(ExtendedUser.FIRST_NAME)){
            $scope.first_name = extended_user.get(ExtendedUser.FIRST_NAME);
        }
        if(extended_user.has(ExtendedUser.LAST_NAME)){
            $scope.last_name  = extended_user.get(ExtendedUser.LAST_NAME);
        }
        if(extended_user.has(ExtendedUser.CORPORATE_ROLE)){
            $scope.role       = extended_user.get(ExtendedUser.CORPORATE_ROLE);
        }
        if(extended_user.has(ExtendedUser.OFFICE)){
            $scope.office = extended_user.get(ExtendedUser.OFFICE);
            console.log($scope.office);
        }
    }
    function setParseScope(parse_user){ //set scope for parse user attributes
        $scope.username = parse_user.get(ExtendedUser.USERNAME);
        $scope.email    = parse_user.get(ExtendedUser.EMAIL);
        if(currentParseUser.id === parse_user.id){
            $('#email').prop('disabled', false);
        }
    }

    /*Save profile*/
    $scope.saveUser = function(form) {
        console.log("STUFF");
        if(form.$valid){
            $("#overlay").addClass("currently-loading");
            if(UserService.isAddEdit()===UserService.IS_ADD){
                var username = $scope.username;
                var password = $scope.password;
                console.log("ADD User");
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
                console.log("Edit User");
                extendedUser = setUserFromScope(extendedUser);
                console.log(parseUser);
                if($scope.password){
                    parseUser.set(ExtendedUser.PASSWORD, $scope.password);
                }
                saveExtendedUser(extendedUser);
                if(currentParseUser.id === parseUser.id){ //only save parse user object if the logged in user is the edited user
                    parseUser.set(ExtendedUser.EMAIL, $scope.email);
                    parseUser.save(null, {
                        success: function(user){
                            console.log("saved parse user");
                        }, 
                        error: function(user, error){
                        $(".error").html('Couldn\'t update user...').show();
                          $("#overlay").removeClass("currently-loading");
                        }
                    });
                }
                
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
        extendedUser.set(ExtendedUser.OFFICE, $scope.office);
        return extendedUser;
    }


    
    
});