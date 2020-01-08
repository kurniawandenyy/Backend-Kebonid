const mysql = require('mysql')
require('dotenv/config')

const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

connect.connect( err => {
    if(err){
        console.log(`Connection Error : \n ${err}`)
    }else{
        console.log('Connection Success')
    }
})

module.exports=connect