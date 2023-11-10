estructura de la tabla y nombre


create database  testing;
use testing;

create table nutricionista(
email varchar(60) not null primary key,
contrasena varchar(80) not null,
username varchar(80) not null,
telefono varchar(80),
titulo_img_link varchar(200)
);


**Si tienen instalado el workbench de mysql, ejecutar el instalador, opcion "reconfigure" para mysql server, authentication method,
use legacy authentication method

OBS: se utiliza el paquete mysql2 para conectar a la base de datos por tema de compatibilidad en autenticación.