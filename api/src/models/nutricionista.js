

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
        this.sugerencias = [];
    }

    agregarSugerencia(sugerencia) {
        this.sugerencias.push(sugerencia);
    }

}




