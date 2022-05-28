const express = require('express');
const illust_Controller = require('../controllers/illust.controller')
const route = express.Router();

//para obtener un illust con su Id que seria lo mismo que buscar
route.get('/getIllust/:illust_id', illust_Controller.getIllust);
//http://192.168.1.4:5000/illust/ 97836046

route.get('/searchIllust/:searchword', illust_Controller.searchIllust);
//http://192.168.1.4:5000/illust/ anime

//mostrar imagen illust
route.get('/images/:folder/illusts/:file',illust_Controller.showIllust)

//mostrar thumbs
route.get('/images/:folder/thumbs/:file',illust_Controller.showThumbs)


route.get('/mostrarImagen',(req, res)=>{
res.render('image')
})


//Illust Ranking (supongo que no se le pasa parametros solo una consulta en general donde en el query estara order by......)
route.get('/illustRanking', illust_Controller.illustRanking);

//Illust trending tags
route.get('/illustTrendingTags', illust_Controller.trendingTagsIllust);

//Bookmarks functions
route.get('/addBookmark/:illust_id/:user_id', illust_Controller.bookmarkIllust); //este deberia ser con post pero necesito la explicacion si existe un "btnSumbit"
route.get('/deleteBookmark/:illust_id/:user_id', illust_Controller.un_bookmarkIllust);

// obtener los comentarios de una illust --- illustComments
route.get('/getIllustComments/:illust_id',illust_Controller.getIllustComments);

//obtener los relateds de una illust
route.get('/illustRelated/:illust_id',illust_Controller.illustRelateds)

module.exports = route;

