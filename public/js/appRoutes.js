// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    Parse.initialize("test_id");
    Parse.serverURL = 'http://nextbigparseserver.azurewebsites.net:1337/parse';
    console.log("ROUTING");
    if(Parse.User.current()){ //if the user is logged in
        $routeProvider
            // home page
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainController'
            })
            // messages page that will use the MessagesController
            .when('/messages', {
                templateUrl: 'views/messages.html',
                controller: 'MainController'
            })

            // payments controller
            .when('/payment', {
                templateUrl: 'views/payment.html',
                controller: 'MainController'
            })
            .when('/checkout', {
                templateUrl: 'views/checkout.html',
                controller: 'MainController'
            }).when('/login',{
                redirectTo:'/'
            })
        
             //profile controller
            .when('/profile', {
                templateUrl: 'views/profile.html',
                controller: 'MainController'
            })
            
            //Edit profile controller
            .when('/editProfile', {
                templateUrl: 'views/editProfile.html',
                controller: 'MainController'
            })
    }else{ //if the user is not logged in
        $routeProvider
        .otherwise({
                templateUrl: 'login.html',
                controller: 'MainController'
            })
        
    }
    $locationProvider.html5Mode(true);

}]);