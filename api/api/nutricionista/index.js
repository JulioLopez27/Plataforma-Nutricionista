
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from '../../prisma/index.js'

import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR
} from '../HTTP_STATUS/index.js'

import {
  authenticateUser,
  validatePhone,
  validateEmail,
  validatePassword,
  createUser,
  createUserCountryData,
  createUserSpecialtyData,
  stringToInt
} from './helpers.js'

//se setea el tiempo de expiracion del token
const set_expiration_time = "8h"
const set_default_idChefDigitales = 0


// Función para validar si el email ya existe

//creacion de un nutricionista
// Función para manejar el inicio de sesión de un usuario
export const login = async (ctx) => {
  console.log(ctx.request.body)
  try {
    // Extraemos el email y la contraseña del cuerpo de la petición
    const email = ctx.request.body.email
    const plainTextPassword = ctx.request.body.password

    await validatePassword(plainTextPassword)
    // Intentamos autenticar al usuario
    const user = await authenticateUser(email, plainTextPassword)

    // Si la autenticación es exitosa, eliminamos la contraseña del objeto del usuario
    const { password, ...result } = user

    // Creamos un token de acceso para el usuario
    const accesToken = jwt.sign({
      sub: user.id,
      name: user.nombre,
      expiresIn: set_expiration_time,
    }, process.env.JWT_SECRET)

    // Preparamos la respuesta para el cliente
    ctx.body = {
      user: result,
      accesToken
    }
    // Establecemos el código de estado HTTP a 201 (Creado)
    ctx.status = HTTP_STATUS_CREATED

  } catch (error) {
    // Si ocurre un error, preparamos un mensaje de error para el cliente
    ctx.body = { error: error.message }
    // Establecemos el código de estado HTTP a 500 (Error interno del servidor)
    ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR
  }
}


// *codigo para crear un usuario Nutricionista y guardarlo en la db
export const signup = async (ctx) => {
  try {
    // extraigo el email y lo busco para ver si existe en la DB
    const email = ctx.request.body.email

    //verifico en la DB que no existe ese email
    await validateEmail(email)

    //valido la contraseña
    await validatePassword(ctx.request.body.password)

    //valido el telefono
    await validatePhone(ctx.request.body.telefono)
    //email no existente, hasheo la pass ingresada por el usuario
    //! hasheo la pass que el usuario ingresa / 10->round for hash encryption
    const hashPassword = await bcrypt.hash(ctx.request.body.password, 10)

    //parseo a int los valores que recibo del front
    const anos = await stringToInt(ctx.request.body.anos_experiencia)
    const id_especialidad = await stringToInt(ctx.request.body.especialidad)
    const id_pais = await stringToInt(ctx.request.body.pais)


    const ciudad = ctx.request.body.ciudad
    if (ciudad === "") {
      ctx.status = HTTP_STATUS_NOT_FOUND
      return
    }

    //si no recibo id de chefDigitales, seteo uno propio=0, para evitar inyeccion de datos
    const idChef = parseInt(ctx.request.body.id_chefDigitales) || set_default_idChefDigitales
    //guardo en una variable la informacion del diploma que el nutricionista subio 
    const { foto_diploma } = ctx.request.files

    //creo el obj user_data para darle a prisma y crear el nutricionista
    const user_data = {
      email,
      password: hashPassword,
      nombre: ctx.request.body.nombre,
      apellido: ctx.request.body.apellido,
      telefono: ctx.request.body.telefono,
      anos_experiencia: anos,
      //guardo la ruta del diploma
      foto_diploma: foto_diploma ? foto_diploma.filepath : null,
      id_chefDigitales: idChef,
    }

    //se envian los datos del registro para crear el usuario 
    const user = await createUser(user_data)
    const id_nutricionista = user.id
    const user_country_data = await createUserCountryData(id_nutricionista, id_pais, ciudad)
    const user_specialty_data = await createUserSpecialtyData(id_nutricionista, id_especialidad)

    //retiro la pass de los demas attr
    const { password, ...result } = user

    const accesToken = jwt.sign({
      sub: user.id,
      name: user.nombre,
      expiresIn: set_expiration_time,
    }, process.env.JWT_SECRET)

    ctx.body = {
      user: result, user_country_data, user_specialty_data,
      accesToken
    }
    ctx.status = HTTP_STATUS_CREATED

  } catch (error) {
    ctx.body = { error: error.message }
    ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR
  }
}




//*ToDo:crear funciones para actualizar los datos del nutricionista
//*ToDo:crear una funcion para listar todos los nutricionistas
//*ToDo:crear una funcion para borrar algun nutricionista

//obtengo el listado de las especialidades
export const getSpecialty = async (ctx) => {
  try {
    const list = await prisma.especialidad.findMany()
    ctx.body = list
    ctx.status = 201
  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }
}

//obtengo el listado de los paises en cual chefDigitales tiene presencia
export const getCountries = async (ctx) => {
  try {
    const list = await prisma.pais.findMany()
    ctx.body = list
    ctx.status = 201
  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }
}


// CODIGO PRE-REGISTRO PARA UN USUARIO NUTRICIONISTA
// existira una aprobacion para que un admin de chefDigitales
// acepte o rechaze la solicitud de creacion del usuario nutricionista


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