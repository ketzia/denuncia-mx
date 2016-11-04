angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'vm'
		})

		.when('/registrarse', {
			templateUrl: 'views/registrarse.html',
			controller: 'RegisterCtrl',
			controllerAs: 'vm'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})
		.otherwise({
			redirectTo:'/'
		});

	$locationProvider.html5Mode(true);

}]);