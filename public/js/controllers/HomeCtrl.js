angular.module('sampleApp').controller('HomeCtrl', homeCtrl);
homeCtrl.$inject = ['$location','$rootScope','authentication'];

function homeCtrl($location,$rootScope,authentication){
    var vm = this;
    $rootScope.page="home";

}



