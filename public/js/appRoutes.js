// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    console.log("ROUTING");
    if(Parse.User.current()){ //if the user is logged in
        $routeProvider
            // home page
            .when('/', {
                templateUrl: 'views/home.html'
            })
            .when('/login',{
                redirectTo:'/'
            })
             //profile controller
            .when('/profile', {
                templateUrl: 'views/profile.html'
            })
            .when('/users', {
                templateUrl: 'views/users.html'
            })
            .when('/user_management',{
                templateUrl: 'views/user_management.html'
            })
            .when('/offices',{
                templateUrl: 'views/offices.html'
            })
            .when('/office_management',{
                templateUrl: 'views/office_management.html'
            })
        
        
    }else{ //if the user is not logged in
        $routeProvider
        .otherwise({
                templateUrl: 'login.html'
            })
        
    }
    $locationProvider.html5Mode(true);

}]);