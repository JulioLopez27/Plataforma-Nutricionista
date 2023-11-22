#script para el alta del juego de pruebas

use nutricionistas;

-- Datos de prueba para la tabla Nutricionistas
INSERT INTO Nutricionista (id_nutricionista, email, contrasena, nombre, apellido, telefono, especialidad, anos_de_experiencia, link_foto_diploma, id_chef_digitales)
VALUES (1, 'nutri1@example.com', 'password1', 'Juan', 'Pérez', '1234567890', 'Nutrición deportiva', 10, 'link_a_la_foto1', 1),
       (2, 'nutri2@example.com', 'password2', 'María', 'González', '0987654321', 'Nutrición clínica', 15, 'link_a_la_foto2', 2),
       (3, 'nutri3@example.com', 'password3', 'Carlos', 'Rodríguez', '1122334455', 'Nutrición pediátrica', 8, 'link_a_la_foto3', 3),
       (4, 'nutri4@example.com', 'password4', 'Ana', 'Martínez', '2233445566', 'Nutrición geriátrica', 20, 'link_a_la_foto4', 4),
       (5, 'nutri5@example.com', 'password5', 'Pedro', 'García', '3344556677', 'Nutrición deportiva', 5, 'link_a_la_foto5', 5),
       (6, 'nutri6@example.com', 'password6', 'Laura', 'López', '4455667788', 'Nutrición clínica', 12, 'link_a_la_foto6', 6),
       (7, 'nutri7@example.com', 'password7', 'Javier', 'Hernández', '5566778899', 'Nutrición pediátrica', 7, 'link_a_la_foto7', 7),
       (8, 'nutri8@example.com', 'password8', 'Carmen', 'Morales', '6677889900', 'Nutrición geriátrica', 18, 'link_a_la_foto8', 8);

-- Datos de prueba para la tabla Consultantes
INSERT INTO Consultante (id_consultante, nombre, edad, peso, altura)
VALUES (1, 'Consultante1', 30, 70.5, 1.75),
       (2, 'Consultante2', 25, 65.5, 1.70),
       (3, 'Consultante3', 35, 75.5, 1.80),
       (4, 'Consultante4', 40, 80.5, 1.85),
       (5, 'Consultante5', 45, 85.5, 1.90),
       (6, 'Consultante6', 50, 90.5, 1.95),
       (7, 'Consultante7', 55, 95.5, 2.00),
       (8, 'Consultante8', 60, 100.5, 2.05);

-- Datos de prueba para la tabla Recetas
INSERT INTO Receta (id_receta,nombre_receta, instrucciones, propietario_nutricionista)
VALUES (1, 'Receta1', 'Instrucciones para la receta1', 1),
       (2, 'Receta2', 'Instrucciones para la receta2', 2),
       (3, 'Receta3', 'Instrucciones para la receta3', 3),
       (4, 'Receta4', 'Instrucciones para la receta4', 4),
       (5, 'Receta5', 'Instrucciones para la receta5', 5),
       (6, 'Receta6', 'Instrucciones para la receta6', 6),
       (7, 'Receta7', 'Instrucciones para la receta7', 7),
       (8, 'Receta8', 'Instrucciones para la receta8', 8);

-- Datos de prueba para la tabla Ingredientes
INSERT INTO Ingrediente (id_ingrediente, nombre_ingrediente)
VALUES (1, 'Ingrediente1'),
       (2, 'Ingrediente2'),
       (3, 'Ingrediente3'),
       (4, 'Ingrediente4'),
       (5, 'Ingrediente5'),
       (6, 'Ingrediente6'),
       (7, 'Ingrediente7'),
       (8, 'Ingrediente8');

-- Datos de prueba para la tabla Recetas_Ingredientes
INSERT INTO Receta_Ingrediente (id_receta, id_ingrediente, cantidad)
VALUES (1, 1, 100),
       (1, 2, 200),
       (2, 1, 150),
       (2, 2, 250),
       (3, 3, 300),
       (3, 4, 350),
       (4, 3, 400),
       (4, 4, 450),
       (5, 5, 500),
       (5, 6, 550),
       (6, 5, 600),
       (6, 6, 650),
       (7, 7, 700),
       (7, 8, 750),
       (8, 7, 800),
       (8, 8, 850);

-- Datos de prueba para la tabla Afecciones
INSERT INTO Afeccion (id_afeccion, nombre_afeccion)
VALUES (1, 'Afección1'),
       (2, 'Afección2'),
       (3, 'Afección3'),
       (4, 'Afección4'),
       (5, 'Afección5'),
       (6, 'Afección6'),
       (7, 'Afección7'),
       (8, 'Afección8');

-- Datos de prueba para la tabla Nutricionistas_Consultantes
INSERT INTO Nutricionista_Consultante (id_nutricionista, id_consultante)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (7, 7),
       (8, 8);

-- Datos de prueba para la tabla Consultantes_Recetas
INSERT INTO Consultante_Receta (id_consultante, id_receta)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (7, 7),
       (8, 8);

-- Datos de prueba para la tabla Consultantes_Afecciones
INSERT INTO Consultante_Afeccion (id_consultante, id_afeccion)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (7, 7),
       (8, 8);
       
       
       
       
       -- Este trigger ayudará a prevenir la inserción de datos no válidos en la tabla Consultantes_Recetas
       /*
       CREATE TRIGGER check_consultante_receta_before_insert
BEFORE INSERT ON Consultantes_Recetas
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Consultantes WHERE id_consultante = NEW.id_consultante) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El consultante no existe';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Recetas WHERE id_receta = NEW.id_receta) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La receta no existe';
    END IF;
END;
       
       
       
       */