import { prisma } from '../../../prisma/index.js'
import bcrypt from 'bcrypt'


//------------Funcion usada en el login-------
// Función para autenticar al usuario
export async function authenticateUser(email, plainTextPassword) {
  // Buscamos al usuario en la base de datos
  const user = await prisma.nutricionista.findUnique({
    where: { email },
    select: {
      id: true,
      nombre: true,
      password:true,
    }
  });
  // Si el usuario no existe, lanzamos un error
  if (!user) {
    throw new Error('Email no encontrado');
  }

  // Comprobamos si la contraseña proporcionada coincide con la del usuario
  const passwordMatch = await bcrypt.compare(plainTextPassword, user.password);

  // Si la contraseña no coincide, lanzamos un error
  if (!passwordMatch) {
    throw new Error('Contraseña incorrecta');
  }

  // Si todo va bien, devolvemos el usuario
  return user;
}


//---------------------------------------------------------------------------------------------------------------------------------

//FUNCIONES AUXILIARES PARA LA LOGICA DE REGISTRO


// Función para crear un nuevo usuario
export async function createUser(user_data) {
  try {
    const user = await prisma.nutricionista.create({ data: user_data })
    // Si no se pudo crear el usuario, lanzamos un error
    if (!user) {
      throw new Error('No se pudo registrar sus datos')
    }
    return user;
  } catch (error) {
    // Si el error es debido a un email duplicado, lanzamos un error específico
    if (error.code === 'P2002' && error.meta && error.meta.target) {
      const target = error.meta.target[0]
      if (target.includes('email')) {
        throw new Error('El email ya está registrado')
      }
    }
    // Para cualquier otro error, lanzamos un error genérico
    throw new Error('Error al crear su usuario, contacte con la empresa')
  }
}

//crea un registro en la tabla nutri_pais 
export async function createUserCountryData(id_nutricionista, id_pais, ciudad) {
  try {
    const user_country_data = await prisma.nutricionista_pais.create({ data: { id_nutricionista, id_pais, ciudad } });
    return user_country_data;
  } catch (error) {
    throw new Error('Error al crear los datos del país del nutricionista');
  }
}

//se encarga de crear un registro en la tabal nutri_especialidad
export async function createUserSpecialtyData(id_nutricionista, id_especialidad) {
  try {
    const user_specialty_data = await prisma.nutricionista_especialidad.create({ data: { id_nutricionista, id_especialidad } });
    return user_specialty_data;
  } catch (error) {
    throw new Error('Error al crear los datos de la especialidad del nutricionista');
  }
}

// Función para validar si un email ya existe en la base de datos
export async function validateEmail(email) {
  const exist_user = await prisma.nutricionista.findUnique({ where: { email } });
  // Si el usuario existe, lanzamos un error
  if (exist_user) {
    throw new Error('Email ya existe');
  }
}


//Funcion para actualizar la informacion del nutricionista en las tablas
//Pais y especialidad

export async function updateRecord(model, id_nutricionista, data) {
  const record = await model.findFirst({ where: { id_nutricionista } });
  if (record) {
    await model.update({ where: { id: record.id }, data });
  }
}





// CODIGO PRE-REGISTRO PARA UN USUARIO NUTRICIONISTA
// existira una aprobacion para que un admin de chefDigitales
// acepte o rechaze la solicitud de creacion del usuario nutricionista
//#region

// mejoras a futuro y lineas de accion
// Ruta para el registro de usuarios
//------------------------------------------
// export const envio_de_registro = async (ctx) => {
//   try {
//     // extraigo el email y lo busco para ver si existe en la DB
//     const email = ctx.request.body.email
//     await validateEmail(email)

//     // ... (código anterior)

//     // Preparamos los datos del usuario
//     const user_data = {
//       email,
//       password: hashPassword,
//       nombre: ctx.request.body.nombre,
//       apellido: ctx.request.body.apellido,
//       telefono: ctx.request.body.telefono,
//       anos_experiencia: anos,
//       foto_diploma: foto_diploma ? foto_diploma.filepath : null,
//       id_chefDigitales: idChef,
//     }

//     // Enviamos los datos del usuario a la API externa
//     const response = await fetch('https://api.example.com/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(user_data),
//     });

//     // Comprobamos si la solicitud fue exitosa
//     if (!response.ok) {
//       throw new Error('Error al registrar el usuario en la API externa');
//     }

//     // Si la API acepta los datos, creamos el usuario en nuestra base de datos
//     const user = await prisma.nutricionista.create({ data: user_data })

//   } catch (error) {
//     ctx.body = { error: error.message }
//     ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR
//   }
// }

//#endregion
//Idea: Se crea el registro del nutricionista siempre en la etapa de pre-registro y cambiar un param
//booleano(aprobado) en la BD cuando chefDigitales apruebe su registro.