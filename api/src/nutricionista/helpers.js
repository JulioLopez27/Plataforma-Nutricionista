import { prisma } from '../../prisma/index.js'
import bcrypt from 'bcrypt'


//------------Funcion usada en el login-------
// Función para autenticar al usuario
export async function authenticateUser(email, plainTextPassword) {
  // Buscamos al usuario en la base de datos
  const user = await prisma.nutricionista.findUnique({ where: { email } });

  // Si el usuario no existe, lanzamos un error
  if (!user) {
    throw new Error('Email no encontrado');
  }

  // Comprobamos si la contraseña proporcionada coincide con la del usuario
  const passwordMatch = await bcrypt.compare(plainTextPassword, user.password);

  // Si la contraseña no coincide, lanzamos un error
  if (!passwordMatch) {
    throw new Error('Contraseña incorrecta');
  }

  // Si todo va bien, devolvemos el usuario
  return user;
}


//---------------------------------------------------------------------------------------------------------------------------------

//FUNCIONES AUXILIARES PARA LA LOGICA DE REGISTRO


// Función para crear un nuevo usuario
export async function createUser(user_data) {
  try {
    const user = await prisma.nutricionista.create({ data: user_data })
    // Si no se pudo crear el usuario, lanzamos un error
    if (!user) {
      throw new Error('No se pudo registrar sus datos')
    }
    return user;
  } catch (error) {
    // Si el error es debido a un email duplicado, lanzamos un error específico
    if (error.code === 'P2002' && error.meta && error.meta.target) {
      const target = error.meta.target[0]
      if (target.includes('email')) {
        throw new Error('El email ya está registrado')
      }
    }
    // Para cualquier otro error, lanzamos un error genérico
    throw new Error('Error al crear su usuario, contacte con la empresa')
  }
}

//crea un registro en la tabla nutri_pais 
export async function createUserCountryData(id_nutricionista, id_pais, ciudad) {
  try {
    const user_country_data = await prisma.nutricionista_pais.create({ data: { id_nutricionista, id_pais, ciudad } });
    return user_country_data;
  } catch (error) {
    throw new Error('Error al crear los datos del país del nutricionista');
  }
}

//se encarga de crear un registro en la tabal nutri_especialidad
export async function createUserSpecialtyData(id_nutricionista, id_especialidad) {
  try {
    const user_specialty_data = await prisma.nutricionista_especialidad.create({ data: { id_nutricionista, id_especialidad } });
    return user_specialty_data;
  } catch (error) {
    throw new Error('Error al crear los datos de la especialidad del nutricionista');
  }
}

// Función para validar si un email ya existe en la base de datos
export async function validateEmail(email) {
  const exist_user = await prisma.nutricionista.findUnique({ where: { email } });
  // Si el usuario existe, lanzamos un error
  if (exist_user) {
    throw new Error('Email ya existe');
  }
}

// Función para validar la contraseña
export async function validatePassword(password) {
  // Comprueba si la contraseña tiene entre 6 y 12 caracteres
  if (password.length < 6 || password.length > 12) {
    throw new Error('La contraseña debe tener entre 6 y 12 caracteres');
  }

  // Comprueba si la contraseña contiene al menos un símbolo especial, un número y una mayúscula
  if (!/[!@#$%^&*(),.?":{}|<>]/g.test(password) || !/\d/g.test(password) || !/[A-Z]/g.test(password)) {
    throw new Error('La contraseña debe contener al menos un símbolo especial, un número y una mayúscula');
  }

  // Comprueba si la contraseña contiene espacios en blanco
  if (/\s/g.test(password)) {
    throw new Error('La contraseña no debe contener espacios en blanco');
  }
}


// Función para validar el teléfono
export async function validatePhone(phone) {
  // Comprueba si el teléfono tiene al menos 5 caracteres
  if (phone.length < 5) {
    throw new Error('El teléfono debe tener al menos 5 caracteres')
  }

  // Comprueba si el teléfono contiene letras o símbolos
  if (/[a-zA-Z!@#$%^&*(),.?":{}|<>]/g.test(phone)) {
    throw new Error('El teléfono no debe contener letras ni símbolos')
  }

  // Comprueba si el teléfono contiene espacios en blanco
  if (/\s/g.test(phone)) {
    throw new Error('El teléfono no debe contener espacios en blanco')
  }
}


// Función para convertir una cadena a un número entero
export async function stringToInt(str) {
  const num = parseInt(str, 10);
  // Si la conversión falla, lanzamos un error
  if (isNaN(num)) {
    throw new Error('Error al convertir la cadena a un número');
  }
  return num;
}

export async function positiveValue(str) {
  try {
    const num = await stringToInt(str)
    // Si el número es negativo, lanzamos un error
    if (num < 0) {
      throw new Error('Ingrese un numero positivo');
    } 
    return num
    
  } catch (error) {
    // Si hay un error, lo lanzamos
    throw error
  }
}