import { Consultante } from "./consultante";


export class Nutricionista {
    constructor(nombre, apellido, correo, tituloEscaneado, experiencia, telefono, contraseña, país, ciudad) {
        this.nombre = nombre;
        this.apellido = apellido;
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

    getConsultantes(){
        return this.consultantes;
    }

}




