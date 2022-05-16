const express = require('express');
const route = express.Router();


const user_Controller = require('../controllers/users.controller');

route.get('/author',user_Controller.getAuthors);



module.exports = route;