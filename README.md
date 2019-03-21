=> npm install express faker

=> nodemon server.js

1st Step:
```
const express = require('express');
const faker = require('faker');

const app = express();

app.get('/random-user', function(req, res){
    var user = faker.helpers.userCard();
    res.json(user);
});

app.listen(3000, function(){
    console.log('App running on localhost:3000');
})
```
=> 1st Step: http://localhost:3000/random-user

=> create folder i.e. public
=> bower install angular
(function () {
    'user strict';
    var app = angular.module('app',[]);

    app.constant('API_URL', 'http://localhost:3000');

    app.controller('MainCtrl', function MainCtrl(RandomUserFactory){
        'use strict';
        var vm = this;
        vm.getRandomUser = getRandomUser;


        function getRandomUser(){
            RandomUserFactory.getUser().then(function success(response){
                vm.randomUser = response.data;
            })
        }
    })

    app.factory('RandomUserFactory', function RandomUserFactory($http, API_URL) {
        'use strict';
        return {
            getUser:getUser
        };
         function getUser(){
             return $http.get(API_URL + '/random-user');
         }
 
    })
})();

=> http-server
=> output -> http://localhost:8080/
=> error for cops;
=> npm install cors
const app = express(); below line;

app.use(cors());

=> nglinput
elow line;

=> npm install body-parser

