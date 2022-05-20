const use_DB = require('../config/connectionPool')
const dataFunctions = require('../middlewares/functions')
const bcrypt = require('bcryptjs')
const controller = {}

//login

controller.login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const pool = await use_DB.createPoolAndCon()

        const stmt = 'SELECT * FROM author WHERE email = ?'

        const new_Author = await pool.query(stmt, [email])

        if ( new_Author.length === 0 ||
            !(await bcrypt.compare(password, new_Author[0].password))) {
            res.json({
                message: 'Invalid credentials',
            })
        } else {
            res.json({
                message: 'Login success',
            })
        }
    } catch (error) {
        throw `Error catching => ${error.message}`
    }
}

//register
controller.register = async (req, res) => {
    try {
        const author_Name = req.body.author_name
        const email = req.body.email
        const password = req.body.password
        const pool = await use_DB.createPoolAndCon()

        const salt = await bcrypt.genSalt(10)
        const password_Hash = await bcrypt.hash(password, salt)

        console.log(password, password_Hash)

        const stmt =
            'INSERT INTO author (author_name, email, password) VALUES (?,?,?)'

        const new_Author = await pool.query(stmt, [
            author_Name,
            email,
            password_Hash,
        ])

        res.json(new_Author)
        console.log(new_Author)
        // res.redirect('/');
    } catch (error) {
        throw `Error catching => ${error.message}`
    }
}

module.exports = controller
