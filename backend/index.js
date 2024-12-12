const cors = require('cors')
const express = require('express')
const Consultas = require('./modelos/Consultas')
const Mascotas = require('./modelos/Mascota')
const Recordatorios = require('./modelos/Recordatorios')
const Usuario = require('./modelos/Usuario')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));


app.get('/usuario', async (req,res)=>{
    try {
        const usuario = await Usuario.findAll()
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error:' + error})
    }
})

app.get('/login/:correo/:password', async(req,res)=>{
    try {
        const Email = req.params.correo
        const Password = req.params.password
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


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body; // Extraemos email y password del cuerpo de la solicitud.

        // Buscamos el usuario en la base de datos con las credenciales proporcionadas.
        const usuario = await Usuario.findAll({
            where: {
                email: email,
                password: password
            }
        });
        // Verificamos si se encontró algún usuario.
        if (usuario.length > 0) {
            res.status(200).json(usuario); // Si el usuario existe, lo devolvemos.
        } else {
            res.status(404).json({ mensaje: 'Correo o contraseña incorrectos' }); // Si no existe, devolvemos un mensaje de error.
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error: ' + error.message }); // En caso de error en el servidor, enviamos un mensaje.
    }
});

app.post('/usuario', async(req,res)=>{
    try {
        
        const usuario = await Usuario.create(req.body)
        res.status(201).json(usuario);

    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error:' + error})
    }
})

app.put('/usuario/:usuarioID', async(req,res)=>{
   try {
        const usuarioID = req.params.usuarioID
        console.log(usuarioID, req.body)
        const [updated] = await Usuario.update(req.body, {
            where: {id: usuarioID}
        })

        if (updated) {
            res.status(201).json({ mensaje: "Usuario actualizado correctamente" });
          } else {
            res.status(400).json({ mensaje: "no se actualizo" });
          }
    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error:' + error})
    } 
})

app.delete("/usuario/:idUsuario", async (req, res) => {
    try {
      const deleted = await Usuario.destroy({
        where: { id: req.params.idUsuario },
      });
  
      if (deleted) {
        res.status(200).send({ mensaje: "usuario eliminado correctamente" });
      } else {
        res.status(404).json({ error: "usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Ocurrio un error" + error });
    }
  });

// Endpoint GET para obtener todas las consultas
app.get("/consultas/:usuarioId", async (req, res) => {
    try {
      const usuarioId = req.params.usuarioId
      const consultas = await Consultas.findAll({where:{
        usuarioId:usuarioId
      }}); // Obtener todas las consultas
      res.status(200).json(consultas); // Enviar la lista de consultas
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las consultas" });
    }
  });
  
  // Endpoint POST para crear una nueva consulta
  app.post("/consultas", async (req, res) => {
    const { fecha, usuarioId, mascotaId, motivo, estado } = req.body;
  
    // Validación de los datos requeridos
    if (!fecha || !usuarioId || !motivo || estado === undefined) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
  
    try {
      // Crear una nueva consulta usando el modelo Consultas
      const nuevaConsulta = await Consultas.create({
        fecha,
        usuarioId,
        mascotaId,
        motivo,
        estado,
      });
      res.status(201).json(nuevaConsulta); // Enviar la consulta creada
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear la consulta" });
    }
  });


app.get("/mascotasporusuario/:idUsuario",async(req,res)=>{
    try {
        const mascotas = await Mascotas.findAll({where: { idUsuario: req.params.idUsuario }})
        res.status(200).json(mascotas)
    } catch (error) {
        res.status(500).json({ error: "Ocurrio un error" + error });
    }
})

app.get("/mascotas/:id",async(req,res)=>{
    try {
        const mascotas = await Mascotas.findAll({where: { id: req.params.id }})
        res.status(200).json(mascotas)
    } catch (error) {
        res.status(500).json({ error: "Ocurrio un error" + error });
    }
})

app.post("/mascotas", async(req,res)=>{
    try {        
        const mascota = await Mascotas.create(req.body)
        res.status(201).json({ mensaje: "mascota creada con exito" });
    } catch (error) {
        res.status(500).json({ error: "Ocurrio un error" + error });
    }
})

app.put("/mascotas/:idMascota", async(req,res)=>{
    try {
        const updated = await Mascotas.update(req.body,{where:{ id: req.params.idMascota}})
        if (updated) {
            res.status(201).json({ mensaje: "Mascota actualizada correctamente" });
          } else {
            res.status(400).json({ mensaje: "no se actualizo" });
          }

    } catch (error) {
        res.status(500).json({ error: "Ocurrio un error" + error });
    }
})

app.delete("/mascotas/:idMascota", async(req,res)=>{
    try {
        const updated = await Mascotas.destroy({where:{ id: req.params.idMascota}})
        if (updated) {
            res.status(201).json({ mensaje: "Mascota Eliminada de la base de datos correctamente" });
          } else {
            res.status(400).json({ mensaje: "no se elimino" });
          }

    } catch (error) {
        res.status(500).json({ error: "Ocurrio un error" + error });
    }
})

app.get("/recordatorios/:idUsuario",async(req,res)=>{
    try {
        const recordatorios = await Recordatorios.findAll({where:{idUsuario:req.params.idUsuario}})
        res.status(200).json(recordatorios)
    } catch (error) {
        res.status(500).json({ error: "Ocurrio un error" + error });
    }
})

app.post("/recordatorios", async(req,res)=>{
    try {        
        const recordatorios = await Recordatorios.create(req.body)
        res.status(201).json({ mensaje: "Recordatorio creado con exito" });
    } catch (error) {
        res.status(500).json({ error: "Ocurrio un error" + error });
    }
})

app.put("/recordatorios/:idRecordatorio", async(req,res)=>{
    try {
        const updated = await Recordatorios.update(req.body,{where:{ idRecordatorio: req.params.idRecordatorio}})
        if (updated) {
            res.status(201).json({ mensaje: "Recordatorio actualizado correctamente" });
          } else {
            res.status(400).json({ mensaje: "no se actualizo" });
          }

    } catch (error) {
        res.status(500).json({ error: "Ocurrio un error" + error });
    }
})

app.delete("/recordatorios/:idRecordatorio", async(req,res)=>{
    try {
        const updated = await Recordatorios.destroy({where:{ idRecordatorio: req.params.idRecordatorio}})
        if (updated) {
            res.status(201).json({ mensaje: "Recordatorio Eliminado correctamente" });
          } else {
            res.status(400).json({ mensaje: "no se elimino" });
          }

    } catch (error) {
        res.status(500).json({ error: "Ocurrio un error" + error });
    }
})

app.listen(5000,()=>{
    console.log('aplicacion en el puerto 5000')
})