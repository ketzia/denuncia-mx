angular.module('sampleApp').controller('LoginCtrl', loginCtrl);
loginCtrl.$inject = ['$location','$http','$rootScope','authentication','$mdDialog'];

function loginCtrl($location,$http,$rootScope,authentication,$mdDialog){
    var vm = this;

    vm.credentials = {
        email: "",
        password :""
    };

    vm.onSubmit = function(){
        authentication
            .login(vm.credentials)
            .error(function (err) {
                $mdDialog.show($mdDialog.alert()
                    .parent(angular.element('#contenedor'))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .textContent(JSON.stringify(err.message))
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(err)
                );
            })
            .success(function () {
                /*
                $mdDialog.show($mdDialog.alert()
                    .parent(angular.element('#contenedor'))
                    .clickOutsideToClose(true)
                    .title(' Éxito')
                    .textContent('Inicio de sesion correcto')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ok')
                );
                */
                if(authentication.isLoggedIn()){
                    $location.path('/perfil');
                }

            })

    }



}