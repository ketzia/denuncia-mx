angular.module('sampleApp').controller('ProfileCtrl', profileCtrl);
profileCtrl.$inject = ['$http','$rootScope','authentication','$mdDialog','data','$interval'];

function profileCtrl($http,$rootScope,authentication,$mdDialog,data,$interval){
    var vm = this;
    vm.usuario = authentication.currentUser();

    data.obtenerSiniestroPorDelegacion(vm.usuario.idDelegacion)
        .then(
            function(res){
                vm.siniestros = res.data;
                data.obtenerDelegacionPorId(vm.usuario.idDelegacion)
                    .then(
                        function(res){
                            vm.delegacion = res.data;
                        }
                    )
                ;
            }
        )
    ;

    data.obtenerSiniestrosPorUsuario(vm.usuario.id)
        .then(
            function(res){
                vm.siniestrosPropios = res.data;
                console.log(vm.siniestrosPropios);
            }
        )
    ;

    $interval(function() {
        data.obtenerSiniestroPorDelegacion(vm.usuario.idDelegacion)
            .then(
                function(res) {
                    vm.siniestros = res.data;
                }
            )
        ;
        data.obtenerSiniestrosPorUsuario(vm.usuario.id)
            .then(
                function(res){
                    vm.siniestrosPropios = res.data;
                }
            )
        ;
    }, 3000);

}