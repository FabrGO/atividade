const mysql = require('mysql2'); //Drive do banco

//criar a connect com o banco
const pool = mysql.createPool({
    connectionLimit:10, //Cache disponivel para aplicação
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:'Sen@iDev77!.',
    database: 'banco'
})
//Exportando módulo criado
module.exports = pool
