
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//creacion de un nutricionista
export const login = async (ctx) => {
  const email=ctx.request.body.email
  try {

    const user= await prisma.nutricionista.findUnique({where:{email}})

    if(!user){
      ctx.status=404
      return
    }
    
    ctx.body=user
    ctx.status=201
    console.log(ctx.body);

  } catch (error) {
    ctx.body=error
    ctx.status=500
  }

}

// export const signup = async (ctx) =>{

// } 



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