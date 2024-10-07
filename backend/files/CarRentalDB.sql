-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (arm64)
--
-- Host: localhost    Database: CarRentalDB
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`id`, `email`, `password`) VALUES (1,'admin@rentcarz.com','$2a$10$/zC1H4IDSMyIfgoiENs3mODxivZMgG/Y0Lz1HOjEYJCCsuQd6VRWe');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `vehicleNo` varchar(20) NOT NULL,
  `carType` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `locationID` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `photoUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vehicleNo`),
  KEY `car_ibfk_1` (`locationID`),
  KEY `idx_car_search` (`carType`,`model`,`locationID`),
  CONSTRAINT `car_ibfk_1` FOREIGN KEY (`locationID`) REFERENCES `location` (`locationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` (`vehicleNo`, `carType`, `model`, `locationID`, `deleted_at`, `photoUrl`) VALUES ('KA05HD25','Sedan','Kia Sorento',1,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2F558826.jpg?alt=media&token=c960b38b-24cc-4773-98df-4a15c4991385'),('KA05HD26','Sedan','Kia',1,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2F55ddd8be4786e0ddcb278eb82feec30f.jpg?alt=media&token=f7eb8050-9c0f-4d85-b696-33fb51052259'),('KA05HX2','Coupe','Maruthi Swift',1,'2024-03-25 15:28:54',NULL),('KA05HX2555','Coupe','Maruthi',1,'2024-03-26 08:40:44',NULL),('KA06AB89','Coupe','Ford ADRO',2,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2Fadro_ford_mustang_coupe_car_white_background_4k_hd_cars.jpg?alt=media&token=72c47f87-a05c-4f8f-982a-ee6443a0b2f0'),('KA06ABC','Sedan','Maruti Suzuki Dzire',1,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2Fswift-dzire-car-jpg.jpg?alt=media&token=d235c82d-b059-48e1-b344-89a5ad81a298'),('KA06ABC5','SUV','Tata',1,'2024-04-01 06:53:03',NULL),('KA06ABXX','Sedan','Kia',2,NULL,NULL),('KA06ZZZ5','Sedan','Maruti Suzuki S-Presso ',1,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2Fmarutisuzuki_spresso_angularfront.jpg?alt=media&token=df162fd0-2961-450c-a3df-598029066d55'),('KA07BC07','Coupe','Ford Mustang',2,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2Fcar-isolated-white-background-ford-mustang-white-car-blank-clean-white-backgro-white-black_655090-717375.avif?alt=media&token=c71c05bf-e6db-4d4e-b411-f08cb23d55b7'),('KA07XYZ','SUV','Mahindra XUV500',1,'2024-03-25 14:58:53',NULL),('KA08MNO','SUV','Tata Nexon',1,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2F68956c275155d2d4f81cf09067783a6c.jpg?alt=media&token=87b59d19-01f4-43ab-ba4f-706063f7ba7e'),('KA09HX2323','SUV','Hyundai Creta',2,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2F20200228050400_RED_CRETA_NEWx.jpg?alt=media&token=f945f682-dc5a-410a-8b8f-89969b3faa0a'),('KA09PQR','Coupe','Hyundai Grand i10',1,'2024-03-26 08:43:26',NULL),('KA10XYZ','Sedan','Honda Amaze',1,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2Fbdd67bc7-a01e-4759-9e3a-a7251f31c899-Honda_Amaze_Meteoroid-Grey-Metallic.webp?alt=media&token=1215834b-2588-4a18-94f9-c01eb2eb7363'),('KA11ABC','SUV','Honda City',1,'2024-03-25 14:20:24',NULL),('KA12XYZ','SUV','Toyota Innova Crysta',1,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2F20201015102234_2021-Toyota-Innova-Crysta-facelift-grey-studio.jpg?alt=media&token=95d34832-f300-4d61-abea-9087098eb391'),('KA13MNO','Coupe','Volkswagen Polo',1,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2FVW-Polo-front.webp?alt=media&token=71999ff3-d8c8-40d5-a75e-6bd5afaf30d5'),('KA14PQR','SUV','Ford EcoSport',1,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2Fford_ecosport_2016_1_17102016_4013_1280_960.jpg?alt=media&token=84d3262b-84fe-4240-ac1d-1f4c1819071f'),('KA15XYZ','Sedan','Hyundai Verna',1,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2Fhyundai-verna-atlas-white.webp?alt=media&token=9fe42b59-1cc3-4e1e-911a-3a80551ff749'),('KA16ABC','Sedan','Maruti Suzuki Ciaz',2,'2024-07-27 09:59:59',NULL),('KA17XYZ','SUV','Kia Seltos',2,'2024-07-27 10:00:09',NULL),('KA18MNO','Hatchback','Tata Altroz',2,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2FOberonblack-0.png?alt=media&token=704dd201-a8df-487d-a1f8-862a81b26cc1'),('KA19PQR','Coupe','Mercedes-Benz A-Class',2,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2F0fhnjbb_1685319.webp?alt=media&token=984a7e5e-129a-44ab-83e8-7806890f6315'),('KA20XYZ','SUV','Toyota Fortuner',2,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2Fdesktop-wallpaper-toyota-fortuner-white-fortuner.jpg?alt=media&token=ebbca1bd-d2bd-4a02-acae-bdbd69e867b5'),('KA21ABC','Sedan','Skoda Rapid',2,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2F4d5b5100dec5dcf0722a2f0dafd8318d.jpg?alt=media&token=13283733-ed9d-43a2-ae56-77681fce8565'),('KA22XYZ','Hatchback','Renault Duster',2,'2024-07-27 10:02:42',NULL),('KA23MNO','Coupe','Ford Figo',2,'2024-07-27 10:02:48',NULL),('KA24PQR','Sedan','Nissan Kicks',2,'2024-07-27 10:02:53',NULL),('KA25XYZ','SUV','Tesla Model S',2,'2024-07-27 10:02:59',NULL),('KA26ABC','Sedan','Hyundai Elite i20',3,'2024-07-27 10:03:07',NULL),('KA27XYZ','SUV','Audi Q7',3,'2024-07-27 10:03:12',NULL),('KA28MNO','Hatchback','Maruti Suzuki Baleno',1,NULL,'https://firebasestorage.googleapis.com/v0/b/carrentalsys-b9fac.appspot.com/o/images%2Fsleek-suzuki-baleno-in-pristine-condition-ntuzktbgll630x6j.jpg?alt=media&token=d31b7b7a-bccb-44ba-a485-869bcf4553ed'),('KA29PQR','Coupe','Chevrolet Beat',3,'2024-07-27 10:03:48',NULL),('KA30XYZ','Sedan','Volvo XC40',3,'2024-03-25 15:16:45',NULL),('KA31ABC','SUV','Honda Civic',3,'2024-08-27 15:58:53',NULL),('KA32XYZ','Hatchback','Jeep Compass',3,'2024-07-27 10:03:53',NULL),('KA33MNO','Coupe','Ford Aspire',3,NULL,NULL),('KA34PQR','Sedan','BMW X3',3,'2024-03-25 15:00:01',NULL);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carStatus`
--

DROP TABLE IF EXISTS `carStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carStatus` (
  `carID` varchar(20) NOT NULL,
  `status` enum('AVAILABLE','RESERVED') NOT NULL,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`carID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carStatus`
--

LOCK TABLES `carStatus` WRITE;
/*!40000 ALTER TABLE `carStatus` DISABLE KEYS */;
INSERT INTO `carStatus` (`carID`, `status`, `updatedAt`) VALUES ('KA05HD25','RESERVED','2024-10-06 14:56:44'),('KA05HD26','RESERVED','2024-10-07 07:35:11'),('KA06AB89','AVAILABLE','2024-09-09 03:37:32'),('KA06ABC','AVAILABLE','2024-09-07 06:30:59'),('KA06ABXX','AVAILABLE','2024-09-07 06:30:59'),('KA06ZZZ5','AVAILABLE','2024-09-07 06:30:59'),('KA07BC07','AVAILABLE','2024-09-07 06:30:59'),('KA08MNO','AVAILABLE','2024-09-07 06:30:59'),('KA09HX2323','AVAILABLE','2024-09-07 06:30:59'),('KA10XYZ','AVAILABLE','2024-09-07 06:30:59'),('KA12XYZ','AVAILABLE','2024-09-07 06:30:59'),('KA13MNO','AVAILABLE','2024-09-07 06:30:59'),('KA14PQR','AVAILABLE','2024-09-07 06:30:59'),('KA15XYZ','AVAILABLE','2024-09-07 06:30:59'),('KA18MNO','AVAILABLE','2024-09-07 06:30:59'),('KA19PQR','AVAILABLE','2024-09-07 06:30:59'),('KA20XYZ','AVAILABLE','2024-09-07 06:30:59'),('KA21ABC','AVAILABLE','2024-09-07 06:30:59'),('KA28MNO','AVAILABLE','2024-09-07 06:30:59'),('KA33MNO','AVAILABLE','2024-09-07 06:30:59');
/*!40000 ALTER TABLE `carStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `custID` varchar(28) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contactNum` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`custID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` (`custID`, `name`, `contactNum`, `email`, `address`) VALUES ('F0VArbId9IY50ZV3c56Isx4oJkY2','Rohit','12345678','rohit@email.com','Banashankri 5th Stage'),('hKC8kg0T3tYn8OYf2575vc0i7KZ2','Raghunath','9191929293','raghunath@email.com','101, Koramangala, Bangalore, Karnataka - 560100'),('J1dPockkrPaNMDxn6LS0F0IEYVU2','Raghu Ram','1234567890','raghuram@email.com','101, Koramangala, Bangalore, Karnataka - 560100'),('MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2','Tharun Virupakshi','9945673332','tharunvrrvc184@gmail.com','BSK, 5th Stage'),('uCf6YzgkMLUWpo4Ic3Zu30bkN9B3','Manish ','1234567890','manish@mail.com','126, BSK, 3rd Stage, Bangalore'),('VjSGhcbZtMbf20TNYRWwu9Wdnga2','Rakesh Purohit','9594698888','rakeshpurohit@email.com','126, BSK');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `discountID` int NOT NULL AUTO_INCREMENT,
  `couponCode` varchar(255) DEFAULT NULL,
  `discountPercent` decimal(2,2) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`discountID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
INSERT INTO `discount` (`discountID`, `couponCode`, `discountPercent`, `deleted_at`) VALUES (2,'SAVE10',0.10,NULL),(3,'GRAB20OFF',0.20,'2024-08-13 14:05:52'),(4,'DISCOUNT15',0.15,'2024-03-25 17:20:18'),(5,'SPECIAL25',0.25,NULL),(6,'GET30NOW',0.30,NULL),(7,'SAVE10NOW',0.10,'2024-03-25 14:53:43'),(8,'FLAT50',0.50,'2024-03-25 17:20:10'),(9,'FLAT35',0.35,NULL);
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `getsRented`
--

DROP TABLE IF EXISTS `getsRented`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `getsRented` (
  `tripID` int NOT NULL AUTO_INCREMENT,
  `carID` varchar(20) DEFAULT NULL,
  `orderID` int DEFAULT NULL,
  `rentalStartDate` date DEFAULT NULL,
  `rentalEndDate` date DEFAULT NULL,
  `status` enum('FINISHED','RUNNING') DEFAULT 'RUNNING',
  PRIMARY KEY (`tripID`),
  KEY `getsrented_ibfk_2` (`orderID`),
  KEY `getsrented_ibfk_1` (`carID`),
  CONSTRAINT `getsrented_ibfk_1` FOREIGN KEY (`carID`) REFERENCES `car` (`vehicleNo`) ON UPDATE CASCADE,
  CONSTRAINT `getsrented_ibfk_2` FOREIGN KEY (`orderID`) REFERENCES `rentalOrder` (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `getsRented`
--

LOCK TABLES `getsRented` WRITE;
/*!40000 ALTER TABLE `getsRented` DISABLE KEYS */;
INSERT INTO `getsRented` (`tripID`, `carID`, `orderID`, `rentalStartDate`, `rentalEndDate`, `status`) VALUES (24,'KA06ABC',57,'2024-03-10','2024-03-10','FINISHED'),(25,'KA07XYZ',58,'2024-03-10','2024-03-10','FINISHED'),(26,'KA08MNO',59,'2024-03-10','2024-03-12','FINISHED'),(27,'KA06ABC',60,'2024-03-11','2024-03-13','FINISHED'),(28,'KA06ABC',61,'2024-03-24','2024-03-26','FINISHED'),(29,'KA07XYZ',62,'2024-03-25','2024-03-27','FINISHED'),(30,'KA05HX2555',63,'2024-03-26','2024-03-26','FINISHED'),(31,'KA06ABC',64,'2024-03-27','2024-03-27','FINISHED'),(32,'KA06ABC',66,'2024-03-31','2024-03-31','FINISHED'),(33,'KA06ABC',67,'2024-04-01','2024-04-01','FINISHED'),(34,'KA06ZZZ5',68,'2024-04-01','2024-04-10','FINISHED'),(35,'KA05HD25',69,'2024-07-27','2024-07-30','FINISHED'),(36,'KA06AB89',71,'2024-08-13','2024-08-15','FINISHED'),(37,'KA05HD25',72,'2024-08-26','2024-08-27','FINISHED'),(38,'KA05HD25',76,'2024-08-27','2024-08-28','FINISHED'),(39,'KA06ABC',77,'2024-08-27','2024-08-28','FINISHED'),(40,'KA06ABC',78,'2024-09-02','2024-09-02','FINISHED'),(41,'KA06ABC',79,'2024-09-02','2024-09-04','FINISHED'),(42,'KA06ZZZ5',80,'2024-09-02','2024-09-02','FINISHED'),(43,'KA05HD25',81,'2024-09-02','2024-09-04','FINISHED'),(44,'KA05HD26',94,'2024-09-07','2024-09-08','FINISHED'),(45,'KA05HD25',95,'2024-09-08','2024-09-09','FINISHED'),(46,'KA05HD25',117,'2024-09-09','2024-09-10','FINISHED'),(47,'KA05HD25',119,'2024-10-06','2024-10-07','RUNNING'),(48,'KA05HD26',124,'2024-10-07','2024-10-08','RUNNING');
/*!40000 ALTER TABLE `getsRented` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `locationID` int NOT NULL AUTO_INCREMENT,
  `branchName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`locationID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` (`locationID`, `branchName`, `address`, `deleted_at`) VALUES (1,'Koramangala Branch','124 MG Road, Koramangala',NULL),(2,'Indiranagar Branch','456 100 Feet Road, Indiranagar',NULL),(3,'Whitefield Branch','789 ITPL Road, Whitefield',NULL),(4,'Banshankri','125, Banshankri','2024-03-26 03:41:40'),(6,'Banshankri','126, BSK','2024-03-26 05:27:46'),(7,'Banshankri','Banshankri ',NULL),(8,'Marathalli ','#256, Marathalli',NULL);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `paymentID` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `orderID` int DEFAULT NULL,
  `transactionID` int DEFAULT NULL,
  `payerID` varchar(28) DEFAULT NULL,
  `isSuccess` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`paymentID`),
  KEY `payment_ibfk_2_idx` (`transactionID`),
  KEY `payment_ibfk_1_idx` (`orderID`),
  KEY `payment_ibfk_3` (`payerID`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `rentalOrder` (`orderID`),
  CONSTRAINT `payment_ibfk_3` FOREIGN KEY (`payerID`) REFERENCES `customer` (`custID`) ON UPDATE CASCADE,
  CONSTRAINT `payment_ibfk_4` FOREIGN KEY (`transactionID`) REFERENCES `transaction` (`transactionID`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` (`paymentID`, `amount`, `payment_method`, `date`, `orderID`, `transactionID`, `payerID`, `isSuccess`) VALUES (61,800.00,'credit','2024-03-10 13:51:44',57,61,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(62,800.00,'debit','2024-03-10 14:35:23',58,62,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(63,1360.00,'credit','2024-03-10 18:18:38',59,63,'F0VArbId9IY50ZV3c56Isx4oJkY2',1),(64,2685.60,'credit','2024-03-11 10:39:10',60,64,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(65,1120.00,'credit','2024-03-24 12:33:53',61,65,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(66,1440.00,'credit','2024-03-25 11:56:55',62,66,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(67,520.00,'credit','2024-03-26 14:07:56',63,67,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(68,720.00,'credit','2024-03-27 06:14:46',64,68,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(69,1659.62,'debit','2024-03-31 13:40:50',66,69,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(70,1658.67,'credit','2024-04-01 12:20:52',67,70,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(71,10449.63,'credit','2024-04-01 12:57:52',68,71,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(72,2400.00,'debit','2024-07-27 12:44:58',69,72,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(73,1120.00,'credit','2024-08-13 16:06:38',71,73,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(74,800.00,'credit','2024-08-26 08:33:35',72,74,'uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',1),(75,800.00,'credit','2024-08-27 18:12:07',76,75,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(76,800.00,'debit','2024-08-27 20:18:33',77,76,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(77,973.33,'debit','2024-09-02 13:02:26',78,77,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(78,2502.84,'credit','2024-09-02 13:03:22',79,78,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(79,1390.47,'credit','2024-09-02 13:04:12',80,79,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(80,1946.65,'credit','2024-09-02 15:07:24',81,80,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(81,800.00,'credit','2024-09-07 14:34:27',94,81,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(82,800.00,'credit','2024-09-08 17:50:20',95,82,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(83,800.00,'credit','2024-09-09 09:11:04',117,83,'uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',1),(84,800.00,'credit','2024-10-06 20:27:07',119,84,'uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',1),(85,1040.75,'credit','2024-10-07 13:05:29',124,85,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rentalOrder`
--

DROP TABLE IF EXISTS `rentalOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rentalOrder` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `carID` varchar(20) DEFAULT NULL,
  `custID` varchar(28) DEFAULT NULL,
  `asstID` int DEFAULT NULL,
  `discountID` int DEFAULT NULL,
  `totCost` decimal(10,2) DEFAULT NULL,
  `orderDate` date DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `carID` (`carID`),
  KEY `fk_cust_ID` (`custID`),
  KEY `rentalorder_ibfk_4` (`discountID`),
  KEY `asstID` (`asstID`),
  CONSTRAINT `fk_cust_ID` FOREIGN KEY (`custID`) REFERENCES `customer` (`custID`),
  CONSTRAINT `rentalorder_ibfk_4` FOREIGN KEY (`discountID`) REFERENCES `discount` (`discountID`),
  CONSTRAINT `rentalorder_ibfk_5` FOREIGN KEY (`asstID`) REFERENCES `tripAsst` (`asstID`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentalOrder`
--

LOCK TABLES `rentalOrder` WRITE;
/*!40000 ALTER TABLE `rentalOrder` DISABLE KEYS */;
INSERT INTO `rentalOrder` (`orderID`, `carID`, `custID`, `asstID`, `discountID`, `totCost`, `orderDate`) VALUES (57,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',3,NULL,800.00,'2024-03-10'),(58,'KA07XYZ','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',5,NULL,800.00,'2024-03-10'),(59,'KA08MNO','F0VArbId9IY50ZV3c56Isx4oJkY2',7,4,1360.00,'2024-03-10'),(60,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',6,2,2685.60,'2024-03-11'),(61,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',10,6,1120.00,'2024-03-24'),(62,'KA07XYZ','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',4,2,1440.00,'2024-03-25'),(63,'KA05HX2555','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',9,9,520.00,'2024-03-26'),(64,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',9,2,720.00,'2024-03-27'),(65,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',8,9,1954.10,'2024-03-31'),(66,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1,NULL,1659.62,'2024-03-31'),(67,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',5,NULL,1658.67,'2024-04-01'),(68,'KA06ZZZ5','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',3,6,10449.63,'2024-04-01'),(69,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',2,NULL,2400.00,'2024-07-27'),(70,'KA05HD26','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',7,NULL,800.00,'2024-07-27'),(71,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',9,6,1120.00,'2024-08-13'),(72,'KA05HD25','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',10,NULL,800.00,'2024-08-26'),(73,NULL,NULL,7,NULL,NULL,'2024-08-26'),(74,'KA05HD26','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',9,NULL,800.00,'2024-08-26'),(75,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',8,6,1120.00,'2024-08-27'),(76,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',8,NULL,800.00,'2024-08-27'),(77,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',6,NULL,800.00,'2024-08-27'),(78,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',3,6,973.33,'2024-09-02'),(79,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',3,2,2502.84,'2024-09-02'),(80,'KA06ZZZ5','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',8,NULL,1390.47,'2024-09-02'),(81,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',4,6,1946.65,'2024-09-02'),(82,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',6,NULL,800.00,'2024-09-06'),(83,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',7,NULL,800.00,'2024-09-07'),(84,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',8,NULL,800.00,'2024-09-07'),(85,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',7,NULL,800.00,'2024-09-07'),(86,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',5,NULL,800.00,'2024-09-07'),(87,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',3,NULL,800.00,'2024-09-07'),(88,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',9,NULL,800.00,'2024-09-07'),(89,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',6,NULL,800.00,'2024-09-07'),(90,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',7,NULL,800.00,'2024-09-07'),(91,'KA05HD26','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',6,NULL,800.00,'2024-09-07'),(92,'KA05HD26','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',10,NULL,800.00,'2024-09-07'),(93,'KA05HD26','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',2,NULL,800.00,'2024-09-07'),(94,'KA05HD26','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',7,NULL,800.00,'2024-09-07'),(95,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',3,NULL,800.00,'2024-09-08'),(96,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',9,NULL,800.00,'2024-09-09'),(97,'KA06AB89','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',9,NULL,800.00,'2024-09-09'),(98,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',9,NULL,800.00,'2024-09-09'),(99,'KA06AB89','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',6,NULL,800.00,'2024-09-09'),(100,'KA06AB89','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',8,NULL,800.00,'2024-09-09'),(101,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1,NULL,800.00,'2024-09-09'),(102,'KA06AB89','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',2,NULL,800.00,'2024-09-09'),(103,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',6,NULL,800.00,'2024-09-09'),(104,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1,NULL,800.00,'2024-09-09'),(105,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',2,NULL,800.00,'2024-09-09'),(106,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',10,NULL,800.00,'2024-09-09'),(107,'KA06AB89','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',5,NULL,800.00,'2024-09-09'),(108,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',8,NULL,800.00,'2024-09-09'),(109,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',5,NULL,800.00,'2024-09-09'),(110,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',10,NULL,800.00,'2024-09-09'),(111,'KA06AB89','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',4,NULL,800.00,'2024-09-09'),(112,'KA06AB89','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',7,NULL,800.00,'2024-09-09'),(113,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',7,NULL,800.00,'2024-09-09'),(114,'KA06AB89','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',7,NULL,800.00,'2024-09-09'),(115,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',8,NULL,800.00,'2024-09-09'),(116,'KA06AB89','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',6,NULL,800.00,'2024-09-09'),(117,'KA05HD25','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',3,NULL,800.00,'2024-09-09'),(118,'KA05HD25','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',5,NULL,800.00,'2024-10-06'),(119,'KA05HD25','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',1,NULL,800.00,'2024-10-06'),(120,'KA05HD26','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',4,NULL,1486.78,'2024-10-07'),(121,'KA05HD26','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',10,NULL,1486.78,'2024-10-07'),(122,'KA05HD26','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1,6,1040.75,'2024-10-07'),(123,'KA05HD26','uCf6YzgkMLUWpo4Ic3Zu30bkN9B3',2,NULL,1486.78,'2024-10-07'),(124,'KA05HD26','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',10,6,1040.75,'2024-10-07');
/*!40000 ALTER TABLE `rentalOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `transactionID` int NOT NULL AUTO_INCREMENT,
  `transcName` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`transactionID`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` (`transactionID`, `transcName`, `amount`) VALUES (61,'cust_payment',800.00),(62,'cust_payment',800.00),(63,'cust_payment',1360.00),(64,'cust_payment',2685.60),(65,'cust_payment',1120.00),(66,'cust_payment',1440.00),(67,'cust_payment',520.00),(68,'cust_payment',720.00),(69,'cust_payment',1659.62),(70,'cust_payment',1658.67),(71,'cust_payment',10449.63),(72,'cust_payment',2400.00),(73,'cust_payment',1120.00),(74,'cust_payment',800.00),(75,'cust_payment',800.00),(76,'cust_payment',800.00),(77,'cust_payment',973.33),(78,'cust_payment',2502.84),(79,'cust_payment',1390.47),(80,'cust_payment',1946.65),(81,'cust_payment',800.00),(82,'cust_payment',800.00),(83,'cust_payment',800.00),(84,'cust_payment',800.00),(85,'cust_payment',1040.75);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tripAsst`
--

DROP TABLE IF EXISTS `tripAsst`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tripAsst` (
  `asstID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `contactNum` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`asstID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tripAsst`
--

LOCK TABLES `tripAsst` WRITE;
/*!40000 ALTER TABLE `tripAsst` DISABLE KEYS */;
INSERT INTO `tripAsst` (`asstID`, `name`, `contactNum`, `email`, `deleted_at`) VALUES (1,'Rajesh','9035468888','rajesh@email.com',NULL),(2,'Priya Sharma','8765432109','priya.sharma@example.com',NULL),(3,'Vikram Singh','7654321098','vikram.singh@example.com',NULL),(4,'Sneha Patel','6543210987','sneha.patel@example.com',NULL),(5,'Ankit Verma','5432109876','ankit.verma@example.com',NULL),(6,'Ayesha Khan','4321098765','ayesha.khan@example.com',NULL),(7,'Pradeep Joshi','3210987654','pradeep.joshi@example.com',NULL),(8,'Anjali Gupta','2109876543','anjali.gupta@example.com',NULL),(9,'Arjun Malhotra','1098765432','arjun.malhotra@example.com',NULL),(10,'Pooja Das','9876543211','pooja.das@example.com',NULL),(11,'Pooja Sharma','9034567777','pooja.sharma@email.com','2024-03-26 04:44:27'),(12,'Suresh ','9191929293','suresh@mail.com','2024-03-26 05:46:26');
/*!40000 ALTER TABLE `tripAsst` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'CarRentalDB'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-07 19:53:38
