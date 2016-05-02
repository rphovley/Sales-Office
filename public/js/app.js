'use strict';
var mainApp = angular.module('mainApp', ['ngRoute','ngCookies','ngMessages', 'appRoutes', 'MainCtrl','LoginCtrl', 
	'HomeCtrl', 'ProfileCtrl', 'UserCtrl','OfficeCtrl', 'officeCard', 'OfficeService', 'UserService', 'UserManagementCtrl', 'compareTo']);


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
	isAdmin : function(){
		console.log("CORPORATE ROLE: " + this.get(ExtendedUser.CORPORATE_ROLE));
		console.log(this.get(ExtendedUser.CORPORATE_ROLE) === 'Admin');
		return this.get(ExtendedUser.CORPORATE_ROLE) === 'Admin';
	},
	initialize: function(attrs, options){
		this.user_id = "",
		this.first_name = "",
		this.last_name = "",
		this.role = "";
	}
}, {CLASS_NAME     : "ExtendedUser",
	USERNAME       : "username",
	PASSWORD       : "password",
	EMAIL          : "email",
	_ID            : "id",
	FIRST_NAME     : "first_name",
	LAST_NAME      : "last_name",
	CORPORATE_ROLE : "corporate_role",
	CORPORATE_ROLES: ['Admin', 'Manager','Sales Rep'],
	PARSE_USER    : "parent"});

mainApp.value("ExtendedUser", ExtendedUser);
console.log(ExtendedUser);
var currentParseUser = Parse.User.current();
mainApp.value("currentParseUser", currentParseUser);


