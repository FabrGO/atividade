const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('nodesequelize3','root', 'Sen@iDev77!.', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

// try{
//     sequelize.authenticate()
//     console.log('Conectado com sucesso')
// }catch(err){
//     console.log('Não foi possível conectar: '+err)
// }

module.exports = sequelize