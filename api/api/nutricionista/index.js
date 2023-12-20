
import { connection } from '../../database/setup.js'

//creacion de un nutricionista
export const signup = async (ctx) => {

  const data = {
    id_nutricionista: ctx.request.body.id_nutricionista,
    email: ctx.request.body.email,
    contrasena: ctx.request.body.contrasena,
    nombre: ctx.request.body.nombre,
    apellido: ctx.request.body.apellido,
    telefono: ctx.request.body.telefono,
    especialidad: ctx.request.body.especialidad,
    anos_de_experiencia: ctx.request.body.anos_de_experiencia,
    link_foto_diploma: ctx.request.body.link_foto_diploma,
    id_chef_digitales: ctx.request.body.id_chef_digitales
  }
  try {
    
  } catch (error) {
    console.log(error);
  }

}

