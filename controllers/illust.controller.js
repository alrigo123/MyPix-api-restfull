const controller = {}
const use_DB = require('../config/connectionPool')
const mysql = require('mysql2/promise')

//Method



controller.getIllust = async (req, res, next) => {
    const id = req.params.illust_id

    try {

        const createTcpPool = async () => {
            return await mysql.createPool({
                user: 'root',
                password: '',
                database: 'appandroid',
                host: 'localhost',
                port: '3306',
                socketPath: '',
            });
        };

        const createPoolAndConn = async () => {
            await createTcpPool()
                .then(console.log('Conectado a BD'))
                .catch((err) => {
                    console.log(err)
                });
        };

            const pool = await createPoolAndConn();
            console.log(typeof pool);
            
        // illust info
        const stmt = `select * from illusts where illust_id = ?`
        const illustquery = pool.query(stmt, [id])
        const illustdata = await illustquery
        // tags info
        const illust_id = illustdata[0][0].illust_id
        console.log(illust_id)
        const tags_stmt =
            'select ti.tag_name, t.tag_trad from tags_illusts ti inner join tags t on t.tag_name = ti.tag_name where ti.i_id = ?'
        const tags_query = pool.query(tags_stmt, [illust_id])
        const tagsdata = await tags_query
        // pages info
        const pages_stmt = 'select * from pages where illust_id = ?'
        const pages_query = pool.query(pages_stmt, [illust_id])
        const pagesdata = await pages_query

        // joining data
        illustdata[0][0].tags = tagsdata[0]
        illustdata[0][0].pages = pagesdata[0]
        res.json(illustdata[0][0])
        //  const algo = Object.assign({},{obj},{tags,meta_single_page});

        // console.log(illust_object);

        //res.json(illust_object);
    } catch (error) {
        console.log(error)
    }
}

controller.searchIllust = async (req, res) => {
    ///Me imagino que esta sera una consulta combinada(tags,pages,etc) a diferencia de la anterior que solo busca la base de los arhivos
    const searchword = req.params.searchword
    let illust_arrays = []
    try {} catch (error) {
        next(error)
    }
}

controller.showIllust = async (req, res) => {
    res.redirect(`/img/${req.params.folder}/illusts/${req.params.file}`)
}

controller.showThumbs = async (req, res) => {
    res.redirect(`/img/${req.params.folder}/thumbs/${req.params.file}`)
}

controller.illustRankig = async (req, res) => {}

controller.trendingTagsIllust = async (req, res) => {}

/* Ambos operaciones la realizamos con la base de datos el de agregar y el de eliminar */
//ADD bookmarks
controller.bookmarkIllust = async (req, res) => {}

// DELETE bookmarks
controller.un_bookmarkIllust = async (req, res) => {}

//obtener los comentarios de una illust
controller.getIllustComments = async (req, res) => {}

// obtener los relateds de una illust
controller.illustRelateds = async (req, res) => {}

module.exports = controller