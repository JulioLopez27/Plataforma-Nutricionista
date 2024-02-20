// import { promise as fs } from 'fs'


import {
    prisma
} from '../../prisma/index.js'
import {
    HTTP_STATUS_OK,
    HTTP_STATUS_CREATED,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_UNAUTHORIZED,
    HTTP_STATUS_BAD_REQUEST,

} from '../HTTP_STATUS/index.js'

const DificultadReceta = {
    FACIL: "Fácil",
    MEDIO: "Medio",
    DIFICIL: "Difícil"
};
/*
const RecetaPara = {
    aGusto: "Fácil",
    atado: "Medio",
    barra: "Barra",
    baston: "Baston",
    bolsa: "Bolsa",
    bote: "Bote",
    botecito: "Botecito",
    botella: "Botella",
    cda: "c/da", 
    XXXXXX: "XXXXXX",``
};
*/
export class Receta {
    constructor(nombre, ingredientes, instrucciones, categorias) {
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.instrucciones = instrucciones;
        this.categorias = categorias; // Lista de objetos Categoria_Receta
        // Verificar que el tipo proporcionado esté en DificultadReceta
        if (Object.values(DificultadReceta).includes(dificultad)) {
            this.dificultad = dificultad;
        } else {
            throw new Error("Tipo de dificultad no válido");
        }
        this.tiempoElaboracion = tiempoElaboracion;
        this.ingredientes = [],
            this.pasos = []

    }

    agregarCategoria(categoria) {
        this.categorias.push(categoria);
    }



    static async getRecipes(ctx) {
        if (!ctx.headers.authorization) {
            ctx.status = HTTP_STATUS_UNAUTHORIZED
            return
        }
        const [type, token] = ctx.headers.authorization.split(" ")
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const userId = data.sub

        try {


            const recetas = await prisma.recipes.findMany({
                include: {
                    recipeimages: true  // Include de la relación con la tabla RecipeImages
                }
            })
            if (recetas.length === 0) {
                ctx.body = { mensaje: "No existe recetas." }
                ctx.status = HTTP_STATUS_BAD_REQUEST
            }

            ctx.body = recetas
            ctx.status = HTTP_STATUS_OK
        } catch (error) {
            ctx.body = { mensaje: "Error al obtener las recetas.", error }
        }
        ctx.status = HTTP_STATUS_INTERNAL_SERVER_ERROR
    }


    static async saveRecipe(ctx) {
      
        if (!ctx.headers.authorization) {
            ctx.status = HTTP_STATUS_UNAUTHORIZED
            return
        }
        const [type, token] = ctx.headers.authorization.split(" ")
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const userId = data.sub
     
        try {
            // Leer el archivo de imagen y convertirlo en un BLOB
            const imageBuffer = await fs.readFile(ctx.request.body.recipeImg)

            // Crear la receta en la base de datos
            const receta = await prisma.recipes.create({
                data: {
                    recipe_name: recipeData.recipe_name,
                    // Otros campos de la receta...
                    RecipeImages: {
                        create: {
                            image_data: imageBuffer
                        }
                    }
                },
                include: {
                    RecipeImages: true
                }
            });

            return receta;
        } catch (error) {
            console.error("Error al guardar la receta con imagen:", error);
            throw new Error("Error al guardar la receta con imagen");
        }
    }









}
