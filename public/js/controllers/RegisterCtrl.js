angular.module('sampleApp').controller('RegisterCtrl', registerCtrl);
registerCtrl.$inject = ['$http'];

function registerCtrl($http){
    var vm = this;

    vm.credentials = {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombreUsuario: "",
        email: ""
    };

    vm.onSubmit = function(){
        //console.log(vm.credentials);
        return $http.post('/api/user/register', vm.credentials)
            .error(function(err){
                console.log("Hubo un error: "+ err.message);
            })
            .then(function(data){
                console.log("Data: " + data);
            });
    }
}