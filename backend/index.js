const cors = require('cors')
const express = require('express')
const Consultas = require('./modelos/Consultas')
const Mascotas = require('./modelos/Mascota')
const Recordatorios = require('./modelos/Recordatorios')
const Usuario = require('./modelos/Usuario')
const { where } = require('sequelize')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/usuario', async (req,res)=>{
    try {
        const usuario = await Usuario.findAll()
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error:' + error})
    }
})

app.get('/login', async(req,res)=>{
    try {
        const Email = req.body.email
        const Password = req.body.password
        const usuario = await Usuario.findAll({where:{
            email:Email,
            password: Password
        }})
        if(usuario.length != 0){
            res.status(200).json(usuario)
        }else{
            res.status(404).json({mensaje: 'contraseña o correo incorrecto'})
        }
    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error:' + error})
    }
})

app.listen(5000,()=>{
    console.log('aplicacion en el puerto 5000')
})