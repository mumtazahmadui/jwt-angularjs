(function () {
    'use strict';
    var app = angular.module('app',[], function($httpProvider){
        $httpProvider.interceptors.push('AuthInterceptor');
    });

    app.constant('API_URL', 'http://localhost:3000');

    app.controller('MainCtrl', function MainCtrl(RandomUserFactory, UserFactory){
        'use strict';
        var vm = this;
        vm.getRandomUser = getRandomUser;
        vm.login = login;
        vm.logout = logout;


        function getRandomUser(){
            RandomUserFactory.getUser().then(function success(response){
                vm.randomUser = response.data;
            }, handleError);
        }

        function login(username, password){
            UserFactory.login(username, password).then(function success(response){
                vm.user = response.data.user;
               // alert(response.data.token);
            }, handleError);
        }

        function logout(){
            UserFactory.logout();
            vm.user = null;
        }

        function handleError(response) {
            alert('Error: ' + response.data);
        }
    });

    app.factory('RandomUserFactory', function RandomUserFactory($http, API_URL) {
        'use strict';
        return {
            getUser:getUser
        };
         function getUser(){
             return $http.get(API_URL + '/random-user');
         }
 
    });

    app.factory('UserFactory', function UserFactory($http, API_URL, AuthoTokenFactory){
        'use strict';
        return {
            login: login,
            logout: logout
        };

        function login(username, password){
            return $http.post(API_URL + '/login', {
                username: username,
                password: password
            }).then(function success(response){
                AuthoTokenFactory.setToken(response.data.token);
                return response;
            });
        }

        function logout(){
            AuthoTokenFactory.setToken();
        }
    });

    app.factory('AuthoTokenFactory', function AuthoTokenFactory($window){
        'use strict';
        var store = $window.localStorage;
        var key = 'auth-token';
        return {
            getToken: getToken,
            setToken: setToken
        };
        function getToken(){
            return store.getItem(key);
        }
        function setToken(token){
            if(token){
                store.setItem(key, token);
            } else {
                store.removeItem(key);
            }
        }
    });

    app.factory('AuthInterceptor', function AuthInterceptor(AuthoTokenFactory){
        'use strict';
        return {
            request: addToken
        };

        function addToken(config){
            var token = AuthoTokenFactory.getToken();
            if(token){
                config.headers = config.headers || {};
                config.headers.Authorization = 'Better ' + token;
            }
            return config;
        }
    })
})();