require('dotenv').config();

const http = require('http');
const express = require('express');
const app = express();

const {createPoolAndCon} = require('./config/connectionPool');
const auth_Route = require('./routes/auth.route')
const illust_Route = require('./routes/illust.route')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth/',auth_Route);
app.use('/illust/',illust_Route)

const port = 5000;
const hostname = '192.168.1.4';

const httpServer = http.createServer(app);

httpServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});