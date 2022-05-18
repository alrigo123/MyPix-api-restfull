//const conex = require('../config/connection-deprecated.js');
const dataFuntioncs = require('../middlewares/functions');
const controller = {}
const mysql = require('mysql2/promise');
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
const createTcpPool = async () => {

    return await mysql.createPool(
        {
            user: 'root',
            password: '',
            database: 'appandroid',
            host: 'localhost',
            port: "3306",
            socketPath: ""
        }
    );

};

const createPoolAndCon = async () =>
    await createTcpPool()
        .then(
            console.log("Conectado a BD"))
        .catch((err) => {
            console.log("error", err.message)
        });

controller.getIllust = async (req, res) => {
    const id = req.params.illust_id;
    let illust_object = [];
    try {
        // await conex.query(`select illust_id, i_author_id, title, thumb_link, thumb_url, publish_date, views, favorites, relateds from illusts where illust_id = ${id}`, async (err, rows) => {
        //     if (err) throw err.message;
        //     illust_object.push(rows);
        //     //console.log(rows)

        //     await conex.query(`select tags.tag_name, tags.tag_trad from tags_illusts inner join tags on tags.tag_name = tags_illusts.tag_name where tags_illusts.i_id = ${id}`, (err, rowsTags) => {
        //         if (err) throw err.message;
        //         illust_object.push(rowsTags);             //   console.log(rowsTags)

        //         // res.json(rowsTags);

        //     })
        //     //res.json(rows);

        //     await conex.query(`select * from pages where illust_id= ${id}`, (err, rowsPages) => {
        //         if (err) throw err.message;
        //         console.log(rowsPages)

        //         illust_object.push(rowsPages);
        //     })
        //     res.json(illust_object);
        //     console.log(illust_object)

        // })

        //const { database } = require('./keys');

        const pool = await createPoolAndCon();
        console.log(typeof pool);
        const stmt = `select illust_id, i_author_id, title, thumb_link, thumb_url, publish_date, views, favorites, relateds from illusts where illust_id = ?`;
        const stame2 = 'select * from illusts'
        const illustparam = id;
        const illustquery = pool.query(stmt, [illustparam]);
        const ilusst = pool.query(stame2, []);
        const illustdata = await illustquery;
        const illustdata2 = await ilusst;

        // res.json(illustdata[0]);
        illust_object.push(illustdata[0], illustdata2[0]);
        console.log(illust_object);
        res.json(illust_object);

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = controller;