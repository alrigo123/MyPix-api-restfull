const conex = require('../config/connection.js');
const dataFunctions = require('../middlewares/functions')
const controller = {}

const ids = []

controller.getAuthors = async (req, res) => {

    try {
        await conex.query('SELECT * FROM author', async (err, row) => {
            if (err) throw err;

            for (i = 0; i < row.length; i++) {
                //console.log(row[i].author_id);
                ids.push(row[i].author_id);
                const pass = dataFunctions.generatePassword();
                const email = dataFunctions.generateEmail();
                const followers = dataFunctions.randomNumber();

                await conex.query(`UPDATE author SET email = '${email}', password = '${pass}', followers = ${followers} WHERE author_id = ${ids[i]}`, (err, authors) => {
                    if (err) throw err.message;
                    console.log(authors);
                    res.json(authors);
                })
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}


controller.followArtist = async (req, res) => {
    
}

module.exports = controller;