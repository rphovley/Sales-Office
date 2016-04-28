'use strict';
var mainApp = angular.module('mainApp', ['ngRoute','ngCookies', 'appRoutes', 'MainCtrl','LoginCtrl', 
	'HomeCtrl', 'ProfileCtrl', 'UserCtrl', 'UserService', 'UserManagementCtrl']);

/*Parse Object Injection*/
Parse.initialize("test_id");
Parse.serverURL = 'http://officedev.paulhovley.com/parse';
Parse.User.extend();
/*Inject currentUser*/

var User = Parse.User.extend({
	getFullName : function(){
		return this.get("first_name") + " " + this.get("last_name");
	},
}, {_ID            : "id",
	FIRST_NAME     : "first_name",
	LAST_NAME      : "last_name",
	CORPORATE_ROLE : "corporate_role",
	CORPORATE_ROLES: ['Admin', 'Manager','Sales Rep']}); //User to inherit from Parse User class      

mainApp.value("User", User);

var currentUser = Parse.User.current();
mainApp.value("currentUser", currentUser);


