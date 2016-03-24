// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // messages page that will use the MessagesController
        .when('/messages', {
            templateUrl: 'views/messages.html',
            controller: 'MessagesController'
        })

        // payments controller
        .when('/payment', {
            templateUrl: 'views/payment.html',
            controller: 'PaymentsController'
        })
        .when('/checkout', {
            templateUrl: 'views/checkout.html',
            controller: 'PaymentsController'
        })



    $locationProvider.html5Mode(true);

}]);