const db = require('../../banco/dbConexao');

module.exports = class GaleriaModel {
    static findAll(callback){
        return db.query("SELECT * FROM galeria", callback);
    }

    static findById(id, callback){
        return db.query("SELECT * FROM galeria WHERE id = ?", [id], callback);
    }

    static save(dados, callback){
        return db.query("INSERT INTO galeria (titulo, caminho)  VALUES (?,?)", 
            [dados.titulo, dados.caminho], callback);
    }
}