angular
    .module('sampleApp')
    .service('authentication',authentication);
authentication.$inject= ['$http','$window','$rootScope'];

function authentication($http,$window,$rootScope){

    var saveToken = function(token){
        $window.localStorage['mean-token'] = token;
    };

    var getToken = function(){
        return $window.localStorage['mean-token'];
    };

    register = function (user) {
        return $http.post('/api/user/register',user)
            .success(function(data){
                saveToken(data.token);
            });
    };

    login = function(user){
      return $http.post('/api/user/login',user)
          .success(function(data){
             saveToken(data.token);
              $rootScope.isLoggedIn=true;
          });
    };

    logout = function(){
        $window.localStorage.removeItem('mean-token');
        $rootScope.isLoggedIn=false;
    };

    var isLoggedIn = function(){
        var token = getToken();
        var payload;
        if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return payload.exp > Date.now() / 1000;
        }else{
            return false;
        }
    };

    var currentUser = function(){
        if(isLoggedIn()){
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return{
                id: payload._id,
                email: payload.email,
                nombre: payload.nombre,
                nombreUsuario: payload.nombreUsuario,
                apellidoPaterno: payload.apellidoPaterno,
                apellidoMaterno: payload.apellidoMaterno,
                idDelegacion: payload.idDelegacion
            };
        }
    };

    return{
        saveToken: saveToken,
        currentUser: currentUser,
        login: login,
        logout: logout,
        getToken: getToken,
        register:register,
        isLoggedIn: isLoggedIn
    };
}