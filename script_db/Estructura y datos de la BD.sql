CREATE DATABASE  IF NOT EXISTS `nutricionistas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nutricionistas`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: nutricionistas
-- ------------------------------------------------------
-- Server version	8.0.34-commercial

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `afeccion`
--

DROP TABLE IF EXISTS `afeccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `afeccion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_consultante` int NOT NULL,
  `diabetes_tipo_1` tinyint(1) DEFAULT NULL,
  `diabetes_tipo_2` tinyint(1) DEFAULT NULL,
  `celiaquismo` tinyint(1) DEFAULT NULL,
  `hipertension` tinyint(1) DEFAULT NULL,
  `alergias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `enfermedad_renal` tinyint(1) DEFAULT NULL,
  `hipercolesterolemia` tinyint(1) DEFAULT NULL,
  `anemia` tinyint(1) DEFAULT NULL,
  `obesidad` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_consultante` (`id_consultante`),
  CONSTRAINT `afeccion_ibfk_1` FOREIGN KEY (`id_consultante`) REFERENCES `consultante` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `afeccion`
--

LOCK TABLES `afeccion` WRITE;
/*!40000 ALTER TABLE `afeccion` DISABLE KEYS */;
INSERT INTO `afeccion` VALUES (1,30,1,0,1,0,NULL,NULL,NULL,NULL,NULL,'2024-02-18 07:08:05','2024-02-18 07:08:05'),(2,31,0,0,0,1,NULL,NULL,NULL,NULL,1,'2024-02-18 07:08:05','2024-02-18 07:08:05'),(3,32,0,0,0,0,'Alergias a los mariscos',NULL,NULL,NULL,NULL,'2024-02-18 07:08:05','2024-02-18 07:08:05'),(4,33,0,0,0,0,NULL,1,1,NULL,NULL,'2024-02-18 07:08:05','2024-02-18 07:08:05'),(5,34,0,0,0,0,NULL,NULL,NULL,1,NULL,'2024-02-18 07:08:05','2024-02-18 07:08:05'),(6,35,0,1,0,1,NULL,NULL,NULL,NULL,NULL,'2024-02-18 07:08:05','2024-02-18 07:08:05'),(7,36,0,0,0,0,'Alergias al polen',NULL,NULL,NULL,NULL,'2024-02-18 07:08:05','2024-02-18 07:08:05'),(8,37,0,0,0,1,NULL,NULL,NULL,NULL,1,'2024-02-18 07:08:05','2024-02-18 07:08:05'),(9,38,0,0,1,0,NULL,NULL,NULL,NULL,NULL,'2024-02-18 07:08:05','2024-02-18 07:08:05'),(10,39,0,0,0,0,NULL,NULL,1,1,NULL,'2024-02-18 07:08:05','2024-02-18 07:08:05');
/*!40000 ALTER TABLE `afeccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anamnesis`
--

DROP TABLE IF EXISTS `anamnesis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anamnesis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_consultante` int NOT NULL,
  `fecha` date NOT NULL,
  `peso` decimal(5,2) NOT NULL,
  `altura` decimal(3,2) NOT NULL,
  `constitucion_corporal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `historia_alimenticia` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `horarios_alimenticios` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `deficits_nutricionales` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `objetivos_clinicos` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_consultante` (`id_consultante`),
  CONSTRAINT `anamnesis_ibfk_1` FOREIGN KEY (`id_consultante`) REFERENCES `consultante` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anamnesis`
--

LOCK TABLES `anamnesis` WRITE;
/*!40000 ALTER TABLE `anamnesis` DISABLE KEYS */;
INSERT INTO `anamnesis` VALUES (1,30,'2024-02-18',68.50,1.70,NULL,'Historia alimenticia variada','Horarios alimenticios regulares','Ninguno','Perder peso','2024-02-18 07:08:10','2024-02-18 07:08:10'),(2,31,'2024-02-18',72.30,1.65,NULL,'Historia alimenticia vegana','Horarios alimenticios flexibles','Vitamina B12','Mantener peso','2024-02-18 07:08:10','2024-02-18 07:08:10'),(3,32,'2024-02-18',65.80,1.75,NULL,'Historia alimenticia pescetariana','Horarios alimenticios regulares','Omega-3','Mejorar salud cardiovascular','2024-02-18 07:08:10','2024-02-18 07:08:10'),(4,33,'2024-02-18',75.00,1.80,NULL,'Historia alimenticia crudivegana','Horarios alimenticios regulares','Vitamina D','Aumentar energía','2024-02-18 07:08:10','2024-02-18 07:08:10'),(5,34,'2024-02-18',80.10,1.68,NULL,'Historia alimenticia variada','Horarios alimenticios irregulares','Hierro','Mejorar salud general','2024-02-18 07:08:10','2024-02-18 07:08:10'),(6,35,'2024-02-18',70.00,1.72,NULL,'Historia alimenticia vegetariana','Horarios alimenticios regulares','Vitamina B12','Mejorar estado de ánimo','2024-02-18 07:08:10','2024-02-18 07:08:10'),(7,36,'2024-02-18',68.20,1.68,NULL,'Historia alimenticia pescetariana','Horarios alimenticios flexibles','Omega-3','Mejorar salud cardiovascular','2024-02-18 07:08:10','2024-02-18 07:08:10'),(8,37,'2024-02-18',75.60,1.70,NULL,'Historia alimenticia vegana','Horarios alimenticios irregulares','Vitamina B12','Mantener peso','2024-02-18 07:08:10','2024-02-18 07:08:10'),(9,38,'2024-02-18',69.30,1.75,NULL,'Historia alimenticia crudivegana','Horarios alimenticios regulares','Vitamina D','Aumentar energía','2024-02-18 07:08:10','2024-02-18 07:08:10'),(10,39,'2024-02-18',78.90,1.65,NULL,'Historia alimenticia variada','Horarios alimenticios flexibles','Hierro','Mejorar salud general','2024-02-18 07:08:10','2024-02-18 07:08:10');
/*!40000 ALTER TABLE `anamnesis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultante`
--

DROP TABLE IF EXISTS `consultante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultante` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `sexo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_nutricionista` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultante`
--

LOCK TABLES `consultante` WRITE;
/*!40000 ALTER TABLE `consultante` DISABLE KEYS */;
INSERT INTO `consultante` VALUES (30,'Juan','Pérez','juan.perez@example.com','1990-01-01','Masculino','123456789','2024-02-18 06:48:36','2024-02-18 06:48:36',101),(31,'María','González','maria.gonzalez@example.com','1991-02-02','Femenino','987654321','2024-02-18 06:48:36','2024-02-18 06:48:36',101),(32,'Luis','Martínez','luis.martinez@example.com','1992-03-03','Masculino','555555555','2024-02-18 06:48:36','2024-02-18 06:48:36',101),(33,'Ana','Rodríguez','ana.rodriguez@example.com','1993-04-04','Femenino','666666666','2024-02-18 06:48:36','2024-02-18 06:48:36',101),(34,'Carlos','López','carlos.lopez@example.com','1994-05-05','Masculino','777777777','2024-02-18 06:48:36','2024-02-18 06:48:36',101),(35,'Sofía','Hernández','sofia.hernandez@example.com','1995-06-06','Femenino','888888888','2024-02-18 06:48:36','2024-02-18 06:48:36',101),(36,'Diego','Díaz','diego.diaz@example.com','1996-07-07','Masculino','999999999','2024-02-18 06:48:36','2024-02-18 06:48:36',101),(37,'Laura','Sánchez','laura.sanchez@example.com','1997-08-08','Femenino','101010101','2024-02-18 06:48:36','2024-02-18 06:48:36',101),(38,'Pablo','Romero','pablo.romero@example.com','1998-09-09','Masculino','202020202','2024-02-18 06:48:36','2024-02-18 06:48:36',101),(39,'Elena','Fernández','elena.fernandez@example.com','1999-10-10','Femenino','303030303','2024-02-18 06:48:36','2024-02-18 06:48:36',101);
/*!40000 ALTER TABLE `consultante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,'Nutricionista Clínico','2024-02-12 03:54:49','2024-02-12 03:54:49'),(2,'Dietista Registrado','2024-02-12 03:54:49','2024-02-12 03:54:49'),(3,'Nutricionista Deportivo','2024-02-12 03:54:49','2024-02-12 03:54:49'),(4,'Nutricionista Pediátrico','2024-02-12 03:54:49','2024-02-12 03:54:49'),(5,'Nutricionista Geriátrico','2024-02-12 03:54:49','2024-02-12 03:54:49'),(6,'Nutricionista Comunitario','2024-02-12 03:54:49','2024-02-12 03:54:49'),(7,'Nutricionista de Salud Pública','2024-02-12 03:54:49','2024-02-12 03:54:49'),(8,'Nutricionista de Cuidados Intensivos','2024-02-12 03:54:49','2024-02-12 03:54:49'),(9,'Nutricionista en el Ámbito Empresarial','2024-02-12 03:54:49','2024-02-12 03:54:49'),(10,'Nutricionista en Investigación Alimentaria','2024-02-12 03:54:49','2024-02-12 03:54:49'),(11,'Nutricionista en Obesidad y Pérdida de Peso','2024-02-12 03:54:49','2024-02-12 03:54:49'),(12,'Nutricionista en el Ámbito de la Diabetes','2024-02-12 03:54:49','2024-02-12 03:54:49'),(13,'Nutricionista en el Ámbito Cardiovascular','2024-02-12 03:54:49','2024-02-12 03:54:49'),(14,'Nutricionista en el Ámbito Renal','2024-02-12 03:54:49','2024-02-12 03:54:49'),(15,'Nutricionista en el Ámbito Oncológico','2024-02-12 03:54:49','2024-02-12 03:54:49'),(16,'Nutricionista en el Ámbito Gastrointestinal','2024-02-12 03:54:49','2024-02-12 03:54:49'),(17,'Nutricionista en el Ámbito Neurogastroenterológico','2024-02-12 03:54:49','2024-02-12 03:54:49'),(18,'Nutricionista en el Ámbito Neurológico','2024-02-12 03:54:49','2024-02-12 03:54:49'),(19,'Nutricionista en el Ámbito Psicológico y del Comportamiento Alimentario','2024-02-12 03:54:49','2024-02-12 03:54:49');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingrediente`
--

DROP TABLE IF EXISTS `ingrediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingrediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingrediente`
--

LOCK TABLES `ingrediente` WRITE;
/*!40000 ALTER TABLE `ingrediente` DISABLE KEYS */;
INSERT INTO `ingrediente` VALUES (1,'Ingrediente1','2024-01-02 20:35:32','2024-01-02 20:35:32'),(2,'Ingrediente2','2024-01-02 20:35:32','2024-01-02 20:35:32'),(3,'Ingrediente3','2024-01-02 20:35:32','2024-01-02 20:35:32'),(4,'Ingrediente4','2024-01-02 20:35:32','2024-01-02 20:35:32'),(5,'Ingrediente5','2024-01-02 20:35:32','2024-01-02 20:35:32'),(6,'Ingrediente6','2024-01-02 20:35:32','2024-01-02 20:35:32'),(7,'Ingrediente7','2024-01-02 20:35:32','2024-01-02 20:35:32'),(8,'Ingrediente8','2024-01-02 20:35:32','2024-01-02 20:35:32');
/*!40000 ALTER TABLE `ingrediente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutricionista`
--

DROP TABLE IF EXISTS `nutricionista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutricionista` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `anos_experiencia` int NOT NULL,
  `foto_diploma` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_chefDigitales` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activo` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutricionista`
--

LOCK TABLES `nutricionista` WRITE;
/*!40000 ALTER TABLE `nutricionista` DISABLE KEYS */;
INSERT INTO `nutricionista` VALUES (1,'nutri1@example.com','password1','Juan','Pérez','1234567890',10,'empty','1','2024-01-02 20:35:32','2024-01-13 15:28:28',0),(2,'nutri2@example.com','password2','María','González','0987654321',15,'empty','2','2024-01-02 20:35:32','2024-01-13 15:28:28',0),(3,'nutri3@example.com','password3','Carlos','Rodríguez','1122334455',8,'empty','3','2024-01-02 20:35:32','2024-01-13 15:28:28',0),(4,'nutri4@example.com','password4','Ana','Martínez','2233445566',20,'empty','4','2024-01-02 20:35:32','2024-01-13 15:28:28',0),(5,'nutri5@example.com','password5','Pedro','García','3344556677',5,'empty','5','2024-01-02 20:35:32','2024-01-13 15:28:28',0),(6,'nutri6@example.com','password6','Laura','López','4455667788',12,'empty','6','2024-01-02 20:35:32','2024-01-13 15:28:28',0),(7,'nutri7@example.com','password7','Javier','Hernández','5566778899',3,'empty','7','2024-01-02 20:35:32','2024-01-13 15:28:28',0),(8,'nutri8@example.com','password8','Carmen','Morales','6677889900',1,'empty','8','2024-01-02 20:35:32','2024-01-13 15:28:28',0),(9,'test@test2','$2b$10$tz8hPCfYPdiEhpeF.V4.TOer1z27EvPUWSI3Hs/dxnHHVpGM/6ZIS','test1','test1','498498494',5,'empty','5','2024-01-04 23:18:14','2024-01-13 15:28:28',0),(10,'test@test3','$2b$10$iTc/kr8QbyknvH0qM8sD2OiMI9m7LRAZ.vtTODgnb716VNXOmGb72','test1','test1','498498494',5,'empty','5','2024-01-04 23:18:38','2024-01-13 15:28:28',0),(11,'test@test4','$2b$10$IJSmzeSi39ksBLgUWz2Niu4KCBkd/LU8JPtGIbo5fcBrcgm/8oQMy','test1','test1','498498494',5,'empty','5','2024-01-04 23:24:50','2024-01-13 15:28:28',0),(12,'test@test5','$2b$10$KVBAlhPwPqJrPTRYjvixOOwxCXR44S8xnTGmUmdBxikCdGt3hcjBe','test5','test5','498498494',5,'empty','5','2024-01-05 02:46:30','2024-01-13 15:28:28',0),(13,'test@test6','$2b$10$gvPLpQkQz/Uvugb5/8XJIuOXh89XSP0FQ/zz9HXjOvdszEMoTpCtS','test5','test5','498498494',5,'empty','5','2024-01-06 01:51:51','2024-02-19 04:56:11',0),(14,'test@test7','$2b$10$WzClpE4ADM95w7m5XOjUCul9PNI1009JIUC2wkJXbXdjPoMSv.MkO','test5','test5','498498494',1,'empty',NULL,'2024-01-06 03:58:00','2024-02-19 05:00:20',0),(15,'test@test8','$2b$10$O/SX0B6x0ynULKoBFKZVYOAobCDlJxbB/AiSfGfCfiVRhSE4iiaFe','test5','test5','498498494',1,'empty',NULL,'2024-01-06 03:58:43','2024-02-19 05:35:02',0),(16,'test@test10','$2b$10$mWbOgBcmv/kmU9pPZhCxCOel2mBRUm6agT4M1014Nfp6IMO3QEQjK','test5','test5','498498494',1,'empty','1','2024-01-06 03:59:54','2024-01-13 15:28:28',0),(17,'test@test11','$2b$10$rKvyfnSAMfr88/uvgHhpPO.sRqPTnrw.hI4a9wCTdWu2GJHQ68S2G','test5','test5','498498494',-2,'empty',NULL,'2024-01-06 04:07:56','2024-01-13 15:28:28',0),(18,'test@test12','$2b$10$x7D7SceEdksmni/D.22Une4jzNCeIOo.739Z1xLQQRPqdzub/kT4S','test5','test5','498498494',1,'empty',NULL,'2024-01-06 04:57:13','2024-01-13 15:28:28',0),(19,'test@test13','$2b$10$mTxp9a6gXxjP29.tLA7PzejDZc83jlLrQ8Chq3k2WWPRFKgeWXX3y','test5','test5','498498494',1,'empty','0','2024-01-06 04:58:13','2024-01-13 15:28:28',0),(20,'test@test14','$2b$10$69esh2ZjK73.aSmECjZLR.sFhzx13.b4UGmEoJj9Us7AtXaGk/bva','test5','test5','498498494',1,'empty','4','2024-01-06 04:58:41','2024-01-13 15:28:28',0),(21,'jl@hotmail.com','$2b$10$3OOC7MuQMowRONPtCwvT3.s0wIKzsFL1UHocIl9paf8ywjQ9KZVpG','Julio','Lopez',NULL,1,'empty','0','2024-01-06 11:40:59','2024-01-13 15:28:28',0),(22,'test@test15','$2b$10$imQstNLO4GcgbW3rMMqQq.rYTnGvkwuAnMOteDki9/FDkLPQMISkq','test5','test5','498498494',1,'empty','4','2024-01-07 01:12:13','2024-01-13 15:28:28',0),(23,'test@test16','$2b$10$bcyD2xSC4BqO.PaVoC5Xc.dJWDFo/zCnYwpC6NKuBKKK1t7HRDeAG','test5','test5','498498494',1,'empty','4','2024-01-07 01:20:06','2024-01-13 15:28:28',0),(25,'test@test17','$2b$10$ACkHDAnEKgYXiEAQosKVaOFXcNvXso44YBb8djwLEtHkSG7u5aOm6','test5','test5','498498494',1,'empty','0','2024-01-11 03:47:28','2024-01-13 15:28:28',0),(26,'test@test18','$2b$10$3AUp1c8oE8p/QsMbWDJWFe2ScxLuWvr7YSW8iXyW882ImdreSjU0y','test18','test18','498498494',1,'empty','0','2024-01-11 10:04:23','2024-01-13 15:28:28',0),(27,'julioneo951@hotmail.com','$2b$10$kXrfPiuA6XxTgGqguw1AXuUNS8.WFCM/hOJx5.2Z8LEX81ylsh.3i','Julio1','Lopez1','098511142',0,'empty','0','2024-01-11 10:04:46','2024-01-13 15:28:28',0),(28,'test@test19','$2b$10$lrqQThtoxr9z2pPRrq1uz.QPqq2KbhCoJ0V8xAwg7hEXhTVlIrpE.','test19','test19','498498494',1,'empty','0','2024-01-11 10:10:52','2024-02-18 06:00:11',1),(29,'test@test20','$2b$10$FwwgrOAAGw03EiRcxvUvLeRFvy9ez7ZIY0NRKOTF2djeVRc8lPFBm','test19','test19','498498494',1,'empty','0','2024-01-11 10:16:00','2024-02-19 07:23:25',1),(30,'test@test21','$2b$10$ZBhaxyZcUIV65.1KcAuRce.BrZWJlpgQZEXw.yhiVMp9vOh0JeAV.','test19','test19','498498494',1,'empty','0','2024-01-11 10:16:42','2024-02-19 07:23:59',0),(31,'test@test22 ','$2b$10$UElwJflOKRWVAnRDnpw7K.N.2wdHF7G1aQKwOkpJ5kdU.8vfeX6.C','test19','test19','498498494',1,'empty','0','2024-01-11 10:22:00','2024-02-19 05:14:17',1),(32,'test@test23','$2b$10$F57cOPIVIgztUVjebuh5s.giZdsgXLtg6vpIkj6fC/qMXOQmC3zNK','test19','test19','498498494',1,'empty','0','2024-01-11 10:24:10','2024-01-13 15:28:28',0),(33,'test@test24','$2b$10$6hO0nsVRQufY5u61IRdOy.6UTKXxuZSIWvY3LqmyaoGfulrZS4Bk.','test19','test19','498498494',1,'empty','0','2024-01-11 10:24:59','2024-01-13 15:28:28',0),(34,'test@test25','$2b$10$0Dm2PKtGKiBbqy1hoRtfcejvIbdG0NfPSRwZDop1GBOMiDdpMepI2','test19','test19','498498494',1,'empty','0','2024-01-11 10:25:22','2024-01-13 15:28:28',0),(35,'test@test26','$2b$10$0c1j8Er/9KJbn.sWGVC.weHIGZ8PMyjOB8SuSnmomOzrQ70fuCHiK','test19','test19','498498494',1,'empty','0','2024-01-11 10:27:14','2024-01-13 15:28:28',0),(36,'test@test27','$2b$10$uaBxrzsQIcfE.tucT5heE.BemET.Jyx.AT28mbCUETtIRklVzrG8.','test19','test19','498498494',1,'empty','0','2024-01-11 10:27:38','2024-01-13 15:28:28',0),(37,'test@test28','$2b$10$EqTL9s/x/Jt76nl0sHiCAObAlHcsza0DAMBUSlktkspXCfnyMEjOG','test19','test19','498498494',1,'empty','0','2024-01-11 10:29:33','2024-01-13 15:28:28',0),(38,'test@test29','$2b$10$44nZ6sR3KoBiXJklXhF/8uzt1Z//7TwPI7CgU.IUwg0T8jyZrU/ea','test19','test19','498498494',1,'empty','0','2024-01-11 10:30:40','2024-01-13 15:28:28',0),(39,'test@test30','$2b$10$V1V1ACRWL5sj25mLxFGrcuCI.vWQx.Tb5/mZacslVrwPDvYoO7g0K','test19','test19','498498494',1,'empty','0','2024-01-11 10:31:54','2024-01-13 15:28:28',0),(40,'test@test31','$2b$10$dfgwCwz.mTCMlzlMGyQJxeYrqUbZuXY5p5J/n1bXs2SQuHwtKiHSa','test19','test19','498498494',1,'empty','0','2024-01-11 10:32:30','2024-01-13 15:28:28',0),(41,'test@test32','$2b$10$cyt91hOMvDZTPyrLXGpoq./7y33ooTQgeptGxZEcGSPn/yj0X/Tsi','test19','test19','498498494',1,'empty','0','2024-01-11 10:33:08','2024-01-13 15:28:28',0),(42,'test@test33','$2b$10$pA1ygPDxZI8xEhZ/1uFROeEo3tyAUelEPdxzI5RmpQonmhP6VnlEe','test19','test19','498498494',1,'empty','0','2024-01-11 10:34:39','2024-01-13 15:28:28',0),(43,'test@test34','$2b$10$R0Wc8fQ8bHM//6TY8amzvedEQ08mKd/oZTkxlIMbsBxhm4xnuQ7lq','test19','test19','498498494',1,'empty','0','2024-01-11 10:36:35','2024-01-13 15:28:28',0),(44,'test@test35','$2b$10$tIhgLQGNlazmEPTpgy4HmeO7SMTK7uFam.A30MfIVaNM3kRq5c1Xe','test19','test19','498498494',1,'empty','0','2024-01-11 10:37:01','2024-01-13 15:28:28',0),(45,'test@test36','$2b$10$H./RuVfxxzwZgKopUhzlB.A.U/URH6welOUiC1LEDF8Ny0dYhWCsq','test19','test19','498498494',1,'empty','0','2024-01-11 10:38:48','2024-01-13 15:28:28',0),(46,'test@test37','$2b$10$KMahWHQL9.GVDfjBPOzGqO0aZHvyePf.aOencVZuCOvVvjKC8TUN.','test19','test19','498498494',1,'empty','0','2024-01-11 10:40:02','2024-01-13 15:28:28',0),(47,'test@test38','$2b$10$xS6vH4xWPPT5baP.92wKMO5vyBIUT.9yUMG2K4wDHpa.0SzMPpwty','test19','test19','498498494',1,'empty','0','2024-01-11 10:41:49','2024-01-13 15:28:28',0),(48,'test@test39','$2b$10$nZ5QXDC6mpgeUDBi8Srh9OB7ETz7MvG1LiY.AgYJu0zeTwwZv2Hze','test19','test19','498498494',1,'empty','0','2024-01-11 10:44:45','2024-01-13 15:28:28',0),(49,'test@test40','$2b$10$8gx0cDxaaX.MISNeH.Ckxu.CSIkQhPvG0nCEXG2hVv1M7pcf3/W8y','test19','test19','498498494',1,'empty','0','2024-01-11 10:45:20','2024-01-13 15:28:28',0),(50,'test@test41','$2b$10$xdrdUk.yC3DgfTtdcZCRrO6kHY0ckxcDnHpDJgXcep42jD2kJRBv6','test19','test19','498498494',1,'empty','0','2024-01-11 10:51:47','2024-01-13 15:28:28',0),(51,'test@test42','$2b$10$7IRCv0YV8u6JjRLiohTw/.ZnDUjaEY7f2B8FK1xwetesQVRYGt0cW','test19','test19','498498494',1,'empty','0','2024-01-11 10:52:23','2024-01-13 15:28:28',0),(52,'test@test43','$2b$10$jRKg32OozglT0guTJdJumeOsRiCI0RClLUxOGjgKskCOIgy1z8Vfi','test19','test19','498498494',1,'empty','0','2024-01-11 10:53:00','2024-01-13 15:28:28',0),(53,'test@test44','$2b$10$hk4vDpcMCaiGdQL/NwkWG.tRkS35Ppj/Jt2Axef5weghY8j20EaSW','test19','test19','498498494',1,'empty','0','2024-01-11 10:58:17','2024-01-13 15:28:28',0),(54,'test@test45','$2b$10$J/3NCf1zVqXsCJZUXa/p6OvtjK/NXC7JTrdrp5hlgfAXAj9FOV2wi','test19','test19','498498494',1,'empty','0','2024-01-11 10:59:05','2024-01-13 15:28:28',0),(55,'test@test46','$2b$10$t0KbG5.A8vvoN67ZxrMdnuhtdRw2V5f6xSxbpe5HUhI6oNTBe6Vfm','test19','test19','498498494',1,'empty','0','2024-01-11 11:00:21','2024-01-13 15:28:28',0),(56,'test@test47','$2b$10$bNlWEK7VA9N.H9bron6sAOBopxuHQNbzp4hNL0eJeDRIE7nQhW23i','test19','test19','498498494',1,'empty','0','2024-01-11 11:01:02','2024-01-13 15:28:28',0),(57,'test@test48','$2b$10$CBFfHCh.p2e4MpI9DGr/U..TQ7rZLxBEH5sKJzHDHhvSAxVl627XO','test19','test19','498498494',1,'empty','0','2024-01-11 11:03:35','2024-01-13 15:28:28',0),(58,'test@test51','$2b$10$Ns6LuWiTQDfK9wKDfZGv/eDjYG95dmwDuV.bYjsbDyQp9p317Z50e','test19','test19','498498494',1,'empty','idChefDigitales','2024-01-11 11:07:20','2024-02-20 21:26:27',1),(59,'test@test52','$2b$10$v.D5vndeKtzjhk./ZjUnpOJM7UdfZZ/s33DvtqUeetvfZZjXRDeWm','test19','test19','498498494',1,'empty','0','2024-01-11 11:08:43','2024-01-13 15:28:28',0),(60,'test@test53','$2b$10$4igdJ1EfgV27A671Ez9sjOKg0ZuyBOCrHQuIUCA8kGbo9JxRcNHue','test19','test19','498498494',1,'empty','0','2024-01-11 11:10:06','2024-01-13 15:28:28',0),(61,'test@test54','$2b$10$WaNJzov/N0kOC9mEhtTO6On17CvCKj0xVdzHgXJU5I6TB/6/q8Aym','test19','test19','498498494',1,'empty','0','2024-01-11 11:12:43','2024-01-13 15:28:28',0),(62,'test@test55','$2b$10$YCAfKfY3G3Vxofg0xRO4r.eMlTDwcZBKzmcP1tGDGKWHWHtoNQi76','test19','test19','498498494',1,'empty','0','2024-01-11 11:13:18','2024-02-20 21:34:05',1),(63,'test@test56','$2b$10$6ZKfmWnt7O2eCLrJtwCD3eSGMi1JAowgZIsT.6wOfVznLwQleaOma','test19','test19','498498494',1,'empty','0','2024-01-11 11:14:14','2024-02-20 21:34:38',1),(64,'test@test57','$2b$10$L91hLXpfTfsM1q5mVlSh8eK8We7mW4ozPpUxbPa7jIZVpHnwl3DkK','test19','test19','498498494',1,'empty','hola','2024-01-11 11:17:24','2024-02-20 21:35:07',1),(65,'test@test58','$2b$10$Kojr.lXOltmVjcZUToiqwOx3nhaPQXSHOsqa5zlBUJY/ZomCF8QAC','test19','test19','498498494',1,'empty','0','2024-01-11 11:20:31','2024-01-13 15:28:28',0),(66,'test@test59','$2b$10$Fn8TrlRdbwZEoqzMy0FdPu8kOATIU1ezatp7c2BzS9BIb8OrEEcd.','test19','test19','498498494',1,'empty','0','2024-01-11 11:21:32','2024-01-13 15:28:28',0),(67,'test@test60','$2b$10$kdXKZuInFHJ/ULvAxfV1h.PeCPPgD/zCzjm/j2dRuuM2Y0coGxXAm','test19','test19','498498494',1,'empty','0','2024-01-11 11:22:55','2024-01-13 15:28:28',0),(68,'test@test61','$2b$10$YtjEUi38.xmRQV8E6aLOpOvLrq6utQ5TUSgjW1aQS9Ay.gwSH2w1C','test19','test19','498498494',1,'empty','0','2024-01-11 11:24:36','2024-01-13 15:28:28',0),(69,'test@test62','$2b$10$VgHg6sHEoT4rM5iFmt6hg.9A/.PpMegD5vVNTBDnhYG8yhKLMbPGG','test19','test19','498498494',1,'empty','0','2024-01-11 11:25:28','2024-01-13 15:28:28',0),(70,'test@test63','$2b$10$zagyI811QoJHDFr0QsC25e78UsT4Mk8RJNE7VWIJk3uDXXPINlPOK','test19','test19','498498494',1,'empty','0','2024-01-11 11:30:18','2024-01-13 15:28:28',0),(71,'test@test64','$2b$10$x66Z6TdJguGVN03ZkpHwZekBTIAZKe11CNVCZPtq.yUkaa.pd.RuS','test19','test19','498498494',1,'empty','0','2024-01-11 11:30:29','2024-01-13 15:28:28',0),(72,'test@test65','$2b$10$9Fvn6SxCIHiQncrhMUeob.a.UdgzOtT7gLleoTaf5IcdeLYQfnE5O','test19','test19','498498494',1,'empty','0','2024-01-11 11:35:55','2024-01-13 15:28:28',0),(73,'test@test66','$2b$10$clE3VJAukIwD8gDtvQ2blO0169mBM.NE8S1eBtLFptjwbEK5flrlO','test19','test19','498498494',1,'empty','0','2024-01-11 11:37:00','2024-01-13 15:28:28',0),(74,'test@test67','$2b$10$bnsScFQ1ThmzmzdAy7DPe.7RjtE8uAoSfkj5pjEtFnfHL0VgXQE7y','test19','test19','498498494',1,'empty','0','2024-01-11 11:37:19','2024-01-13 15:28:28',0),(75,'test@test68','$2b$10$MHRX0fJxtE7RTXvWEEWf3uEvi3Nyqj1J0uuks92n1Oh52PfWvSS3G','test19','test19','498498494',1,'empty','0','2024-01-11 11:38:18','2024-01-13 15:28:28',0),(76,'julioneo952@hotmail.com','$2b$10$OGyJ8wn1MiDKwyVwxA4sXuQUKWUeVQRcIMDTADsQIpM1PLeDA/mBe','Julio2','Lopez','098511142',1,'empty','0','2024-01-11 11:41:41','2024-01-13 15:28:28',0),(77,'test@test69','$2b$10$BJYuDW6.B81aSG3tGL.vouqNTJVqndFLgW79oaxv6sdfG5IIh7.Ki','test19','test19','498498494',1,'empty','0','2024-01-11 11:48:10','2024-01-13 15:28:28',0),(78,'test@test70','$2b$10$.mAyhx3OL5SP.7TZYh/UQe7Tfdejl9r9Fe3zBazDVzpYRzvDciV5K','test19','test19','498498494',1,'empty','0','2024-01-11 11:50:41','2024-01-13 15:28:28',0),(79,'julioneo953@hotmail.com','$2b$10$RFXMQ5HN.6BJw/Ue6fATeOH9NHMregeUXSLRYo7.Y/vD/PxTLlKWm','Julio','Lopez','098511142',1,NULL,'0','2024-01-17 10:14:30','2024-01-17 10:14:30',0),(80,'julioneo954@hotmail.com','$2b$10$hmdPj//cqEnL.1os9KnvFOvq8TfUq6rogMBk2zoBQbqBD4UsgJTrK','Julio','Lopez','098511142',1,NULL,'0','2024-01-17 10:19:17','2024-01-17 10:19:17',0),(81,'julioneo955@hotmail.com','$2b$10$6Vs2uNWhsU6HxhYSmLy6neKgEBMzkoDjNTp/aJRpQfZPA7NeCmpBS','Julio','Lopez','098511142',1,NULL,'0','2024-01-17 10:25:22','2024-01-17 10:25:22',0),(82,'julioneo956@hotmail.com','$2b$10$HCn8RiGfO6IpSFSvHjlyi.YSO7Puqg.9f8rxbu5dovtBz4TVK6ba.','Julio','Lopez','098511142',1,NULL,'0','2024-01-17 10:32:48','2024-01-17 10:32:48',0),(83,'julioneo958@hotmail.com','$2b$10$jJ7O8ALtSjWzaFEA9SS72O.7MEzV.Pc4EOuv.NX1bN9/1.B07qqmq','Julio','Lopez','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\137377558df0ded9125721100','0','2024-01-17 10:42:54','2024-01-17 10:42:54',0),(84,'julioneo959@hotmail.com','$2b$10$LE8RYwq22Nb8due0TICBB.vtsrT88rahyRkvnBCDG/pkCn6iY4jdW','Julio','Lopez','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\137377558df0ded9125721101','0','2024-01-17 10:44:46','2024-01-17 10:44:46',0),(85,'julioneo60@hotmail.com','$2b$10$zOsogHscZchxjXKhQBE2RuERf.J2wLKvZyB53VssSZUgVZgcLknce','Julio','Lopez','098511142',0,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\2259e3cdace082061caf2cb00','0','2024-01-18 01:28:11','2024-01-18 01:28:11',0),(86,'julioneo66@hotmail.com','$2b$10$FAZHhZjU/YBnV2H.yjdYueFT5wrGvUXM1xYKA3oCJ/wKi9BlIBnra','Julio','Lopez','098511142',0,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\c1fd2e65aa439c8d885075500','0','2024-01-18 09:06:54','2024-01-18 09:06:54',0),(87,'julioneo67@hotmail.com','$2b$10$Rzp0TUx3KD9kw7sJX0CH8.IJdmN5.ANF8mBpIgfLOhdgoPvmb1XR2','Julio','Lopez','098511142',0,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\c1fd2e65aa439c8d885075502','0','2024-01-18 09:07:36','2024-01-18 09:07:36',0),(88,'prueba@prueba.com','$2b$10$Rf2kb9DfM47sg9lBiFdcn.7/Lu/pFu0M6TjSX4jtLLyZSLyEGIsAy','prueba','prueba','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\b96f066939eadf91afed13200','0','2024-01-20 05:32:38','2024-01-20 05:32:38',0),(89,'prueba2@prueba.com','$2b$10$C9HjJ7sWDtBkeU8AopzkjOvWndnTne8Pq33RQ3o/XPsHyiddlZRlq','prueba','prueba','098511142',0,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\4153d4919c337b6029e0f0300','0','2024-01-20 05:52:27','2024-01-20 05:52:27',0),(90,'test@test1','$2b$10$vaUQxz1UZrJYTDUVTi87Yevn0wE5zs8vNSnJkMo9/Ds/oGOQ.Cj5i','test','test','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\7e03c83af24db3b08cb12cb01','0','2024-01-20 08:10:40','2024-01-20 08:10:40',0),(91,'julioneo95@hotmail.com','$2b$10$YHf5zfRx3GUKcVFMtk0VDu50nsNJnUTdxwxuqc.wJDUe9YnJN7bT2','Julio191','Lopez','098511142',0,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\7e03c83af24db3b08cb12cb03','0','2024-01-20 08:35:39','2024-02-12 02:32:42',1),(92,'prueba3@hotmail.com','$2b$10$oXMWo8dMqoDDrAk9Lr0za.mdxQC9Y/i/JDPalwOvnfaxN5CLS1tU.','Julio','Lopez','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\5e15fc0a7a912705e20352000','0','2024-01-23 00:28:21','2024-01-23 00:28:21',0),(93,'julioneo59@hotmail.com','$2b$10$WP6Hs47aEXz4OieCiaaGJeTwnas2W7O2aFXvrSphrk3ycuEMHZoTi','Julio','Lopez','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\6690a81904261ad2d6d06af00','0','2024-01-30 01:12:05','2024-01-30 01:12:05',0),(94,'julioneo599@hotmail.com','$2b$10$tSyaWrtXFveln1V7Rs0.uemX/86pUqcIf.B/7vAmhnUSOvdqfn14q','Julio','Lopez','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\29656dfa7ff919af74aeb8900','0','2024-01-30 01:13:22','2024-01-30 01:13:22',0),(95,'julioneo5999@hotmail.com','$2b$10$0GvPi9XxfU7hZKx98fB9uOOzpph2NifzBmGRRkYWgl.aUV09NKfju','Julio','Lopez','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\2870d8d3e92811cbb05f5fb00','0','2024-01-30 01:13:53','2024-01-30 01:13:53',0),(96,'julioneo69@hotmail.com','$2b$10$T9UjY7BwY6h.Ey475XAP/eWwh1dz1KLpqUXlIL9V.n1j2fVKBR4E.','Julio','Lopez','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\7e3f0f333dd48e44a79a65f00','0','2024-02-08 03:54:06','2024-02-08 03:54:06',0),(97,'julioneo6969@hotmail.com','$2b$10$1IUGHz9dg/4U87VRkQ.K3.HZZtersaNW.bwlnuRJ.0TkMOHgqQFle','Julio','Lopez','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\2d8248331f75fdf3cfdbeca01','0','2024-02-08 03:55:31','2024-02-08 03:55:31',0),(98,'julioneo69696@hotmail.com','$2b$10$RTQ//9FtOsgBl9zXeigxHeIzZO14f.ZeuRZGbfgWa5U4ujfPUX9xS','Julio','Lopez','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\2d8248331f75fdf3cfdbeca05','0','2024-02-08 03:56:37','2024-02-08 03:56:37',0),(99,'julioneo28@hotmail.com','$2b$10$91eao3G.goSgaKpqPMvZhe31hjiaKHmmFwMparwo5BziOQxpCnkCO','Julio','Lopez','098511142',2,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\b1dbc298fe8a6fb972224e700','0','2024-02-10 10:49:13','2024-02-10 10:49:13',0),(100,'julioneo29@hotmail.com','$2b$10$FezFXfjmbmpxU7FwPQIkAetBfILdnU7h0LYUsjLBKb6l1QP9jaa.G','Julio29','Lopez','098511142',1,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\67713f74b6ef3aee7a72fac01','0','2024-02-10 10:52:12','2024-02-10 10:52:12',0),(101,'usuario_de_test@proton.me','$2b$10$46zYLOaRcQmZsNca995YeOT4Z64coNO9Q5jQnNled2C3TcK2hG0Hy','UsuarioPrueba','ApellidoPrueba','098112233',2,'C:\\Users\\JULIOC~1\\AppData\\Local\\Temp\\a1774ce63ff2aeb5ca64a1500','0','2024-02-12 06:51:57','2024-02-14 02:51:22',1);
/*!40000 ALTER TABLE `nutricionista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutricionista_especialidad`
--

DROP TABLE IF EXISTS `nutricionista_especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutricionista_especialidad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_nutricionista` int NOT NULL,
  `id_especialidad` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_nutricionista` (`id_nutricionista`),
  KEY `id_especialidad` (`id_especialidad`),
  CONSTRAINT `nutricionista_especialidad_ibfk_1` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionista` (`id`),
  CONSTRAINT `nutricionista_especialidad_ibfk_2` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutricionista_especialidad`
--

LOCK TABLES `nutricionista_especialidad` WRITE;
/*!40000 ALTER TABLE `nutricionista_especialidad` DISABLE KEYS */;
INSERT INTO `nutricionista_especialidad` VALUES (1,91,10,'2024-02-12 03:59:17','2024-02-12 03:59:17'),(2,101,15,'2024-02-12 03:59:17','2024-02-12 03:59:17');
/*!40000 ALTER TABLE `nutricionista_especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutricionista_pais`
--

DROP TABLE IF EXISTS `nutricionista_pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutricionista_pais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_nutricionista` int NOT NULL,
  `id_pais` int NOT NULL,
  `ciudad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_nutricionista` (`id_nutricionista`),
  KEY `id_pais` (`id_pais`),
  CONSTRAINT `nutricionista_pais_ibfk_1` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionista` (`id`),
  CONSTRAINT `nutricionista_pais_ibfk_2` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutricionista_pais`
--

LOCK TABLES `nutricionista_pais` WRITE;
/*!40000 ALTER TABLE `nutricionista_pais` DISABLE KEYS */;
INSERT INTO `nutricionista_pais` VALUES (1,91,4,'Florianopolis','2024-02-09 23:19:36','2024-02-11 00:20:53'),(6,99,1,'Flores','2024-02-10 10:49:13','2024-02-10 10:49:13'),(7,100,1,'Canelones','2024-02-10 10:52:12','2024-02-10 10:52:12'),(8,101,1,'Montevideo','2024-02-12 06:51:58','2024-02-12 06:51:58');
/*!40000 ALTER TABLE `nutricionista_pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'Uruguay','2024-01-10 20:26:56','2024-01-10 20:26:56'),(2,'Argentina','2024-01-10 20:26:56','2024-01-10 20:26:56'),(3,'Chile','2024-01-10 20:26:56','2024-01-10 20:26:56'),(4,'Colombia','2024-01-10 20:26:56','2024-01-10 20:26:56'),(5,'Mexico','2024-01-10 20:26:56','2024-01-10 20:26:56'),(6,'Brasil','2024-01-10 20:26:56','2024-01-10 20:26:56');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta`
--

DROP TABLE IF EXISTS `receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `instrucciones` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_nutricionista` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `id_nutricionista` (`id_nutricionista`),
  CONSTRAINT `receta_ibfk_1` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionista` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta`
--

LOCK TABLES `receta` WRITE;
/*!40000 ALTER TABLE `receta` DISABLE KEYS */;
INSERT INTO `receta` VALUES (1,'Receta1','Instrucciones para la receta1',1,'2024-01-02 20:35:32','2024-01-02 20:35:32'),(2,'Receta2','Instrucciones para la receta2',2,'2024-01-02 20:35:32','2024-01-02 20:35:32'),(3,'Receta3','Instrucciones para la receta3',3,'2024-01-02 20:35:32','2024-01-02 20:35:32'),(4,'Receta4','Instrucciones para la receta4',4,'2024-01-02 20:35:32','2024-01-02 20:35:32'),(5,'Receta5','Instrucciones para la receta5',5,'2024-01-02 20:35:32','2024-01-02 20:35:32'),(6,'Receta6','Instrucciones para la receta6',6,'2024-01-02 20:35:32','2024-01-02 20:35:32'),(7,'Receta7','Instrucciones para la receta7',7,'2024-01-02 20:35:32','2024-01-02 20:35:32'),(8,'Receta8','Instrucciones para la receta8',8,'2024-01-02 20:35:32','2024-01-02 20:35:32');
/*!40000 ALTER TABLE `receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipeimages`
--

DROP TABLE IF EXISTS `recipeimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipeimages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipeimages`
--

LOCK TABLES `recipeimages` WRITE;
/*!40000 ALTER TABLE `recipeimages` DISABLE KEYS */;
INSERT INTO `recipeimages` VALUES (1,NULL,'2024-02-20 22:17:39','2024-02-20 22:17:39'),(2,'C:\\Users\\Julio Cesar\\Desktop\\Proyecto Integrador\\Plataforma_Nutricionista\\api\\src\\uploads\\Constancia-20240220193325.jpg','2024-02-21 01:33:26','2024-02-21 01:33:26'),(3,'C:\\Users\\Julio Cesar\\Desktop\\Proyecto Integrador\\Plataforma_Nutricionista\\api\\src\\uploads\\Constancia-20240220195013.jpg','2024-02-21 01:50:13','2024-02-21 01:50:13'),(4,'C:\\Users\\Julio Cesar\\Desktop\\Proyecto Integrador\\Plataforma_Nutricionista\\api\\src\\uploads\\Constancia-20240220195136.jpg','2024-02-21 01:51:36','2024-02-21 01:51:36'),(5,'C:\\Users\\Julio Cesar\\Desktop\\Proyecto Integrador\\Plataforma_Nutricionista\\api\\src\\uploads\\Constancia-20240220195306.jpg','2024-02-21 01:53:06','2024-02-21 01:53:06'),(6,'C:\\Users\\Julio Cesar\\Desktop\\Proyecto Integrador\\Plataforma_Nutricionista\\api\\src\\uploads\\Constancia-20240220195352.jpg','2024-02-21 01:53:53','2024-02-21 01:53:53'),(7,'C:\\Users\\Julio Cesar\\Desktop\\Proyecto Integrador\\Plataforma_Nutricionista\\api\\src\\uploads\\Constancia-20240220195720.jpg','2024-02-21 01:57:21','2024-02-21 01:57:21'),(8,'C:\\Users\\Julio Cesar\\Desktop\\Proyecto Integrador\\Plataforma_Nutricionista\\api\\src\\uploads\\Constancia-20240220195840.jpg','2024-02-21 01:58:41','2024-02-21 01:58:41');
/*!40000 ALTER TABLE `recipeimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `categories` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `difficulty` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiempo` int DEFAULT NULL,
  `ingredientes` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `alergias` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vegano` tinyint(1) DEFAULT NULL,
  `vegetariano` tinyint(1) DEFAULT NULL,
  `celiaco` tinyint(1) DEFAULT NULL,
  `has_video` tinyint(1) DEFAULT NULL,
  `user_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `healthy` tinyint(1) DEFAULT NULL,
  `byName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `page` int DEFAULT '1',
  `perPage` int DEFAULT '10',
  `recipe_image_id` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `recipe_image_id` (`recipe_image_id`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`recipe_image_id`) REFERENCES `recipeimages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro`
--

DROP TABLE IF EXISTS `registro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_nutricionista` int NOT NULL,
  `id_consultante` int NOT NULL,
  `fecha` datetime NOT NULL,
  `nota` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tipo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `enviado` tinyint(1) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_nutricionista` (`id_nutricionista`),
  KEY `id_consultante` (`id_consultante`),
  CONSTRAINT `registro_ibfk_1` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionista` (`id`),
  CONSTRAINT `registro_ibfk_2` FOREIGN KEY (`id_consultante`) REFERENCES `consultante` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro`
--

LOCK TABLES `registro` WRITE;
/*!40000 ALTER TABLE `registro` DISABLE KEYS */;
INSERT INTO `registro` VALUES (1,101,33,'2024-02-19 08:00:23','<p>testeando el informe</p>','TEST',0,'2024-02-19 11:00:23','2024-02-19 11:00:23'),(2,101,36,'2024-02-19 08:13:08','<p>adasdaada</p>','TEST',0,'2024-02-19 11:13:08','2024-02-19 11:13:08'),(3,101,30,'2024-02-20 23:41:04','<p>El consultante esta recibiendo un registro</p>','Informe de prueba',0,'2024-02-21 02:41:04','2024-02-21 02:41:04');
/*!40000 ALTER TABLE `registro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sugerencia`
--

DROP TABLE IF EXISTS `sugerencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sugerencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_nutricionista` int NOT NULL,
  `id_consultante` int NOT NULL,
  `fecha` datetime NOT NULL,
  `comentario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `enviado` tinyint(1) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_nutricionista` (`id_nutricionista`),
  KEY `id_consultante` (`id_consultante`),
  CONSTRAINT `sugerencia_ibfk_1` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionista` (`id`),
  CONSTRAINT `sugerencia_ibfk_2` FOREIGN KEY (`id_consultante`) REFERENCES `consultante` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sugerencia`
--

LOCK TABLES `sugerencia` WRITE;
/*!40000 ALTER TABLE `sugerencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `sugerencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sugerencia_receta`
--

DROP TABLE IF EXISTS `sugerencia_receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sugerencia_receta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_sugerencia` int NOT NULL,
  `id_receta` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_sugerencia` (`id_sugerencia`),
  KEY `id_receta` (`id_receta`),
  CONSTRAINT `sugerencia_receta_ibfk_1` FOREIGN KEY (`id_sugerencia`) REFERENCES `sugerencia` (`id`),
  CONSTRAINT `sugerencia_receta_ibfk_2` FOREIGN KEY (`id_receta`) REFERENCES `receta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sugerencia_receta`
--

LOCK TABLES `sugerencia_receta` WRITE;
/*!40000 ALTER TABLE `sugerencia_receta` DISABLE KEYS */;
/*!40000 ALTER TABLE `sugerencia_receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipodieta`
--

DROP TABLE IF EXISTS `tipodieta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipodieta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_consultante` int NOT NULL,
  `vegetariano` tinyint(1) DEFAULT NULL,
  `vegano` tinyint(1) DEFAULT NULL,
  `pescetariano` tinyint(1) DEFAULT NULL,
  `crudivegano` tinyint(1) DEFAULT NULL,
  `sinGluten` tinyint(1) DEFAULT NULL,
  `sinLactosa` tinyint(1) DEFAULT NULL,
  `keto` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_consultante` (`id_consultante`),
  CONSTRAINT `tipodieta_ibfk_1` FOREIGN KEY (`id_consultante`) REFERENCES `consultante` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipodieta`
--

LOCK TABLES `tipodieta` WRITE;
/*!40000 ALTER TABLE `tipodieta` DISABLE KEYS */;
INSERT INTO `tipodieta` VALUES (11,30,1,0,0,0,1,0,0,'2024-02-18 07:06:16','2024-02-18 07:06:16'),(12,31,0,1,0,0,0,1,0,'2024-02-18 07:06:16','2024-02-18 07:06:16'),(13,32,0,0,1,0,0,0,1,'2024-02-18 07:06:16','2024-02-18 07:06:16'),(14,33,0,0,0,1,1,0,0,'2024-02-18 07:06:16','2024-02-18 07:06:16'),(15,34,0,0,0,0,0,0,1,'2024-02-18 07:06:16','2024-02-18 07:06:16'),(16,35,1,0,0,0,1,0,0,'2024-02-18 07:06:16','2024-02-18 07:06:16'),(17,36,0,0,1,0,0,1,0,'2024-02-18 07:06:16','2024-02-18 07:06:16'),(18,37,0,1,0,0,0,0,1,'2024-02-18 07:06:16','2024-02-18 07:06:16'),(19,38,0,0,0,1,1,0,0,'2024-02-18 07:06:16','2024-02-18 07:06:16'),(20,39,0,0,0,0,0,1,1,'2024-02-18 07:06:16','2024-02-18 07:06:16');
/*!40000 ALTER TABLE `tipodieta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-20 22:32:08
