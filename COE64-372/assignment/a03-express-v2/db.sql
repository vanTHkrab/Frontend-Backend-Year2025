-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: mydailygoal_db
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.2

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
-- Table structure for table `daily_activities`
--

DROP TABLE IF EXISTS `daily_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ชื่อผู้ใช้งาน',
  `user_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'อีเมลผู้ใช้งาน',
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'รหัสผู้ใช้งาน (กำหนดเอง)',
  `goal_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'เป้าหมายที่ตั้งไว้',
  `activity_name` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ชื่อกิจกรรมที่ทำ',
  `activity_description` text COLLATE utf8mb4_unicode_ci COMMENT 'รายละเอียดกิจกรรม',
  `completed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'เวลาที่ทำเสร็จ',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'เวลาที่บันทึกข้อมูล',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_user_email` (`user_email`),
  KEY `idx_completed_at` (`completed_at`),
  KEY `idx_user_date` (`user_id`,`completed_at`),
  KEY `idx_goal_title` (`goal_title`),
  KEY `idx_activity_name` (`activity_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='ตารางเก็บข้อมูลกิจกรรมและเป้าหมายรายวันของผู้ใช้งาน';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_activities`
--

LOCK TABLES `daily_activities` WRITE;
/*!40000 ALTER TABLE `daily_activities` DISABLE KEYS */;
INSERT INTO `daily_activities` VALUES (1,'นาย A','user.a@example.com','USER_A_001','วิ่งให้ได้ 5 กิโลเมตร','วิ่ง 5 กิโลเมตร','วิ่งในสวนลุมพินี รู้สึกดีมาก เหนื่อยแต่สดชื่น','2024-01-15 11:00:00','2025-08-05 06:30:08'),(2,'นาย A','user.a@example.com','USER_A_001','ออกกำลังกาย 30 นาที','ยิม 30 นาที','เล่นเครื่องออกกำลังกายที่ฟิตเนส','2024-01-16 12:30:00','2025-08-05 06:30:08'),(3,'นาย A','user.a@example.com','USER_A_001','วิ่งให้ได้ 5 กิโลเมตร','วิ่ง 3 กิโลเมตร','วิ่งไม่ครบตามเป้า แต่ก็พอใจ','2024-01-17 10:45:00','2025-08-05 06:30:08'),(4,'นาง B','user.b@example.com','USER_B_002','อ่านหนังสือ 1 ชั่วโมง','อ่านนิยาย','อ่านนิยายเรื่องใหม่ สนุกมาก','2024-01-15 13:00:00','2025-08-05 06:30:08'),(5,'นาง B','user.b@example.com','USER_B_002','ทำอาหารเอง','ทำส้มตำ','ทำส้มตำให้ครอบครัว อร่อยมาก','2024-01-16 05:30:00','2025-08-05 06:30:08'),(6,'นาย C','user.c@example.com','USER_C_003','เรียนภาษาอังกฤษ 1 ชั่วโมง','เรียน Grammar','เรียนเรื่อง Past Tense จาก YouTube','2024-01-15 14:00:00','2025-08-05 06:30:08'),(7,'นาย C','user.c@example.com','USER_C_003','ออกกำลังกาย','วิ่ง 2 กิโลเมตร','วิ่งรอบหมู่บ้าน เหนื่อยแต่สบายใจ','2024-01-15 23:30:00','2025-08-05 06:30:08'),(8,'นาย C','user.c@example.com','USER_C_003','เรียนภาษาอังกฤษ 1 ชั่วโมง','ท่องศัพท์','ท่องศัพท์ใหม่ 20 คำ','2024-01-17 13:30:00','2025-08-05 06:30:08'),(9,'นาย D','user.d@example.com','USER_D_004','เขียนโค้ด 2 ชั่วโมง','เขียน API','เขียน API สำหรับโปรเจค MyDailyGoal','2024-01-18 07:30:00','2025-08-05 06:30:08');
/*!40000 ALTER TABLE `daily_activities` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-06 14:21:06
