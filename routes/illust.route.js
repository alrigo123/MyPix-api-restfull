const express = require('express');
const illust_Controller = require('../controllers/illust.controller')
const route = express.Router();

//para obtener un illust con su Id que seria lo mismo que buscar
route.get('/:illust_id', illust_Controller.getIllust);
route.get('/:illust_id', illust_Controller.searchIllust);

//Illust Ranking (supongo que no se le pasa parametros solo una consulta en general donde en el query estara order by......)
route.get('/illustRanking', illust_Controller.illustRankig);

//Illust trending tags
route.get('/illustTrendingTags', illust_Controller.illustTrendingTags);

//Bookmarks functions
route.get('/addBookmark/:(ID RESPECTIVO)', illust_Controller.bookmarkIllust); //este deberia ser con post pero necesito la explicacion si existe un "btnSumbit"
route.get('/deleteBookmark/:(ID RESPECTIVO)', illust_Controller.un_bookmarkIllust);

// obtener los comentarios de una illust --- illustComments
route.get('/getIllustComments/:(ID RESPECTIVO)',illust_Controller.getIllustComments);

//obtener los relateds de una illust
route.get('/illustRelated/:(ID RESPECTIVO)',illust_Controller.illustRelateds)

module.exports = route;

