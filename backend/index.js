const cors = require('cors')
const express = require('express')
const Consultas = require('./modelos/Consultas')
const Mascotas = require('./modelos/Mascota')
const Recordatorios = require('./modelos/Recordatorios')
const Usuario = require('./modelos/Usuario')

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

app.listen(5000,()=>{
    console.log('aplicacion en el puerto 5000')
})