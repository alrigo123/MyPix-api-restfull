const use_DB = require('../config/connectionPool')
const dataFunctions = require('../middlewares/functions')
const controller = {}


controller.getAuthors = async (req, res) => {
    const ids = []

    try {
        const pool = await use_DB.createPoolAndCon();
        console.log(typeof pool);

        const stmt = `select * from author`;
        const stmt2 = `UPDATE author SET email = ?, password = ?, followers = ? WHERE author_id = ?`;

        const illust = pool.query(stmt, []);
        const illustData = await illust;

        for (i = 0; i < row.length; i++) {
            //console.log(row[i].author_id);
            ids.push(row[i].author_id);
            
            const pass = dataFunctions.generatePassword();
            const email = dataFunctions.generateEmail();
            const followers = dataFunctions.randomNumber();

            const illustUpdate = pool.query(stmt2, [email, pass, followers, ids[i]])

            res.json(illustUpdate);
        }
        //res.json(illustData);
    } catch (error) {
        throw `Error catching => ${error.message}`
    }
}

controller.followArtist = async (req, res) => {
}

controller.illustRecommended = async (req, res) => {
}

controller.userBookmarksIllust = async (req, res) => {  // podria ser getFavoriteIllust IDK - subject to discussion
}

//ADD and DELETE follow
controller.followUser= async (req, res) => {
}

controller.un_followUser = async (req, res) => {
}

controller.usersFollowing = async (req, res) => { 
}

//obtener las ilustraciones de un autor
controller.getIllustFromAuthor = async (req, res) => {
}


module.exports = controller;