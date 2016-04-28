'use strict';
var mainApp = angular.module('mainApp', ['ngRoute','ngCookies', 'appRoutes', 'MainCtrl','LoginCtrl', 
	'HomeCtrl', 'ProfileCtrl', 'UserCtrl', 'UserService', 'UserManagementCtrl']);

/*Parse Object Injection*/
Parse.initialize("test_id");
Parse.serverURL = 'http://officedev.paulhovley.com/parse';
Parse.User.extend();
/*Inject currentUser*/
var ExtendedUser = new Parse.Object.extend("ExtendedUser", {
	//Instance methods
	getFullName : function(){
		return this.get("first_name") + " " + this.get("last_name");
	},
	initialize: function(attrs, options){
		this.user_id = "",
		this.first_name = ""
	}
}, {_ID            : "id",
	FIRST_NAME     : "first_name",
	LAST_NAME      : "last_name",
	CORPORATE_ROLE : "corporate_role",
	CORPORATE_ROLES: ['Admin', 'Manager','Sales Rep'],
	PARENT_ID      : "parent_id"});

/*var User = Parse.User.extend({
	getFullName : function(){
		return this.get("first_name") + " " + this.get("last_name");
	},
}, {_ID            : "id",
	FIRST_NAME     : "first_name",
	LAST_NAME      : "last_name",
	CORPORATE_ROLE : "corporate_role",
	CORPORATE_ROLES: ['Admin', 'Manager','Sales Rep']}); //User to inherit from Parse User class   */   

mainApp.value("User", ExtendedUser);

var currentUser = Parse.User.current();
mainApp.value("currentUser", currentUser);


