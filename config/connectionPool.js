const { database } = require('./keys');
const mysql = require('mysql2/promise');

const createTcpPool = async () => {
    return await mysql.createPool({
        user: 'root',
        password: '',
        database: 'appandroid',
        host: 'localhost',
        port: "3306",
        socketPath: ""
    });
};

const createPoolAndConn = async () =>
    await createTcpPool()
        .then(
            console.log("Conectado a BD")
        )
        .catch((err) => {
            console.log(err);

        });

async function connectbd() {
    await createPoolAndConn();
}
module.exports = connectbd;
