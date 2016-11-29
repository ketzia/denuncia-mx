angular.module('sampleApp').controller('aboutCtrl', aboutCtrl);
aboutCtrl.$inject = ['d3service','$rootScope','$routeParams','$mdDialog', '$mdSidenav','$interval','$mdToast','$scope','$timeout','Upload','$scope'];

function aboutCtrl(d3service,$rootScope,$routeParams,$mdDialog,$mdSidenav,$interval,$mdToast,$scope,$timeout,Upload,$scope) {
    var vm = this;

    $scope.$on('$viewContentLoaded', function(){

        var example = Popcorn.vimeo('#video', 'http://player.vimeo.com/video/139416145' );

        example.footnote({
            start:2,
            end: 10,
            text: "En mexico los delitos más comunes son robo, secuestro y homicidio",
            target: 'footnotediv'
        });

        example.footnote({
            start: 13,
            end: 21,
            text: "13 de las 50 ciudades mas peligrosas del mundo se encuentran en México (2011)",
            target: 'footnotediv'
        });

        example.footnote({
            start: 25,
            end: 40,
            text: "El 38% de los reclusos revelaron que cometieron los delitos en la misma colonia en la que residían",
            target: 'footnotediv'
        });

        example.footnote({
            start: 45,
            end: 80,
            text: "Una de las principales razones es que la gente no denuncia y si lo llegan a hacer tienen un tiempo de respuesta muy largo",
            target: 'footnotediv'
        });

        example.footnote({
            start: 85,
            end: 120,
            text: "Ayudanos a cambiar esta situación, protege tu comunidad.",
            target: 'footnotediv'
        });


        console.log(example);
    });

}