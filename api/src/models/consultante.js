import { Registro } from "./registro.js";
import { TipoDieta } from "./tipo_dieta.js";
import { Sugerencia } from "./sugerencia.js";
import { prisma } from '../../prisma/index.js'
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED, HTTP_STATUS_FORBIDEN, HTTP_STATUS_NOT_FOUND } from "../HTTP_STATUS/index.js";

export class Consultante {
    constructor(nombre, apellido, fecha_nac, correo, telefono, sexo, nutricionista) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fecha_nac = fecha_nac;
        this.correo = correo;
        this.telefono = telefono;
        this.sexo = sexo;
        this.nutricionista = nutricionista;
        this.afecciones = null;
        this.anamnesis = null;
        this.tipoDieta = null;
        this.sugerencias = [];
        this.registros = []

    }

    agregarAfeccion(afeccion) {
        // Verificar si el parámetro es una instancia de la clase Afeccion
        if (afeccion instanceof Afeccion) {
            this.afeccion = afeccion;
        } else {
            throw new Error("El parámetro debe ser una instancia de la clase Afeccion");
        }
    }

    agregarAnamnesis(anamnesis) {
        // Verificar si el parámetro es una instancia de la clase Anamnesis
        if (anamnesis instanceof Anamnesis) {
            this.anamnesis = anamnesis;
        } else {
            throw new Error("El parámetro debe ser una instancia de la clase Anamnesis");
        }
    }

    agregarTipoDieta(tipoDieta) {
        // Verificar si el parámetro es una instancia de la clase TipoDieta
        if (tipoDieta instanceof TipoDieta) {
            this.tipoDieta = tipoDieta;
        } else {
            throw new Error("El parámetro debe ser una instancia de la clase TipoDieta");
        }
    }

    agregarSugerencia(sugerencia) {
        // Verificar si el parámetro es una instancia de la clase Sugerencia
        if (sugerencia instanceof Sugerencia) {
            this.sugerencias.push(sugerencia);
        } else {
            throw new Error("El parámetro debe ser una instancia de la clase Sugerencia");
        }
    }

    agregarRegistro(registro) {
        // Verificar si el parámetro es una instancia de la clase Registro
        if (registro instanceof Registro) {
            this.registros.push(registro);
        } else {
            throw new Error("El parámetro debe ser una instancia de la clase Registro");
        }
    }

    static async validateInput(ctx) {
        if (!ctx.request.body.nombre || !ctx.request.body.apellido || !ctx.request.body.email || !ctx.request.body.fechaNacimiento || !ctx.request.body.sexo || !ctx.request.body.telefono) {
            return false;
        }
        return true;
    }

    async createRelation(idNutricionista, idConsultante) {
        await prisma.nutricionista_consultante.create({
            data: {
                id_nutricionista: idNutricionista,
                id_consultante: idConsultante
            }
        });
    }

    //!Envio de datos a chefDigitales
    static async createNewConsultant(ctx) {

        if (!ctx.headers.authorization) {
            ctx.status = HTTP_STATUS_UNAUTHORIZED
            return
        }
        const [type, token] = ctx.headers.authorization.split(" ")
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const idNutricionista = data.sub
        const isValid = await this.validateInput(ctx);

        if (!isValid) {
            ctx.body = { error: 'Datos de entrada inválidos' }
            ctx.status = HTTP_STATUS_BAD_REQUEST
            return
        }

        try {

            //verifico la existencia del consultante en la DB
            //const consultante_existe = await prisma.consultante.findUnique({ where: { email: ctx.request.body.email } })
            //existe consultante? creo relacion de consultante y nutricionista

            //if (consultante_existe) { //Se quita para que cada nutricionista tenga su propia copia de consultante
            
                //verifico que tenga relacion con el nutricionista que está ingresando sus datos
                const res = await prisma.nutricionista_consultante.findUnique({
                    where: {
                        id_nutricionista_id_consultante: {
                            id_nutricionista: idNutricionista,
                            id_consultante: consultante_existe.id
                        }
                    }
                })
                //si existe ya la relacion ingreso al if y retorno error
                if (res) {
                    ctx.body = { mensaje: 'Ya está asociado ese email a su agenda.' }
                    ctx.status = HTTP_STATUS_FORBIDEN
                    return
                }
                console.log(consultante_existe);
                //en caso de que no existe relacion, genero una
                await prisma.nutricionista_consultante.create({
                    data: {
                        id_nutricionista: idNutricionista,
                        id_consultante: consultante_existe.id
                    }
                })
                ctx.body = { mensaje: 'Se agregó a su agenda de consultantes.' }
                ctx.status = HTTP_STATUS_CREATED
                //return
            //}

            //no existe consultante en la db? Lo agrego.
            const fechaNacimiento = new Date(ctx.request.body.fechaNacimiento)
            // En caso de que no exista el consultante en la DB
            const data_consultante = {
                nombre: ctx.request.body.nombre,
                apellido: ctx.request.body.apellido,
                email: ctx.request.body.email,
                fechaNacimiento,
                sexo: ctx.request.body.sexo,
                telefono: ctx.request.body.telefono
            }

            //creo el consultante en la DB
            const user = await prisma.consultante.create({ data: data_consultante })
            //verifico si creo el nuevo consultante
            if (!user) {
                ctx.body = { mensaje: 'No se pudo crear el nuevo consultante' }
                ctx.status = HTTP_STATUS_NOT_FOUND
                return
            }

            //asocio el consultante al nutricionista que lo creo
            await prisma.nutricionista_consultante.create({
                data: {
                    id_nutricionista: idNutricionista,
                    id_consultante: consultante_existe.id
                }
            })

            ctx.body = {
                mensaje: 'Se creo correctamente el registro de su nuevo consultante.'
            }
            ctx.status = HTTP_STATUS_CREATED
        } catch (error) {
            ctx.body = { error: 'Se generó error al procesar los datos.' }
            ctx.status = HTTP_STATUS_BAD_REQUEST
        }

    }

    // static async updateProfile(ctx) {

    //     if (!ctx.headers.authorization) {
    //       ctx.status = HTTP_STATUS_UNAUTHORIZED
    //       return
    //     }
    //     const [type, token] = ctx.headers.authorization.split(" ")
    //     const data = jwt.verify(token, process.env.JWT_SECRET)
    //     const userId = data.sub
    
    //     const nombre = ctx.request.body.nombre
    //     const apellido = ctx.request.body.apellido
    //     const email = ctx.request.body.email
    //     const telefono = ctx.request.body.telefono
    
    //     try {
    
    //       const id_pais = await stringToInt(ctx.request.body.pais)
    //       const id_especialidad = await stringToInt(ctx.request.body.especialidad)
    //       const anos_experiencia = await positiveValue(ctx.request.body.anos_experiencia)
    //       await validatePhone(telefono)
    
    //       let profileData = { nombre, apellido, email, telefono, anos_experiencia }
    //       const profile_countrie_data = { id_pais, ciudad: ctx.request.body.ciudad }
    //       //valido el telefono
    
    
    //       //si recibo contraseña: valido,hasheo y la seteo dentro de profileData
    //       if (ctx.request.body.password) {
    //         await validatePassword(ctx.request.body.password)
    //         //! hasheo la pass que el usuario ingresa / 10->round for hash encryption
    //         const hashPassword = await bcrypt.hash(ctx.request.body.password, 10)
    //         //parseo a int los valores que recibo del front
    //         profileData = { nombre, apellido, email, telefono, anos_experiencia, password: hashPassword }
    //       }
    
    
    //       const user = await prisma.nutricionista.update({
    //         where: { id: userId }, data: profileData,
    //         select: { id: true, nombre: true, apellido: true, email: true }
    //       })
    
    //       //invoco la funct aux updateRecord de params(NombreDeLaTabla,id,data) para que me haga las actualizaciones
    //       await updateRecord(prisma.nutricionista_pais, userId, profile_countrie_data)
    //       await updateRecord(prisma.nutricionista_especialidad, userId, { id_especialidad })
    
    //       const accesToken = jwt.sign({
    //         sub: user.id,
    //         nombre: user.nombre,
    //         apellido: user.apellido,
    //         email: user.email,
    //         expiresIn: Nutricionista.#set_expiration_time,
    //       }, process.env.JWT_SECRET)
    
    
    //       ctx.body = { user, accesToken }
    //       ctx.status = HTTP_STATUS_CREATED
    //     } catch (error) {
    
    //       if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
    //         ctx.body = { error: "No se encontro registro para actualizar" }
    //         ctx.status = HTTP_STATUS_NOT_FOUND
    //         return
    //       }
    
    //       console.error('Error al actualizar el perfil:', error);
    //       ctx.body = { error: 'Error al actualizar el perfil.' };
    //       ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR
    //     }
    //   }

    static async updateConsultant(ctx) {

    }


}