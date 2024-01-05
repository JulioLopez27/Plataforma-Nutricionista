
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from '../../prisma/index.js'

//se setea el tiempo de expiracion del token
const set_expiration_time = "8h"



//creacion de un nutricionista
export const login = async (ctx) => {

  const [type, token] = ctx.headers.authorization.split(" ")

  const [email, plainTextPassword] = Buffer.from(token, 'base64').toString().split(":")

  const user = await prisma.nutricionista.findUnique({ where: { email } })
  if (!user) {
    ctx.status = 404
    return
  }

  const passwordMatch = await bcrypt.compare(plainTextPassword, user.password)
  if (!passwordMatch) {
    ctx.status = 406
    return
  }

  const { password, ...result } = user

  try {

    const accesToken = jwt.sign({
      sub: user.id,
      name: user.nombre,
      expiresIn: set_expiration_time,
    }, process.env.JWT_SECRET)

    //JWT_SECRET => corresponde a una clave(string),variable de ambiente en la cual
    //se usa para que solo el back-end pueda crearla y validar el token 

    ctx.body = {
      user: result,
      accesToken
    }
    ctx.status = 201

  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }

}


// *codigo para crear un usuario Nutricionista y guardarlo en la db
export const signup = async (ctx) => {
  //extraigo el email y lo busco para ver si existe en la DB
  const email = ctx.request.body.email
  const exist_user = await prisma.nutricionista.findUnique({ where: { email } })
  //email existente, corto ejecucion del codigo y mando error
  if (exist_user) {
    ctx.status = 400
    return
  }

  //email no existente, hasheo la pass ingresada por el usuario
  //! hasheo la pass que el usuario ingresa / 10->round for hash encryption
  const password = await bcrypt.hash(ctx.request.body.password, 10)

  //TODO:mover a una funcion externa para validar errores
  //*Parseo los sig campos para que no den error
  const anos = parseInt(ctx.request.body.anos_experiencia)
  const idChef = parseInt(ctx.request.body.id_chefDigitales)
  //TODO:-------------------------------------------------------

  const data = {
    email,
    password,
    nombre: ctx.request.body.nombre,
    apellido: ctx.request.body.apellido,
    telefono: ctx.request.body.telefono,
    anos_experiencia: anos,
    foto_diploma: ctx.request.body.foto_diploma,
    id_chefDigitales: idChef,
  }

  try {
    //retiro la pass de los demas attr
    const user = await prisma.nutricionista.create({ data })
    const { password, ...result } = user

    const accesToken = jwt.sign({
      sub: user.id,
      name: user.nombre,
    }, process.env.JWT_SECRET)

    ctx.body = {
      user: result,
      accesToken
    }
    ctx.status = 201

  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }
}




//*ToDo:crear funciones para actualizar los datos del nutricionista
//*ToDo:crear una funcion para listar todos los nutricionistas
//*ToDo:crear una funcion para borrar algun nutricionista



// CODIGO PRE-REGISTRO PARA UN USUARIO NUTRICIONISTA
// existira una aprobacion para que un admin de chefDigitales
// acepte o rechaze la solicitud de creacion del usuario nutricionista


// mejoras a futuro y lineas de accion
// Ruta para el registro de usuarios
// //------------------------------------------
// app.post('/registro', async (req, res) => {
//   try {
//     // Envía los datos al servicio externo
//     const servicioExternoRespuesta = await enviarAServiceExterno(req.body);

//     // Si la respuesta del servicio externo es exitosa, guarda en la base de datos
//     if (servicioExternoRespuesta.exitoso) {
//       const usuarioCreado = await prisma.usuario.create({
//         data: {
//           // Aquí puedes mapear los datos recibidos según tu modelo de base de datos
//           // Ejemplo: email, nombre, etc.
//           email: req.body.email,
//           nombre: req.body.nombre,
//           // ...otros campos
//         },
//       });

//       res.json({ exitoso: true, usuario: usuarioCreado });
//     } else {
//       res.json({ exitoso: false, mensaje: 'Registro no aceptado por el servicio externo' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ exitoso: false, mensaje: 'Error en el servidor' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Servidor escuchando en el puerto ${port}`);
// });

// // Función para enviar datos al servicio externo
// async function enviarAServiceExterno(datos) {
//   // Implementa la lógica para enviar datos al servicio externo aquí
//   // Puedes usar bibliotecas como axios o fetch para hacer la solicitud HTTP
//   // Retorna una respuesta simulada por ahora
//   return { exitoso: true };
// }