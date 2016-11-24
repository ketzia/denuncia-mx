angular.module('sampleApp').controller('delegacionCtrl', delegacionCtrl);
delegacionCtrl.$inject = ['authentication','data','d3service','$rootScope','$routeParams','$mdDialog', '$mdSidenav','$interval','$mdToast'];

function delegacionCtrl(authentication,data,d3service,$rootScope,$routeParams,$mdDialog,$mdSidenav,$interval,$mdToast){
    var vm = this;

    angular.forEach($rootScope.delegaciones, function(value,key){
        var nombre1 = value.nombre.toLowerCase().split(" ");
        var nombre2 = $routeParams.nombre.toLowerCase().split(" ");
        if(nombre1[0]==nombre2[0]){
            vm.delegacion = value;
            d3service.d3DonutCrimenDelegacion(vm.delegacion._id)
                .then(function(res){
                    vm.data = res.data;
                });

            data.obtenerSiniestroPorDelegacion(vm.delegacion._id)
                .then(
                    function(res){
                        vm.siniestros = res.data;
                        //console.log(vm.siniestros);
                    }
                )
            ;
        }
    });



    vm.options = {
        chart: {
            type: 'pieChart',
            height: 280,
            width:280,
            donut: true,
            x: function(d){return d.llave;},
            y: function(d){return d.valor;},
            showLabels: false,

            pie: {
                startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
            },
            duration: 500,
            legend: {
                margin: {
                    top: 5,
                    right: 0,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };





    vm.categorias = $rootScope.categorias;

    vm.siniestro = {
        nombre: "",
        descripcion: "",
        delegacion: "",
        usuarioCreador: "",
        categoria: "",
        domicilio: "",
        fechaCreacion: null,
        fechaIncidente: null
    };

    $interval(function() {
        //console.log("hola");
        data.obtenerSiniestroPorDelegacion(vm.delegacion._id)
            .then(
                function(res){
                    vm.siniestros = res.data;
                    //console.log(vm.siniestros);
                }
            )
        ;
    }, 3000);


    vm.denunciar = function(){
        if(vm.siniestro.nombre != "" && vm.siniestro.descripcion != "" && vm.siniestro.domicilio != "" && vm.siniestro.fechaIncidente != "" && vm.siniestro.categoria != ""){
            vm.siniestro.delegacion = vm.delegacion._id;
            vm.siniestro.usuarioCreador = authentication.currentUser().id;
            vm.siniestro.fechaIncidente.toISOString();
            //console.log(vm.siniestro);

            data.registrarSiniestro(vm.siniestro)
                .error(function (err) {
                    $mdDialog.show($mdDialog.alert()
                        .parent(angular.element('#contenedor'))
                        .clickOutsideToClose(true)
                        .title('Error')
                        .textContent(JSON.stringify(err.message))
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Vale')
                        .targetEvent(err)
                    );
                })
                .success(function () {
                    /*
                    $mdDialog.show($mdDialog.alert()
                        .parent(angular.element('#contenedor'))
                        .clickOutsideToClose(true)
                        .title(' Éxito')
                        .textContent('Denuncia exitosa')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                    );
                    */
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('¡Denuncia exitosa!')
                            .position('top right')
                            .hideDelay(3000)
                    );

                    $mdSidenav('right').close();

                });


        }else{
            $mdDialog.show($mdDialog.alert()
                .parent(angular.element('#contenedor'))
                .clickOutsideToClose(true)
                .title('Error')
                .textContent('Faltan datos')
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok')
            );
        }
    };

    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');

    vm.isOpenRight = function () {
        return $mdSidenav('right').isOpen();
    };

    function buildDelayedToggler(navID) {
            return debounce(function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        //$log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
    function debounce(func, wait, context) {
            var timer;

            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

    function buildToggler(navID) {
        return function() {
            if(authentication.isLoggedIn()){
                $mdSidenav(navID).toggle();
            }else{
                $mdDialog.show($mdDialog.alert()
                    .parent(angular.element('#contenedor'))
                    .clickOutsideToClose(true)
                    .title('Inicia Sesión')
                    .textContent("Inicia sesión primero para publicar una denuncia")
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ok')
                );
            }
        }
    }



    vm.close = function(){
            $mdSidenav('right').close();
        }

}



