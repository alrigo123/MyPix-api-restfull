const express = require('express');
const Auth_Controller = require('../controllers/auth.controller')
const route = express.Router();

route.get('/login', (req, res) => {
    res.send('login');
});

route.post('/login', (req, res) => {
    res.send('login');
})
route.get('/register', (req, res) => {
    res.send('register');
})
route.post('/register', (req, res) => {
    res.send('register');
});

module.exports = route;

