const use_DB = require('../config/connectionPool')
const dataFunctions = require('../middlewares/functions')
const controller = {}

controller.getAuthors = async (req, res) => {
    const ids = []

    try {
        const pool = await use_DB.createPoolAndCon()
        console.log(typeof pool)

        const stmt = `select * from author`
        const stmt2 = `UPDATE author SET email = ?, password = ?, followers = ? WHERE author_id = ?`

        const illust = pool.query(stmt, [])
        const illustData = await illust

        for (i = 0; i < row.length; i++) {
            //console.log(row[i].author_id);
            ids.push(row[i].author_id)

            const pass = dataFunctions.generatePassword()
            const email = dataFunctions.generateEmail()
            const followers = dataFunctions.randomNumber()

            const illustUpdate = pool.query(stmt2, [email, pass, followers, ids[i]])

            res.json(illustUpdate)
        }
        //res.json(illustData);
    } catch (error) {
        throw `Error catching => ${error.message}`
    }
}

controller.followArtist = async (req, res) => {
    const author_id = req.params.author_id
    const follower_id = req.params.follower_id

    const pool = await use_DB
    try {
        const follow_stmt = `INSERT INTO author_follow (author_id, follower_id) VALUES (?, ?)`
        await pool.query(follow_stmt, [author_id, follower_id])
        res.json({
            message: 'Successfully followed artist'
        })
    } catch (error) {
        res.json({
            message: 'Error following artist'
        })
        throw `Error catching => ${error.message}`

    }
}

controller.illustRecommended = async (req, res) => {
    // artistas recomendados para el usuario
    const user_id = req.params.user_id

    const pool = await use_DB
    try {
        //obteniendo follows actuales del usuario
        const stmt = 'select * from author_follow where follower_id = ?'
        const query = await pool.query(stmt, [user_id])
        const author_stmt = 'select * from author'
        const author_query = await pool.query(author_stmt)
        const recommendedartists = []
        for (i = 0; i < author_query[0].length; i++) {
            if (recommendedartists.length == 10) {
                break
            }
            if (author_query[0][i].author_id != user_id) {
                let is_in_follows = false
                for (j = 0; j < query[0].length; j++) {
                    if (author_query[0][i].author_id == query[0][j].author_id) {
                        is_in_follows = true
                    }
                }
                if (!is_in_follows) {
                    recommendedartists.push(author_query[0][i])
                }
            }
        }
        for (i = 0; i < recommendedartists.length; i++) {
            const illust_stmt = 'select * from illusts where i_author_id = ?'
            const illust_query = await pool.query(illust_stmt, [
                recommendedartists[i].author_id
            ])
            let author_illusts = []
            for (j = 0; j < illust_query[0].length; j++) {
                if (j == 4) {
                    break
                }
                author_illusts.push(illust_query[0][j])
            }
            recommendedartists[i].illusts = author_illusts
        }
        res.json(recommendedartists)
    } catch (error) {
        res.json({
            message: 'Error With recommended'
        })
        throw `Error catching => ${error.message}`
    }

}

controller.userBookmarksIllust = async (req, res) => {
    // podria ser getFavoriteIllust IDK - subject to discussion

    const user_id = req.params.user_id
    const pool = await use_DB
    try {
        const bookmarks_stmt = 'select * from favorites where f_author_id = ?'
        const bookmarks_query = await pool.query(bookmarks_stmt, [user_id])
        const bookmarks_data = await bookmarks_query

        const bookmarks_arr = bookmarks_data[0]
        if (bookmarks_arr.length == 0) {
            return res.json({
                message: 'user has no bookmarks'
            })
        }

        const all_bookmarks = []

        for (let i = 0; i < bookmarks_arr.length; i++) {
            const illust_stmt = 'select * from illust where illust_id = ?'
            const illust_query = await pool.query(illust_stmt, [
                bookmarks_arr[i].illust_id
            ])
            const illust_data = await illust_query
            all_bookmarks.push(illust_data[0])
        }
        res.json(all_bookmarks)
    } catch (error) {
        res.json({
            message: 'error getting bookmarks'
        })
        throw `Error catching => ${error.message}`
    }
}

//ADD and DELETE follow
controller.followUser = async (req, res) => {
    const author_id = req.params.author_id // el id del usuario a seguir
    const follower_id = req.params.follower_id // este es el id del usuario logeado

    const pool = await use_DB
    try {
        // verificar si el usuario ya sigue al autor
        const check_following_stmt =
            'select * from author_follow where author_id = ? and follower_id = ?'
        const check_following_query = await pool.query(check_following_stmt, [
            author_id,
            follower_id
        ])
        const check_following_data = await check_following_query

        if (check_following_data[0].length == 0) {
            // then follow user
            console.log('Autor: ', author_id, 'seguidor por parte de:', follower_id)
            const follow_stmt =
                'insert into author_follow (author_id, follower_id) values (?, ?)'
            await pool.query(follow_stmt, [author_id, follower_id])
            res.json({
                message: 'user succesfully followed'
            })
        } else {
            res.json({
                message: 'user already followed'
            })
        }
    } catch (error) {
        res.json({
            message: 'error following user'
        })
        throw `Error catching => ${error.message}`
    }
}

controller.un_followUser = async (req, res) => {
    const author_id = req.params.author_id // el id del usuario a seguir
    const follower_id = req.params.follower_id // este es el id del usuario logeado
    const pool = await use_DB
    try {
        // check if user is following
        const check_following_stmt =
            'select * from author_follow where author_id = ? and follower_id = ?'
        const check_following_query = await pool.query(check_following_stmt, [
            author_id,
            follower_id
        ])
        const check_following_data = await check_following_query
        if (check_following_data[0].length == 0) {
            res.json({
                message: 'user not following'
            })
        } else {
            const follow_stmt =
                'delete from author_follow where author_id = ? and follower_id = ?'
            await pool.query(follow_stmt, [author_id, follower_id])
            res.json({
                message: 'user succesfully unfollowed'
            })
        }

    } catch (error) {
        res.json({
            message: 'error unfollowing user'
        })
        throw `Error catching => ${error.message}`
    }
}

controller.usersFollowing = async (req, res) => {
    const user_id = req.params.user_id // id de usuario logeado
    const pool = await use_DB
    try {
        const following_stmt = 'select * from author_follow where follower_id = ?'
        const following_query = await pool.query(following_stmt, [user_id])
        const following_data = await following_query
        const following_arr = following_data[0]
        if (following_arr.length == 0) {
            return res.json({
                message: 'user has no following'
            })
        } else {
            const all_following = []
            for (let i = 0; i < following_arr.length; i++) {
                const author_stmt = 'select * from author where author_id = ?'
                const author_query = await pool.query(author_stmt, [
                    following_arr[i].author_id
                ])
                const author_data = await author_query
                all_following.push(author_data[0])
            }
            res.json(all_following[0])
        }
    } catch (error) {
        res.json({
            message: 'error getting following users'
        })
        throw `Error catching => ${error.message}`
    }
}

//obtener las ilustraciones de un autor
controller.getIllustFromAuthor = async (req, res) => {
    const author_id = req.params.author_id // id del usuario a obtener perfil
    const pool = await use_DB
    try {
        const author_stmt = 'select * from author where author_id = ?'
        const author_query = await pool.query(author_stmt, [author_id])
        const author_data = await author_query
        const author_info = author_data[0][0]
        console.log(author_info)
        if (author_info.length == 0) {
            return res.json({
                message: 'author not found'
            })
        } else {
            const author_id = author_info.author_id
            const illusts_query = 'select * from illusts where i_author_id = ?'
            const illusts_data = await pool.query(illusts_query, [author_id])
            const illusts_arr = illusts_data[0]
            if (illusts_arr.length == 0) {
                return res.json({
                    message: 'author does not have illustrations'
                })
            }
            const all_illusts = []
            author_info.illusts = illusts_arr
            res.json(author_info)
        }
    } catch (error) {
        res.json({
            message: 'error getting illust author'
        })
        throw `Error catching => ${error.message}`
    }
}

module.exports = controller