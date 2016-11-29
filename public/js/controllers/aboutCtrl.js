angular.module('sampleApp').controller('aboutCtrl', aboutCtrl);
aboutCtrl.$inject = ['d3service','$rootScope','$routeParams','$mdDialog', '$mdSidenav','$interval','$mdToast','$scope','$timeout','Upload','$scope'];

function aboutCtrl(d3service,$rootScope,$routeParams,$mdDialog,$mdSidenav,$interval,$mdToast,$scope,$timeout,Upload,$scope) {
    var vm = this;



    $scope.$on('$viewContentLoaded', function(){

        var example = Popcorn.vimeo('#video', 'http://player.vimeo.com/video/139416145' );

        example.footnote({
            start:2,
            end: 6,
            text: "Pop!",
            target: 'footnotediv'
        });

        example.footnote({
            start: 8,
            end: 18,
            text: "Pop 2 de nuevo jaja",
            target: 'footnotediv'
        });


        console.log(example);
    });

}