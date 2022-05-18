/*
 require('dotenv').config();
 const express = require('express');
 const conecction = require('./config/connection');
 const app = express();
 const auth_Route = require('./routes/auth.route')
 const illust_Route = require('./routes/illust.route')

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 app.use('/auth/',auth_Route);
 app.use('/illust/',illust_Route)
 const PORT = process.env.PORT || 5000;

 app.listen(PORT, ()=>{
     console.log(`Server is running on port ${PORT}`);
});

*/

require('dotenv').config();
const express = require('express');
const conecction = require('../config-deprecated/connection');
const app = express();
const auth_Route = require('../routes/auth.route')
const illust_Route = require('../routes/illust.route')
const http = require('http');

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