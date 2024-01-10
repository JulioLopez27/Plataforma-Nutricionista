


const registrarUsuario = async (datosUsuario) => {
    try {
      const respuesta = await fetch('http://localhost:3001/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosUsuario),
      });
  
      const resultado = await respuesta.json();
  
      // Maneja la respuesta según tus necesidades
      if (resultado.exitoso) {
        console.log('Usuario registrado exitosamente:', resultado.usuario);
      } else {
        console.error('Error en el registro:', resultado.mensaje);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  
  // Uso
  const datosUsuario = { nombre: 'Ejemplo', email: 'ejemplo@example.com' };
  registrarUsuario(datosUsuario);