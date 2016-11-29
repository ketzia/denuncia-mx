angular.module('sampleApp').controller('ProfileCtrl', profileCtrl);
profileCtrl.$inject = ['$http','$rootScope','authentication','$mdDialog','data','$interval','$mdToast'];

function profileCtrl($http,$rootScope,authentication,$mdDialog,data,$interval,$mdToast){
    var vm = this;

    vm.editando = false;
    vm.usuario = authentication.currentUser();

    vm.toggleEditar = function(){
        vm.editando = !vm.editando;
    };

    vm.putEditar = function(){
        authentication.edit(vm.usuario)
            .then(function(){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Has editado tus datos correctamente')
                        .position('top right')
                        .hideDelay(3000)
                );
            });
    };

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