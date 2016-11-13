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

		.when('/logout',{
			templateUrl: 'views/home.html',
			controller: 'LogoutCtrl',
			controllerAs: 'vm'
		})

		.when('/delegaciones',{
			templateUrl: 'views/indexDelegaciones.html',
			controller: 'indexDelegacionesCtrl',
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

function run($rootScope,$location, authentication,$mdDialog){
	$rootScope.$on('$routeChangeStart', function(event,nextRoute, currentRoute){
		if($location.path() === '/perfil'){
			if(!authentication.isLoggedIn()){
				$location.path('/');
				$mdDialog.show($mdDialog.alert()
					.parent(angular.element('#contenedor'))
					.clickOutsideToClose(true)
					.title('Error')
					.textContent('No puedes acceder a esa ruta, inicia sesión primero')
					.ariaLabel('Alert Dialog Demo')
					.ok('Ok')
				);
			}
		}

		if($location.path() === '/registrarse' || $location.path() === '/login'){
			if(authentication.isLoggedIn()){
				$location.path('/perfil');
			}
		}
	});
}