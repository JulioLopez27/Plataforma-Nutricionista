import { Receta } from "./receta.js";


export class Sugerencia {
    constructor(etiqueta, enviada, fecha, nutricionista) {
        this.etiqueta = etiqueta;
        this.enviada = enviada; //Boolean
        this.fecha = fecha;
        this.recetas = [];

    }
    agregarReceta(receta) {
        // Verificar si el parámetro es una instancia de la clase Receta
        if (receta instanceof Receta) {
            this.recetas.push(receta);
        } else {
            throw new Error("El parámetro debe ser una instancia de la clase Receta");
        }

        
    }

}