angular.module('sampleApp').controller('ProfileCtrl', profileCtrl);
profileCtrl.$inject = ['$http','$rootScope','authentication','$mdDialog'];

function profileCtrl($http,$rootScope,authentication,$mdDialog){
    var vm = this;
    vm.usuario = authentication.currentUser();

}