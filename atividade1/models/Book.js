const { DataTypes } = require("sequelize");
const db = require('../db/conn')
/**
 * CREATE TABLE User(
 *  nome VARCHAR(255) not null
 *  cargo VARCHAR(255) NOT NULL
 *  NEWSLETTER BOOL 
 * );
 */

const Book = db.define('Book',{
    title:{
        type: DataTypes.STRING,
    },
    
    author:{
        type: DataTypes.STRING,
        require:true
        
    },

    price:{
        type: DataTypes.INTEGER
    },

     newsletter:{
        type: DataTypes.BOOLEAN,
    }
});

module.exports = Book