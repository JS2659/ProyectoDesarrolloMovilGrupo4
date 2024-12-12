const Sequelize = require('sequelize') 

const sequelize = new Sequelize(
    'proyectodesarrollomovil',
    'root',
    'L0renzana2811@',

    {
        host: process.env.host,
        port: process.env.port,
        dialect: 'mysql'
    }
)

sequelize.authenticate()
    .then(()=>console.log('Conexion Realizada con Exito'))
    .catch(err=> console.log('Ocurrio un erro en la conexion'))

module.exports = sequelize