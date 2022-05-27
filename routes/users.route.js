const express = require('express');
const route = express.Router();
const user_Controller = require('../controllers/users.controller');


route.get('/',user_Controller.getAuthors);

//Illust Recommended
route.get('/illustRecommended',user_Controller.illustRecommended)

//  ruta para obtener los favoritos de un usuario  --- userBookmarksIllust
route.get('/userBookmarksIllust/:(ID RESPECTIVO)',user_Controller.userBookmarksIllust)

// Follow and unfollow user(author)
route.get('/followUser/:(ID RESPECTIVO)',user_Controller.followUser) //este deberia ser con post pero necesito la explicacion si existe un "btnSumbit"
route.get('/unfollowUser/:(ID RESPECTIVO)',user_Controller.un_followUser)

// Artist who are follow by other users
route.get('/usersFollowing/:(ID RESPECTIVO)',user_Controller.usersFollowing)

// obtener las ilustraciones de un autor   ---   userIllusts
route.get('/getIllustFromAuthor/:(ID RESPECTIVO)',user_Controller.getIllustFromAuthor)



module.exports = route;