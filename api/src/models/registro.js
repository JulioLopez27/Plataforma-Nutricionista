const TipoRegistro = {
    INFORMEDESEGUMIENTO: "Informe de seguimiento",
    PLANNUTRICIONAL: "Plan Nutricional",

};

export class Registro {
    constructor(fecha, contenido, tipo, nutricionista) {
        this.fecha = fecha;
        this.contenido = contenido;
        this.enviado = enviado; //Boolean
        // Verificar que el tipo proporcionado esté en TipoRegistro
        if (Object.values(TipoRegistro).includes(tipo)) {
            this.tipo = tipo;
        } else {
            throw new Error("Tipo de registro no válido");
        }
        this.nutricionista = nutricionista;
        this.enviado = false; // Valor por defecto
    }

    setEnviado(enviado) {
        this.enviado = enviado;
    }
}