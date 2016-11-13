angular.module('sampleApp').controller('MainCtrl', mainCtrl);
mainCtrl.$inject = ['$location','$rootScope','authentication'];

function mainCtrl($location,$rootScope,authentication){
	var vm = this;

	if(authentication.isLoggedIn()){
		$rootScope.isLoggedIn = true;
	}else{
		$rootScope.isLoggedIn = false;
	}

}



