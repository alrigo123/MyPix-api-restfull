const controller = {}
const use_DB = require('../config/connectionPool');
// consulta para obtener illust
/*
    SQL
    'consultas separadas para evitar inner join'
    X = ID de ilustración
    -> Obtener ilustracion (aunque ya la tengamos, no se si se deba ejecutar)
    -> Obtener etiquetas de ilustración

    example: https://cdn.discordapp.com/attachments/829406711914954802/975057280573780088/unknown.png
    -> Obtener paginas de la ilustración  
    select * from pages where illust_id = 97836046;
    example: https://cdn.discordapp.com/attachments/829406711914954802/975058004862984222/unknown.png

    -> Obtener relacionados (esta sería la consulta mas compleja al momento) aka self join
    select tag_a.i_id, tag_b.tag_name from tags_illusts tag_a
       join tags_illusts tag_b on tag_b.i_id = tag_a.i_id
       where tag_a.tag_name = 'オリジナル' <- taG_name 1 de la ilustracion
       and   tag_b.tag_name = '創作'; <- tag_name 2 de la ilustración
    example: https://cdn.discordapp.com/attachments/829406711914954802/975058581747564564/unknown.png
*/

//Method

//Este vendria a ser searchIllust
controller.getIllust = async (req, res) => {

    const {id}= req.params.illust_id;
    let illust_object = [];

    try {
        const pool = await use_DB.createPoolAndCon();
        console.log(typeof pool);

        const stmt = `select illust_id, i_author_id, title, thumb_link, thumb_url, publish_date, views, favorites, relateds from illusts where illust_id = ?`;
        const stame2 = 'select * from illusts'
        // const illustparam = id;
        const illustquery = pool.query(stmt, [id]);
        const ilusst = pool.query(stame2, []);

        const illustdata = await illustquery;
        const illustdata2 = await ilusst;

        // res.json(illustdata[0]);
        illust_object.push(illustdata[0], illustdata2[0]);
        console.log(illust_object);

        res.json(illust_object);

    } catch (error) {
        throw `Error catching => ${error.message}`
    }
}

controller.searchIllust = async (req, res) => {
    ///Me imagino que esta sera una consulta combinada(tags,pages,etc) a diferencia de la anterior que solo busca la base de los arhivos
}

controller.illustRankig = async (req, res) => {
}

controller.trendingTagsIllust = async (req, res) => {
}

/* Ambos operaciones la realizamos con la base de datos el de agregar y el de eliminar */
//ADD bookmarks
controller.bookmarkIllust= async (req, res) => {
}

// DELETE bookmarks
controller.un_bookmarkIllust = async (req, res) => {
}

//obtener los comentarios de una illust
controller.getIllustComments = async (req, res) => {
}

// obtener los relateds de una illust
controller.illustRelateds = async (req,res) => {
}


module.exports = controller;