const express = require('express');
const illust_Controller = require('../helpers/illust.controller')
const route = express.Router();

route.get('/:illust_id', illust_Controller.getIllust);



module.exports = route;

