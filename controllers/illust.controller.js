const controller = {}
const use_DB = require('../config/connectionPool')
const mysql = require('mysql2/promise')

//Method

controller.getIllust = async (req, res, next) => {
    const id = req.params.illust_id

    try {
        const pool = await use_DB
        console.log(typeof pool)

        // illust info
        const stmt = `select * from illusts where illust_id = ?`
        const illustquery = pool.query(stmt, [id])
        const illustdata = await illustquery
        // author info
        const author_id = illustdata[0][0].author_id
        const author_stmt = `select * from author where author_id = ?`
        const authorquery = pool.query(author_stmt, [author_id])
        const authordata = await authorquery
        // tags info
        const illust_id = illustdata[0][0].illust_id
        const tags_stmt =
            'select ti.tag_name, t.tag_trad from tags_illusts ti inner join tags t on t.tag_name = ti.tag_name where ti.i_id = ?'
        const tags_query = pool.query(tags_stmt, [illust_id])
        const tagsdata = await tags_query
        // pages info
        const pages_stmt = 'select * from pages where illust_id = ?'
        const pages_query = pool.query(pages_stmt, [illust_id])
        const pagesdata = await pages_query

        // joining data
        illustdata[0][0].author = authordata[0][0]
        illustdata[0][0].tags = tagsdata[0]
        illustdata[0][0].pages = pagesdata[0]
        res.json(illustdata[0][0])
        //  const algo = Object.assign({},{obj},{tags,meta_single_page});

        // console.log(illust_object);

        //res.json(illust_object);
    } catch (error) {
        console.log(error.message)
    }
}

controller.searchIllust = async (req, res) => {
    ///Me imagino que esta sera una consulta combinada(tags,pages,etc) a diferencia de la anterior que solo busca la base de los arhivos
    const searchword = req.params.searchword
    let illust_arrays = []
    try {
        const pool = await use_DB
        const stmt = `select * from illusts where title like '%${searchword}%'`
        const illustquery = pool.query(stmt, [searchword])
        const illustdata = await illustquery
        for (let i = 0; i < illustdata[0].length; i++) {
            illust_arrays.push(illustdata[0][i])
        }
        res.json(illust_arrays)
    } catch (error) {
        console.log(error.message)
    }
}

controller.showIllust = async (req, res) => {
    res.redirect(`/img/${req.params.folder}/illusts/${req.params.file}`)
}

controller.showThumbs = async (req, res) => {
    res.redirect(`/img/${req.params.folder}/thumbs/${req.params.file}`)
}

controller.illustRanking = async (req, res) => {
    // get today date
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const today_date = `${year}-${month}-${day}`

    try {
        const pool = await use_DB
        let ranking_arr = []
        const stmt =
            'select * from illusts where publish_date = ? order by favorites desc limit 10'
        const illustquery = await pool.query(stmt, [today_date])
        const illustdata = await illustquery
        for (let i = 0; i < 5; i++) {
            ranking_arr.push(illustdata[0][i])
        }
        res.json(ranking_arr)
    } catch (error) {
        console.log('este: ', error.message)
    }
}

controller.trendingTagsIllust = async (req, res) => {
    try {
        const pool = await use_DB
        const stmt = `select * from tags order by tag_count desc limit 10`
        const query = await pool.query(stmt)
        res.json(query[0])
    } catch (error) {
        console.log(error.message)
    }
}

/* Ambos operaciones la realizamos con la base de datos el de agregar y el de eliminar */
//ADD bookmarks
controller.bookmarkIllust = async (req, res) => {
    const illust_id = req.params.illust_id
    const user_id = req.params.user_id
    try {
        const pool = await use_DB
        const stmt = 'insert into favorites (f_author_id, f_illust_id) values (?,?)'
        const query = await pool.query(stmt, [user_id, illust_id])
        res.json(query)
    } catch (error) {
        console.log(error.message)
    }
}

// DELETE bookmarks
controller.un_bookmarkIllust = async (req, res) => {
    const illust_id = req.params.illust_id
    const user_id = req.params.user_id
    try {
        const pool = await use_DB
        const stmt = `delete from favorites where f_author_id = ? and f_illust_id = ?`
        const query = await pool.query(stmt, [user_id, illust_id])
        res.json(query)
    } catch (error) {
        console.log(error.message)
    }
}

//obtener los comentarios de una illust
controller.getIllustComments = async (req, res) => {
    const illust_id = req.params.illust_id
    try {
        const pool = await use_DB
        const stmt = `select * from comments where comment_illust_id = ?`
        const illustquery = pool.query(stmt, [illust_id])
        const illustdata = await illustquery
        res.json(illustdata[0])
    } catch (error) {
        console.log(error.message)
    }
}

// obtener los relateds de una illust
controller.illustRelateds = async (req, res) => {
    // se ejcuta cuando en la interfaz el usuario da click en mostrar relacionados
    const illust_id = req.params.illust_id
    try {
        const pool = await use_DB
        const stmt = 'select * from tags_illusts where i_id = ?'
        const tagsquery = await use_DB.query(stmt, [illust_id])
        const tagsdata = await tagsquery
        const tags_arr = tagsdata[0]

        let related_ids_arr = []
        for (let i = 0; i < tags_arr.length - 1; i++) {
            const related_id_stmt = 'select tag_a.i_id, tag_a.tag_name, tag_b.tag_name from tags_illusts tag_a join tags_illusts tag_b on tag_b.i_id = tag_a.i_id where tag_a.tag_name = ? and tag_b.tag_name = ?'
            const related_id_query = await pool.query(related_id_stmt, [tags_arr[i].tag_name, tags_arr[i + 1].tag_name])
            const related_id_data = await related_id_query
            for (let j = 0; j < related_id_data[0].length; j++) {
                // comprobando si el id ya esta en el array
                if (!related_ids_arr.includes(related_id_data[0][j].i_id)) {
                    related_ids_arr.push(related_id_data[0][j].i_id)
                }
            }
        }
        for(let i = 0; i < related_ids_arr.length; i++){
            const illust_rel_query = "select * from illusts where illust_id = ?"
            const illust_rel_data = await pool.query(illust_rel_query, [related_ids_arr[i]])
            related_ids_arr[i] = illust_rel_data[0][0]
        }
        res.json(related_ids_arr)
    } catch (error) {
        console.log("Error de illustRelated ", error.message)
    }
}

module.exports = controller