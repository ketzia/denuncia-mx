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

		.when('/login',{
			templateUrl: 'views/login.html',
			controller: 'LoginCtrl',
			controllerAs: 'vm'
		})

		.when('/perfil',{
			templateUrl: 'views/perfil.html',
			controller: 'ProfileCtrl',
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

}]).run(run);

function run($rootScope,$location, authentication){
	$rootScope.$on('$routeChangeStart', function(event,nextRoute, currentRoute){
		if($location.path() === '/perfil'){
			if(!authentication.isLoggedIn()){
				$location.path('/');
				console.log("No estas logeado");
			}
		}
	});
}