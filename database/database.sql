-- MySQL dump 10.13  Distrib 8.0.23, for osx10.16 (x86_64)
--
-- Host: 127.0.0.1    Database: bank_db
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_number` varchar(45) DEFAULT NULL,
  `balance` double DEFAULT NULL,
  `type_account` varchar(45) DEFAULT NULL,
  `id_client` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_client` (`id_client`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (2,'822146',5000000,'Ahorros',3),(3,'535018',5000000,'Ahorros',5),(11,'496525',5000000,'Ahorros',29);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank`
--

LOCK TABLES `bank` WRITE;
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
INSERT INTO `bank` VALUES (1,'Davivienda'),(2,'Bancolombia'),(3,'BBVA'),(4,'Scotiabank'),(5,'Banco de bogota');
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dni` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `name_lastname` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `id_bank` int DEFAULT NULL,
  `id_role` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_bank` (`id_bank`),
  KEY `id_role` (`id_role`),
  CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`id_bank`) REFERENCES `bank` (`id`),
  CONSTRAINT `clients_ibfk_2` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,123456,'dvdalejo@gmail.com','David Mosquera','dvdalejandro','$2b$08$URZ54AdPW.R.rUl4j8wbOO7BhgaGJ5A9504.GUuguGTH6JemSqLDK',1,NULL),(3,9999999,'nicolas@gmail.com','Nicolas Romero','ncromero','$2b$08$.huebYP116fbznsu3WC2/e7luaGM/0xQ9LQqll5kwairxu46riwiC',2,NULL),(5,1193543225,'kevinstiven@gmail.com','Kevin Martinez','kevinstmartinez','$2b$08$OAUYZD/WoUx2m0sfJULXruJh4jRjhsOfie6M7QjyNRszJR0hSYcFG',2,NULL),(19,12840234,'lopez@gmail.com','David Lopez','djreggae','$2b$08$grqCEaPKW50FUmOkriOYKeWJsOXZY3bOrxp5d5FyntknCQ8V4cCrq',2,2),(29,12840234,'jhon@gmail.com','Jhon Doe','jhonde','$2b$08$UqUuWXETvtzQ2CJu8W9ehO0VzGF7Ymo.fNsKjIl2S61hIbpkN2nQi',1,1),(30,12840234,'jho@gmail.com','Jhon Doe','jhonde','$2b$08$UsrrwX0M/N5m7iQ1rQwaeu48dw0G3FQZuw9of76WPMQwGVhtZrRSi',1,1);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_amount` double DEFAULT NULL,
  `date_time` date DEFAULT NULL,
  `number_payment_references` varchar(45) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `id_service` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_service` (`id_service`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`id_service`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (36,26850,'2021-05-09','92176489878',1,13),(37,68950,'2021-05-09','35187716746',1,14);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `NIT` varchar(45) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `type_service` varchar(45) DEFAULT NULL,
  `value` double DEFAULT NULL,
  `number_references` varchar(45) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `id_account` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_account` (`id_account`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`id_account`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (13,'acueducto','52164713329','2021-05-31','public',26850,'92176489878',1,2),(14,'internet','65292326138','2021-05-31','public',68950,'35187716746',1,2),(15,'luz','57818891013','2021-05-31','public',50000,'73094589793',0,2),(16,'luz','69508367045','2021-05-31','public',50000,'31584746615',0,2);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfer`
--

DROP TABLE IF EXISTS `transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `date_time` date DEFAULT NULL,
  `destiny_account_number` varchar(45) DEFAULT NULL,
  `origin_account_number` varchar(45) DEFAULT NULL,
  `id_account` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_account` (`id_account`),
  CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`id_account`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfer`
--

LOCK TABLES `transfer` WRITE;
/*!40000 ALTER TABLE `transfer` DISABLE KEYS */;
INSERT INTO `transfer` VALUES (26,100,'2021-04-20','535018','822146',2),(27,9500,'2021-04-20','287850','822146',2),(28,10000,'2021-05-09','535018','822146',2),(29,10000,'2021-05-09','822146','535018',3),(30,10000,'2021-05-09','822146','535018',3),(31,10000,'2021-05-09','822146','535018',3),(32,10000,'2021-05-09','822146','535018',3),(33,5000000,'2021-05-09','822146','535018',3),(34,5000000,'2021-05-09','535018','822146',2);
/*!40000 ALTER TABLE `transfer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-09 20:31:05
