require('dotenv').config();
var mysql = require('mysql2');




// Crea una conexión a tu base de datos
var connection = mysql.createConnection({
  host     : 'localhost', //host predeterminado por mysql
  user     : process.env.DB_Username,  //nombre del usuario registrado en mysql workbench
  password : process.env.DB_Password, //password del usuario registrado en mysql workbench
  database : 'testing',     //nombre de la DB creada dentro de mysql workbench
  port     : 3306
});

// Conéctate a la base de datos
connection.connect(function(err) {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado con el identificador ' + connection.threadId);
});

// Define los datos que quieres enviar
//datos de prueba
const datos = { email: "test2@test", contrasena: "pass", username: "Cesar", telefono: "asdaos", titulo_img_link: "test" };

// Envía los datos a la base de datos
connection.query('INSERT INTO nutricionista SET ?', datos, function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

// Cierra la conexión
connection.end();