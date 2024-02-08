
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
}


