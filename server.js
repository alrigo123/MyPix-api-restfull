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

