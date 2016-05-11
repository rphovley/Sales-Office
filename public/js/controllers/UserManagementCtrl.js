'use strict';
// public/js/controllers/ProfileCtrl.js

angular.module('UserManagementCtrl', []).controller('UserManagementController', function($scope, $location,$cookies,$window, currentParseUser, UserService, OfficeService) {
    /*declare scope variables*/
    var ExtendedUser = UserService.ExtendedUser
    var extendedUser = {};
    var parseUser = {};
    var OfficeUser = OfficeService.OfficeUser;
    var currentExtUser = {};// this is to check current users permissions
    $scope.roles      = ExtendedUser.CORPORATE_ROLES;
    
    $scope.offices = []; 
    $scope.managed_offices = [];
    console.log();

    /*Is this an edit or an add request?
    * What permissions do I have?
    * If edit, is the edit my own user? always can edit
    * If not my own user, only admin can edit
    * If add, only admin can add
    * Saving the user object
    *   If edit, and my own user, can always edit the following fields
            names, email, password
    *   If edit, and not my user, and admin, can always edit the following fields
            names, role, office, password, managed offices
    *   If add, and admin, can add using the following fields
            username, role, email, office, password, managed offices
    */
    UserService.getCurrentExtUser(currentParseUser).then(function(queriedUser){
        currentExtUser = queriedUser;
        if(queriedUser.has(ExtendedUser.CORPORATE_ROLE) && queriedUser.isAdmin()){
            enableFields([ExtendedUser.CORPORATE_ROLE, ExtendedUser.OFFICE]);
        }
    }, function(queriedUser, error){
        console.log("Error getting user");
    });

    OfficeService.getAll().then(function(queriedOffices){
        $scope.offices = queriedOffices;
    }); 

    /**
    *enable fields sets the fields that are enabled for the page
    *
    */
    /*************************CONDITIONALS TO SETUP CONTROLLER BASED ON ADD/EDIT/PROFILE VIEWS****************/
    if(UserService.isAddEdit()===UserService.IS_PROFILE || UserService.isAddEdit()===UserService.IS_EDIT){
        UserService.get().then(function(queriedUser){
            extendedUser = queriedUser;
            if(extendedUser){
                var parseUserRef = extendedUser.get(ExtendedUser.PARSE_USER);
                parseUserRef.fetch({
                    success: function(queriedParseUser){
                        OfficeService.getManagedOffices(extendedUser).then(function(queriedOffices){
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
        enableFields([ExtendedUser.CORPORATE_ROLE, ExtendedUser.USERNAME]);
    }

    var setExtScope = function(extended_user){ //set scope for extended user attributes
        /*Extended user attributes*/
        $scope.extendedUser = extendedUser;
        if(extended_user.has(ExtendedUser.FIRST_NAME)){
            $scope.first_name = extended_user.get(ExtendedUser.FIRST_NAME);
        }
        if(extended_user.has(ExtendedUser.LAST_NAME)){
            $scope.last_name  = extended_user.get(ExtendedUser.LAST_NAME);
        }
        if(extended_user.has(ExtendedUser.CORPORATE_ROLE)){
            $scope.corporate_role       = extended_user.get(ExtendedUser.CORPORATE_ROLE);
        }
        if(extended_user.has(ExtendedUser.OFFICE)){
            $scope.office = extended_user.get(ExtendedUser.OFFICE);
        }
    }
    var setParseScope = function(parse_user){ //set scope for parse user attributes
        $scope.username = parse_user.get(ExtendedUser.USERNAME);
        $scope.email    = parse_user.get(ExtendedUser.EMAIL);
        if(currentParseUser.id === parse_user.id){
            enableFields([ExtendedUser.CORPORATE_ROLE]);
        }
    }

    /*Save profile*/
    $scope.saveUser = function(form) {
        if(form.$valid){
            displaySpinner(true);
            if(UserService.isAddEdit()===UserService.IS_ADD){
                var username = $scope.username;
                var password = $scope.password;
                Parse.User.signUp(username, password,
                   { //'fullName': 'Paul Hovley', //additional attributes go here
                   ACL: new Parse.ACL() }, 
                   {
                    success: function(user) {
                      //redirect to home page
                      extendedUser.set(ExtendedUser.PARSE_USER, user);
                      extendedUser = setUserFromScope(extendedUser);
                      saveExtendedUser(extendedUser);
                    },
                    error: function(user, error) {
                      $(".error").html('Someone with that username already exists').show();
                      displaySpinner(false);
                    }
                });
            }else{
                extendedUser = setUserFromScope(extendedUser);
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
                          displaySpinner(false);
                        }
                    });
                }
                
            }
        }
    }
    
    var saveExtendedUser = function(extendedUser){
        UserService.saveExtUser(extendedUser).then(function(user){
            //$window.location.href= '/profile';
            displaySpinner(false);
        }, function(error){
            $(".error").html("Couldn't update user...").show();
            displaySpinner(false);
        });
    }

    var setUserFromScope = function(extendedUser){
        extendedUser.set(ExtendedUser.FIRST_NAME,    $scope.first_name);
        extendedUser.set(ExtendedUser.LAST_NAME,    $scope.last_name);
        extendedUser.set(ExtendedUser.CORPORATE_ROLE, $scope.role);
        extendedUser.set(ExtendedUser.OFFICE, $scope.office);
        return extendedUser;
    }

    /*enable fields in the DOM based on what's passed to the function*/
    var enableFields = function(fieldsToEnable){
        for (var i = 0; i < fieldsToEnable.length; i++) {
            $(ExtendedUser.getSelector(fieldsToEnable[i])).prop('disabled', false);
        }
    }
    /*disable fields in the DOM based on what's passed to the function*/
    var disableFields = function(fieldsToDisable){
        for (var i = 0; i < fieldsToDisable.length; i++) {
            $(ExtendedUser.getSelector(fieldsToDisable[i])).prop('disabled', true);
        }
    }

    var displaySpinner = function(isLoading){
        if(isLoading){
            $("#overlay").addClass("currently-loading");
        }else{
            $("#overlay").removeClass("currently-loading");
        }
    }

    
    
});