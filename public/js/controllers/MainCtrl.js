angular.module('sampleApp').controller('MainCtrl', mainCtrl);
mainCtrl.$inject = ['$location'];

function mainCtrl($location){
	var vm = this;
	vm.name="Ernesto";

}



