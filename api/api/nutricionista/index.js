

import bcrypt from 'bcrypt'
import { prisma } from '../../prisma/index.js'



//creacion de un nutricionista
export const login = async (ctx) => {

  const email = ctx.request.body.email

  try {

    const user = await prisma.nutricionista.findUnique({ where: { email } })

    if (!user) {
      ctx.status = 400
      return
    }

    ctx.body = user
    ctx.status = 201
    console.log(ctx.body);

    // TODO: IMPLEMENTAR jwt  

  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }

}


// *codigo para crear un usuario Nutricionista y guardarlo en la db
export const signup = async (ctx) => {

  const email = ctx.request.body.email
  const exist_user = await prisma.nutricionista.findUnique({ where: { email } })

  if (exist_user) {
    ctx.status = 400
    return
  }

  //! hasheo la pass que el usuario ingresa / 10->round for hash encryption
  const nutri_password = await bcrypt.hash(ctx.request.body.nutri_password, 10)

  //TODO:mover a una funcion externa para validar errores
  //*Parseo los sig campos para que no den error
  const anos=parseInt(ctx.request.body.anos_experiencia)
  const idChef=parseInt(ctx.request.body.id_chefDigitales)
//TODO:-------------------------------------------------------

  const data = {
    email,
    nutri_password,
    nombre: ctx.request.body.nombre,
    apellido: ctx.request.body.apellido,
    telefono: ctx.request.body.telefono,
    anos_experiencia: anos,
    foto_diploma: ctx.request.body.foto_diploma,
    id_chefDigitales: idChef,
  }

  try {
    //retiro la pass de los demas attr
    const {nutri_password,...user} = await prisma.nutricionista.create({ data })
    ctx.body = user
    ctx.status = 201

  } catch (error) {
    ctx.body = error
    ctx.status = 500
    console.log("🚀 ~ file: index.js:67 ~ signup ~ error:", error)

  }

}









// CODIGO PRE-REGISTRO PARA UN USUARIO NUTRICIONISTA
// existira una aprobacion para que un admin de chefDigitales
// acepte o rechaze la solicitud de creacion del usuario nutricionista



// Ruta para el registro de usuarios
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