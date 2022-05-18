const { database } = require('./keys');
const mysql = require('mysql2/promise');

module.exports = {

    // cretae variables to database
    createTcpPool: async () => {
        return await mysql.createPool({ database });
    },

    //Create connection to database
    createPoolAndCon: async () => {
        await createTcpPool()
            .then(
                console.log("Conectado a BD"))
            .catch((err) => {
                console.log("error", err.message);
            });
    }
};