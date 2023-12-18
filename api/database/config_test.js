//conexión con la database
// import {config} from 'dotenv-safe'
// import { fileURLToPath } from 'url';
// import  {dirname} from 'path'
// import path from 'path'

import Mysql from 'mysql2'
//exporto la conexion entre el servidor y la db para 
//cuando se cree la instancia del servidor ya ejecute este script

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// config({
//   path:path.join(__dirname,'../.env.example')
// })

// export const connection = Mysql.createConnection({
//     host: process.env.LOCALHOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     port: process.env.PORT,
//     database: process.env.DATABASE
// })


// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });


    // connection.connect(function (err) {
    //     if (err) throw err;
       
    //     var sql = "INSERT INTO nutricionista (id_nutricionista,email,contrasena,nombre,apellido,telefono,anos_de_experiencia,link_foto_diploma,id_chef_digitales) VALUES ?";
    //     const values = [9,'nutri9@example.com','password1','Juan','Pérez','1234567890','Nutrición deportiva',10,'link_a_la_foto1',1,]
    //     connection.query(sql,[values], function (err, result) {
    //         if (err) throw err;
    //         console.log(result.affectedRows);
    //     });
    // });

// connection.connect(function (err) {
//     if (err) throw err;
//     connection.query("Select * from nutricionista",  (err, result, field) => {
//         if (err) throw err
//         console.log(result);
//     })
// })
