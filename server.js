const express = require('express');
const faker = require('faker');
const cors = require('cors');
const bodyParser = require('body-parser');

var user = {
    username: 'mum',
    password: 'p'
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/random-user', function(req, res){
    var user = faker.helpers.userCard();
    res.json(user);
});

app.post('/login', authenticate, function(req, res){
    res.send(user);
});

app.listen(3000, function(){
    console.log('App running on localhost:3000');
});

// UTIL FUNCTION
function authenticate(req, res, next){
    var body = req.body;
    if(!body.username || !body.password){
        res.status(400).end('Must provide username or password');
    }
    if(body.username !== user.username || body.password !== user.password){
        res.status(401).end('Username or password is incorrect');
    }
    next();
}