import { Registro } from "./registro.js";
import { TipoDieta } from "./tipo_dieta.js";
import { Sugerencia } from "./sugerencia.js";


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



}