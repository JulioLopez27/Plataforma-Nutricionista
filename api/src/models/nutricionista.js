import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import SibApiV3Sdk from 'sib-api-v3-sdk';

import { prisma } from '../../prisma/index.js'

import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_BAD_REQUEST
} from '../HTTP_STATUS/index.js'

import {
  stringToInt,
  positiveValue,
  validatePassword,
  validatePhone,
} from '../utility/shared.js'


import {
  authenticateUser,
  validateEmail,
  createUser,
  createUserCountryData,
  createUserSpecialtyData,
  updateRecord,
  createReport
} from '../utility/nutricionista/helpers.js'


import {
  Consultante
} from "./consultante.js";


export class Nutricionista {

  //se setea el tiempo de expiracion del token
  static #set_expiration_time = "8h"
  static #set_default_idChefDigitales = 0

  constructor(nombre, apellido, correo, tituloEscaneado, experiencia, telefono, contraseña, país, ciudad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.activo = false;
    this.correo = correo;
    this.tituloEscaneado = tituloEscaneado;
    this.experiencia = experiencia;
    this.telefono = telefono;
    this.contraseña = contraseña; // La contraseña se almacenará como un hash mediante un algoritmo
    this.país = país;
    this.ciudad = ciudad;
    this.consultantes = []
  }

  agregarConsultante(consultante) {
    // Verificar si el parámetro es una instancia de la clase Consultante
    if (consultante instanceof Consultante) {
      this.consultantes.push(consultante);
    } else {
      throw new Error("El parámetro debe ser una instancia de la clase Consultante");
    }
  }

  getConsultantes() {
    return this.consultantes;
  }

  static async getSpecialty(ctx) {
    try {
      const list = await prisma.especialidad.findMany()
      ctx.body = list
      ctx.status = HTTP_STATUS_CREATED
    } catch (error) {
      ctx.body = {
        message: 'Hubo un error al obtener las especialidades',
        error: error.message
      }
      ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR
    }
  }

  static async getCountries(ctx) {
    try {
      const list = await prisma.pais.findMany()
      ctx.body = list
      ctx.status = HTTP_STATUS_CREATED
    } catch (error) {
      ctx.body = {
        message: 'Hubo un error al obtener los países',
        error: error.message
      }
      ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR
    }
  }

  static async getProfileData(ctx) {

    if (!ctx.headers.authorization) {
      ctx.status = HTTP_STATUS_UNAUTHORIZED
      return
    }
    const [type, token] = ctx.headers.authorization.split(" ")
    const data = jwt.verify(token, process.env.JWT_SECRET)
    const userId = data.sub

    try {
      const getProfileData = await prisma.nutricionista.findUnique({
        where: {
          id: userId
        },
        select: {
          nombre: true,
          apellido: true,
          telefono: true,
          email: true,
          anos_experiencia: true,
        }
      })

      if (!getProfileData) {
        ctx.status = HTTP_STATUS_NOT_FOUND
        throw new Error('No se encontró el perfil del nutricionista')
      }

      const getProfileCountry = await prisma.nutricionista_pais.findFirst({
        where: {
          id_nutricionista: userId
        },
        select: {
          id_pais: true,
          ciudad: true
        }
      })


      if (!getProfileCountry) {
        ctx.status = HTTP_STATUS_NOT_FOUND
        throw new Error('No se encontró el nutricionista o no tiene país asociado.')
      }

      const getProfileSpecialty = await prisma.nutricionista_especialidad.findFirst({
        where: {
          id_nutricionista: userId
        },
        select: {
          id_especialidad: true
        }
      })

      if (!getProfileSpecialty) {
        ctx.status = HTTP_STATUS_NOT_FOUND
        throw new Error('No se encontró el nutricionista o no tiene especialidad asociada.')
      }

      const { nombre, apellido, telefono, email, anos_experiencia } = getProfileData
      const { id_pais, ciudad } = getProfileCountry
      const { id_especialidad } = getProfileSpecialty

      const profileData = {
        nombre,
        apellido,
        telefono,
        email,
        especialidad: id_especialidad,
        anos_experiencia,
        pais: id_pais,
        ciudad
      }

      ctx.body = profileData
      ctx.status = HTTP_STATUS_CREATED
    } catch (error) {
      console.log(error)
    }
  }



  static async getConsultantes(ctx) {

    //    const [type, token] = ctx.headers.authorization.split(" ")
    //  const data = jwt.verify(token, process.env.JWT_SECRET)
    //const userId = data.sub

    try {
      const consultantesID = await prisma.nutricionista_consultante.findMany({
        where: {
          //REcordar cambiar esto para hacerlo dinamico!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
          id_nutricionista: 27
        }
      })
      //   console.log("aaaa")
      // const {id_nutricionista,createdAt,updatedAt, ...result } = consultantesID
      const result = consultantesID.map((consultante) => consultante.id_consultante);

      const consultantesNombres = await prisma.consultante.findMany({
        where: {
          //REcordar cambiar esto para hacerlo dinamico!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
          id: {
            in: result
          }
        }
      })
      //console.log(result)
      //const nombres = "["
      const datosConsultantes = consultantesNombres.map((consultante) => ({
        nombre: consultante.nombre,
        apellido: consultante.apellido,
        email: consultante.email,
      })); //  nombres = nombres + consultantesNombres.map((consultante) => '{nombre:"' + consultante.nombre + '", apellido:"' + consultante.apellido + '", email:"' + consultante.e/mail+"'}");
      // nombres = nombres + "]"
      //    console.log(datosConsultantes);
      ctx.body = datosConsultantes;
      ctx.status = HTTP_STATUS_CREATED

    } catch {
      // Si ocurre un error, preparamos un mensaje de error para el cliente
      ctx.body = {
        error: error.message
      }
      // Establecemos el código de estado HTTP a 500 (Error interno del servidor)
      ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR

    }

  }

  static async getReport(ctx) {
    try {
      console.log(ctx.query.id)
      const reportData = await prisma.registro.findUnique({
        where: {
          id: parseInt(ctx.query.id)
          //  id: stringToInt("2")
        },
        select: {
          id: true,
          id_nutricionista: true,
          id_consultante: true,
          nota: true,
          tipo: true,
        }
      })

      const datosRegistro = {
        id: reportData.id,
        id_nutricionista: reportData.id_nutricionista,
        id_consultante: reportData.id_consultante,
        nota: reportData.nota,
        tipo: reportData.tipo,
      };
      console.log(datosRegistro)
      ctx.body = datosRegistro;
      ctx.status = HTTP_STATUS_CREATED

    } catch (error) {
      console.log(error)
      ctx.body = {
        error: error.message,

      }
      // Establecemos el código de estado HTTP a 500 (Error interno del servidor)
      ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR

    }

  }


  static async getHistory(ctx) {
    //    const [type, token] = ctx.headers.authorization.split(" ")
    //  const data = jwt.verify(token, process.env.JWT_SECRET)
    //const userId = data.sub



    try {
      const historyID = await prisma.consultante_receta.findMany({
        where: {

          // Recordar hacer esto dinamico!!!
          id_nutricionista: 27,
        },
      });
      //console.log(historyID)
      const datosHistorico = await Promise.all(
        historyID.map(async (historico) => {
          const receta = await prisma.receta.findFirst({
            where: {
              id: historico.id_receta
            },
            select: {
              nombre: true
            }, // Fetch the Receta.name
          });

          return {
            nombre: receta.nombre,
            fechaEnvio: historico.fecha_envio,
          };
        })
      );

      //  console.log(datosHistorico);
      ctx.body = datosHistorico;
      ctx.status = HTTP_STATUS_CREATED;
    } catch (error) {
      // If an error occurs, prepare an error message for the client
      ctx.body = {
        error: error.message
      };
      // Set the HTTP status code to 500 (Internal Server Error)
      ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }
  }

  static async getHistoryInformes(ctx) {
    try {

      const idConsultante = ctx.query.idConsultante;
      const historyID = await prisma.registro.findMany({
        where: {

          // Recordar hacer esto dinamico!!!
          id_nutricionista: parseInt(27),
          id_consultante: parseInt(idConsultante),
          enviado: false
        },
      });

      const datosHistorico = historyID.map((registro) => ({
        nombre: registro.tipo,
        fechaEnvio: registro.fecha,
        enviado: registro.enviado,
        id: registro.id
      }));


      //  console.log(datosHistorico);
      ctx.body = datosHistorico;
      ctx.status = HTTP_STATUS_CREATED;
    } catch (error) {
      // If an error occurs, prepare an error message for the client
      ctx.body = {
        error: error.message
      };
      // Set the HTTP status code to 500 (Internal Server Error)
      ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }
  }


  //creacion de un nutricionista
  // Función para manejar el inicio de sesión de un usuario
  static async login(ctx) {
    const [type, token] = ctx.headers.authorization.split(" ")
    const [email, plainTextPassword] = Buffer.from(token, 'base64').toString().split(":")
    try {
      // Extraemos el email y la contraseña del cuerpo de la petición
      // const email = ctx.request.body.email
      // const plainTextPassword = ctx.request.body.password

      await validatePassword(plainTextPassword)
      // Intentamos autenticar al usuario
      const user = await authenticateUser(email, plainTextPassword)

      // Si la autenticación es exitosa, eliminamos la contraseña del objeto del usuario
      const { password, ...result } = user

      // Creamos un token de acceso para el usuario
      const accesToken = jwt.sign({
        sub: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        expiresIn: Nutricionista.#set_expiration_time,
      }, process.env.JWT_SECRET)

      // Preparamos la respuesta para el cliente
      ctx.body = {
        user: result, accesToken
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
  static async signup(ctx) {
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
      const anos = await positiveValue(ctx.request.body.anos_experiencia)
      const id_especialidad = await stringToInt(ctx.request.body.especialidad)
      const id_pais = await stringToInt(ctx.request.body.pais)


      const ciudad = ctx.request.body.ciudad
      if (ciudad === "") {
        ctx.status = HTTP_STATUS_NOT_FOUND
        return
      }

      //si no recibo id de chefDigitales, seteo uno propio=0, para evitar inyeccion de datos
      const idChef = parseInt(ctx.request.body.id_chefDigitales) || Nutricionista.#set_default_idChefDigitales
      //guardo en una variable la informacion del diploma que el nutricionista subio 
      const {
        foto_diploma
      } = ctx.request.files

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
      await createUserCountryData(id_nutricionista, id_pais, ciudad)
      await createUserSpecialtyData(id_nutricionista, id_especialidad)

      //llamo metodo para enviar datos servicio de chefDigitales
      //para pre-registro
      preRegistro(user_data, id_pais, ciudad, id_especialidad)

      //retiro la pass de los demas attr
      const { password, ...result } = user

      ctx.body = { user: result }
      ctx.status = HTTP_STATUS_CREATED

    } catch (error) {
      ctx.body = {
        error: error.message
      }
      ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR
    }
  }

  //funct usada en el metodo de signup
  //para el pre-registro
  static async preRegistro(user_data, id_pais, ciudad, id_especialidad) {
    try {
      await fetch('https://cheffdigital.com/cheffadmin/api/api3.php/registroUsuarioNutricionista', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_data, id_pais, ciudad, id_especialidad
        })
      });
    } catch (error) {
      console.error('Error al enviar los datos a ChefDigitales:', error);
      throw new Error('Error al enviar los datos a ChefDigitales.');
    }
  }


  static async acceptRegistration(ctx) {
    try {
      const requestBody = ctx.request.body;
      //valida que venga el action con el aprobado
      if (requestBody.action !== "aprobado") {
        ctx.body = { mensaje: "No se pudo aprobar el nutricionista, falló el action." }
        ctx.status = HTTP_STATUS_UNAUTHORIZED;
        return;
      }

      const nutricionista = await prisma.nutricionista.findUnique({
        where: { email: requestBody.email },
      });

      if (nutricionista && nutricionista.activo) {
        ctx.body = { mensaje: "Ya está activo el nutricionista." };
        ctx.status = HTTP_STATUS_BAD_REQUEST;
        return;
      }

      const res = await prisma.nutricionista.update({
        where: { email: requestBody.email },
        data: { activo: true },
      });

      if (!res) {
        ctx.body = { mensaje: "Hubo problemas al actualizar el registro, se adjunta error.", res };
        ctx.status = HTTP_STATUS_BAD_REQUEST;
        return;
      }

      ctx.body = { mensaje: "Usuario actualizado con suceso.", res };
      ctx.status = HTTP_STATUS_CREATED;
    } catch (error) {
      ctx.body = { error: 'No se pudo actualizar el estado del registro.', error };
      ctx.status = HTTP_STATUS_BAD_REQUEST;
    }
  }

  //   static async envioDeEmail( p_email) {

  //     const defaultClient = SibApiV3Sdk.ApiClient.instance


  //     // Configure API key authorization: api-key
  //     const apiKey = defaultClient.authentications['api-key']
  //     apiKey.apiKey = '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'

  //     const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
  //     const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
  //     sendSmtpEmail.sender = { name: 'Prueba', email: 'usuario_de_test@proton.me' }
  //     sendSmtpEmail.to = [{ email: 'julioneo95@hotmail.com' }];
  //     sendSmtpEmail.subject = 'Status de registro.'
  //     sendSmtpEmail.htmlContent = '<p>HTML content of the email</p>'
  //     sendSmtpEmail.textContent = 'Su registro se ha aprobado, por favor inicie sesión en nuestra plataforma para continuar.'
  //     sendSmtpEmail.headers = {
  //       'api-key': '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',
  //       'content-type': 'application/json',
  //       'accept': 'application/json',
  //     }

  //     apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
  //     console.log('API called successfully. Returned data: ' + data)
  //   }, function(error) {
  //     console.error(error)
  //   })
  // }

  static async updateProfile(ctx) {

    if (!ctx.headers.authorization) {
      ctx.status = HTTP_STATUS_UNAUTHORIZED
      return
    }
    const [type, token] = ctx.headers.authorization.split(" ")
    const data = jwt.verify(token, process.env.JWT_SECRET)
    const userId = data.sub

    const nombre = ctx.request.body.nombre
    const apellido = ctx.request.body.apellido
    const email = ctx.request.body.email
    const telefono = ctx.request.body.telefono

    try {

      const id_pais = await stringToInt(ctx.request.body.pais)
      const id_especialidad = await stringToInt(ctx.request.body.especialidad)
      const anos_experiencia = await positiveValue(ctx.request.body.anos_experiencia)
      await validatePhone(telefono)

      let profileData = { nombre, apellido, email, telefono, anos_experiencia }
      const profile_countrie_data = { id_pais, ciudad: ctx.request.body.ciudad }
      //valido el telefono


      //si recibo contraseña: valido,hasheo y la seteo dentro de profileData
      if (ctx.request.body.password) {
        await validatePassword(ctx.request.body.password)
        //! hasheo la pass que el usuario ingresa / 10->round for hash encryption
        const hashPassword = await bcrypt.hash(ctx.request.body.password, 10)
        //parseo a int los valores que recibo del front
        profileData = { nombre, apellido, email, telefono, anos_experiencia, password: hashPassword }
      }


      const user = await prisma.nutricionista.update({
        where: { id: userId }, data: profileData,
        select: { id: true, nombre: true, apellido: true, email: true }
      })

      //invoco la funct aux updateRecord de params(NombreDeLaTabla,id,data) para que me haga las actualizaciones
      await updateRecord(prisma.nutricionista_pais, userId, profile_countrie_data)
      await updateRecord(prisma.nutricionista_especialidad, userId, { id_especialidad })

      const accesToken = jwt.sign({
        sub: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        expiresIn: Nutricionista.#set_expiration_time,
      }, process.env.JWT_SECRET)


      ctx.body = { user, accesToken }
      ctx.status = HTTP_STATUS_CREATED
    } catch (error) {

      if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        ctx.body = { error: "No se encontro registro para actualizar" }
        ctx.status = HTTP_STATUS_NOT_FOUND
        return
      }

      console.error('Error al actualizar el perfil:', error);
      ctx.body = { error: 'Error al actualizar el perfil.' };
      ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR
    }
  }

  static async login(ctx) {
    const [type, token] = ctx.headers.authorization.split(" ")
    const [email, plainTextPassword] = Buffer.from(token, 'base64').toString().split(":")
    try {
      // Extraemos el email y la contraseña del cuerpo de la petición
      // const email = ctx.request.body.email
      // const plainTextPassword = ctx.request.body.password

      await validatePassword(plainTextPassword)
      // Intentamos autenticar al usuario
      const user = await authenticateUser(email, plainTextPassword)

      // Si la autenticación es exitosa, eliminamos la contraseña del objeto del usuario
      const { password, ...result } = user

      // Creamos un token de acceso para el usuario
      const accesToken = jwt.sign({
        sub: user.id,
        name: user.nombre,
        expiresIn: Nutricionista.#set_expiration_time,
      }, process.env.JWT_SECRET)

      // Preparamos la respuesta para el cliente
      ctx.body = {
        user: result, accesToken
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

  static async saveReport(ctx) {
    try {
      //   const [type, token] = ctx.headers.authorization.split(" ")
      //  const data = jwt.verify(token, process.env.JWT_SECRET)
      // const id_nutri = data.sub

      const cuerpo = ctx.request.body.cuerpo
      const titulo = ctx.request.body.tipo
      const id_consult = ctx.request.body.idConsultante
      console.log(id_consult)
      //CONSULTANTE TIENE QUE SER DINAMICO, ver si lo saco de la URL o que onda.

      //const id_consult=2
      const id_nutri = 27
      // const id_consult = ctx.request.body.id_consult
      // const id_nutri = ctx.request.body.id_nutri
      //creo el obj registro_data para darle a prisma y crear el informe
      const report_data = {
        id_nutricionista: parseInt(id_nutri),
        id_consultante: parseInt(id_consult),
        fecha: new Date(),
        nota: cuerpo,
        tipo: titulo,
        enviado: false
      }


      //se envian los datos del registro para crear el reporte
      const reporte = await createReport(report_data)

      ctx.body = {
        report: reporte,
      }
      ctx.status = HTTP_STATUS_CREATED

    } catch (error) {
      ctx.body = {
        error: error.message
      }
      ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR
    }
  }


  static async getConsultanteForId(ctx) {
    try {
      console.log(ctx.query.id)
      const reportData = await prisma.registro.findUnique({
        where: {
          id: parseInt(ctx.query.id)
          //  id: stringToInt("2")
        },
        select: {
          id: true,
          id_nutricionista: true,
          id_consultante: true,
          nota: true,
          tipo: true,
        }
      })

      const datosRegistro = {
        id: reportData.id,
        id_nutricionista: reportData.id_nutricionista,
        id_consultante: reportData.id_consultante,
        nota: reportData.nota,
        tipo: reportData.tipo,
      };
      console.log(datosRegistro)
      ctx.body = datosRegistro;
      ctx.status = HTTP_STATUS_CREATED

    } catch (error) {
      console.log(error)
      ctx.body = {
        error: error.message,

      }
      // Establecemos el código de estado HTTP a 500 (Error interno del servidor)
      ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR

    }


  }

  //*ToDo:crear una funcion para listar todos los nutricionistas
  //genero funcion para obtener los nutricionitas activos
  static async getNutricionistas(ctx) {
    const { action } = ctx.request.body;

    //verifico que este presente el action en el body de la request
    if (!action) {
      ctx.body = { mensaje: "Error, falta action en la request." };
      ctx.status = HTTP_STATUS_UNAUTHORIZED;
      return;
    }

    if (action !== "get_nutricionistas") {
      ctx.body = { mensaje: "Error al obtener los nutricionistas, falló en la cadena del action." };
      ctx.status = HTTP_STATUS_BAD_REQUEST;
      return;
    }

    try {
      // obtengo todos los nutricionistas activos
      const nutricionistas = await prisma.nutricionista.findMany({
        select: {
          id: true, email: true, nombre: true, apellido: true, telefono: true,
          anos_experiencia: true, foto_diploma: true, id_chefDigitales: true,
          createdAt: true, activo: true, nutricionista_pais: {
            select: {
              id: true, id_pais: true, ciudad: true,
              pais: {
                select: { nombre: true }
              }
            }
          },
          nutricionista_especialidad: {
            select: {
              id: true, id_especialidad: true, createdAt: true,
              especialidad: { select: { nombre: true } }
            }
          }
        }
      })
      ctx.body = { nutricionistas }
      ctx.status = HTTP_STATUS_CREATED
    } catch (error) {
      ctx.body = { mensaje: "Se produjo algún error, se adjunta el error del catch: ", error }
      ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR
    }
  }


}

//*ToDo:crear una funcion para borrar algun nutricionista