//conexión con la database
import Mysql from 'mysql2'

//exporto la conexion entre el servidor y la db para 
//cuando se cree la instancia del servidor ya ejecute este script
export const connection = Mysql.createConnection({
    host: "localhost",
    user: 'JulioLopez',
    password: '!Julio29329733',
    port: 3306,
    database: 'nutricionistas'
})



// connection.connect(function (err) {
//     if (err) throw err;
//     connection.query("Select * from nutricionista",  (err, result, field) => {
//         if (err) throw err
//         console.log(result);
//     })
// })
