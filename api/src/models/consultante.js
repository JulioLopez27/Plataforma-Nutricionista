export class Consultante {
    constructor(nombre, apellido, correo, telefono, sexo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.sexo = sexo;
        this.afeccion = null;
        this.anamnesis = null;
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

    

}