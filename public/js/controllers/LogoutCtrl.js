angular.module('sampleApp').controller('LogoutCtrl', logoutCtrl);
logoutCtrl.$inject = ['$location','$http','$rootScope','authentication','$mdDialog'];

function logoutCtrl($location,$http,$rootScope,authentication,$mdDialog){
    var vm = this;
    authentication.logout();
    $location.path('/');
}