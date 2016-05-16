'use strict';
var mainApp = angular.module('mainApp', ['ngRoute','ngCookies','ngMessages', 'appRoutes', 'MainCtrl','LoginCtrl', 
	'HomeCtrl', 'UserCtrl','OfficeCtrl', 'officeCard', 'OfficeService', 'UserService',
	 'UserManagementCtrl', 'compareTo', 'managedUserOffice', 'officeManagers', 'userTextFields', 'userDropdowns', 'parseUserFields' ]);


/*Parse Object Injection*/
Parse.initialize("test_id");
Parse.serverURL = 'http://officedev.paulhovley.com/parse';
Parse.User.extend();
/*Inject currentUser*/

var currentParseUser = Parse.User.current();
mainApp.value("currentParseUser", currentParseUser);


