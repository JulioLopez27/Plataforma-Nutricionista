export class Sugerencia {
    constructor(etiqueta, enviada, fecha) {
        this.etiqueta = etiqueta;
        this.enviada = enviada; //Boolean
        this.fecha = fecha;
        this.recetas = [];

    }
    agregarReceta(receta) {
        this.recetas.push(receta);
    }

}