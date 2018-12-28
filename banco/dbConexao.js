const mysql = require('mysql');

const conexao = mysql.createPool({
    host: '127.0.0.1',
    user: 'wesley',
    password: 'password',
    database: 'db_galeria'
});

module.exports = conexao;
