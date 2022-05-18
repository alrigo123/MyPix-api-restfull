var db = require('mysql2-promise');
const {database} = require('./keys');

const createTcpPool = async () => {

    return await mysql.createPool({
        database
    });

};


//Crear connection to database
const createPoolAndCon = async () =>
    await createTcpPool()
        .then(
            console.log("Conectado a BD"))
        .catch((err) => {
            console.log("error", err.message)
        });

module.exports = createPoolAndCon;