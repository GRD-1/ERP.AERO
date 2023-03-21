-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: erp_aero
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `files` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `filename` text,
  `extension` text,
  `mimetype` text,
  `size` int(11) DEFAULT NULL,
  `date_of_entry` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `files_uid_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (33,'2-1679378293110.jpg','jpg','image/jpeg',291098,'2023-03-21 05:58:13'),(34,'13-1679379035276.jpg','jpg','image/jpeg',168807,'2023-03-21 05:58:23'),(35,'7-1679378308182.jpg','jpg','image/jpeg',113357,'2023-03-21 05:58:28'),(36,'8-1679378314270.jpg','jpg','image/jpeg',164105,'2023-03-21 05:58:34'),(37,'8-1679378320116.jpg','jpg','image/jpeg',164105,'2023-03-21 05:58:40'),(38,'9-1679378324160.jpg','jpg','image/jpeg',88046,'2023-03-21 05:58:44'),(39,'10-1679378332884.jpg','jpg','image/jpeg',257418,'2023-03-21 05:58:52'),(40,'11-1679378336590.jpg','jpg','image/jpeg',38818,'2023-03-21 05:58:56'),(41,'12-1679378339886.jpg','jpg','image/jpeg',115107,'2023-03-21 05:58:59'),(42,'13-1679378343323.jpg','jpg','image/jpeg',168807,'2023-03-21 05:59:03'),(43,'11-1679378864102.jpg','jpg','image/jpeg',38818,'2023-03-21 06:07:44'),(44,'1-1679378868809.jpg','jpg','image/jpeg',808991,'2023-03-21 06:07:48'),(45,'5-1679378873741.jpg','jpg','image/jpeg',246123,'2023-03-21 06:07:53'),(46,'13-1679378879488.jpg','jpg','image/jpeg',168807,'2023-03-21 06:07:59');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `uid` bigint(20) NOT NULL AUTO_INCREMENT,
  `id` text NOT NULL,
  `password` text,
  `salt` text,
  `refresh_token` text,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `users_uid_uindex` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'admin','$2b$10$IJxYo5Mj9HzSotL/gXaQVuN1VxxnZ.xfg3Wsgi0vAckfaAJ1J0jxG','$2b$10$IJxYo5Mj9HzSotL/gXaQVu','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwidG9rZW5UeXBlIjoicmVmcmVzaCIsImlhdCI6MTY3OTM3OTc5MCwiZXhwIjoxNjc5NDY2MTkwfQ.lwgq4E0K0jBcJ6M6aLWJMBiuZM5p3zSLGnJDnPqaQxA');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-21 11:06:47
