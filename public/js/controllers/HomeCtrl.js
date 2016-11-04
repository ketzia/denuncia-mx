angular.module('sampleApp').controller('HomeCtrl', homeCtrl);
homeCtrl.$inject = ['$location','$rootScope'];

function homeCtrl($location,$rootScope){
    var vm = this;
    vm.name="Ernesto";

    $rootScope.page="home";





}



