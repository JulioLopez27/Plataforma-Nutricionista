create table nutricionistas;

use nutricionistas;

# nvarchar para aceptar algun caracter especial.

create table Nutricionista(
id_nutricionista integer primary key not null,
email nvarchar(255) unique not null,
contrasena nvarchar(255) not null,
nombre nvarchar(255) not null,
apellido nvarchar(255) not null,
telefono nvarchar(255),
especialidad nvarchar(255) not null, 
anos_de_experiencia integer not null,
link_foto_diploma nvarchar(255) not null,
id_chef_digitales integer
);   

create table Consultante(
id_consultante integer primary key not null,
nombre nvarchar(255) not null,
edad integer not null,
peso decimal not null,
altura decimal not null
);

create table Receta(
id_receta int primary key not null,
nombre_receta nvarchar(255) not null,
instrucciones text not null,
propietario_nutricionista int not null,
Foreign key (propietario_nutricionista) references Nutricionista(id_nutricionista)
);

create table Ingrediente(
id_ingrediente integer primary key not null,
nombre_ingrediente nvarchar(255)
);

create table Afeccion(
id_afeccion int primary key not null,
nombre_afeccion nvarchar(255) unique
);

#maneja la relación muchos a muchos entre sus respectivas partes

create table Receta_Ingrediente(
id_receta integer not null,
id_ingrediente integer not null,
cantidad float not null,

foreign key (id_receta) references Receta(id_receta),
foreign key (id_ingrediente) references Ingrediente(id_ingrediente),
primary key (id_receta,id_ingrediente) 
);

create table Nutricionista_Consultante(
id_nutricionista int not null,
id_consultante int not null,

foreign key (id_nutricionista) references Nutricionista(id_nutricionista),
foreign key (id_consultante) references Consultante(id_consultante),
primary key(id_nutricionista,id_consultante) 
);

create table Consultantes_Receta(
id_consultante int not null,
id_receta int not null,

foreign key (id_consultante) references Consultante(id_consultante),
foreign key (id_receta) references Receta(id_receta),
primary key(id_consultante,id_receta)
);

create table Consultante_Afeccion(
id_consultante int,
id_afeccion int,

foreign key (id_consultante) references	Consultante(id_consultante),
foreign key (id_afeccion) references Afeccion(id_afeccion)
);

