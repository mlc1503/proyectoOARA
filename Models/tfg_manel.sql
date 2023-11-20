-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2023 at 02:59 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tfg_manel`
--
CREATE DATABASE IF NOT EXISTS `tfg_manel` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tfg_manel`;

-- --------------------------------------------------------

--
-- Table structure for table `imagenes`
--

CREATE TABLE `imagenes` (
  `imagen_id` int(11) NOT NULL,
  `captured_at` datetime NOT NULL,
  `project_id` int(11) NOT NULL,
  `filter` varchar(20) DEFAULT NULL,
  `exposure` decimal(2,2) NOT NULL,
  `image_type` varchar(20) DEFAULT NULL,
  `file` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `objetos`
--

CREATE TABLE `objetos` (
  `objeto_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `catalog` varchar(50) NOT NULL,
  `coord_DEC` varchar(20) NOT NULL,
  `coord_RA` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `objetos`
--

INSERT INTO `objetos` (`objeto_id`, `name`, `catalog`, `coord_DEC`, `coord_RA`) VALUES
(0, 'Andromeda Galaxy', 'Messier 31', '00h,42m,44.3s', '+41d,16m,09s'),
(1, 'North America Nebula', 'NGC 7000', '00:42:44.3', '+41d,16m,09s');

-- --------------------------------------------------------

--
-- Table structure for table `observaciones`
--

CREATE TABLE `observaciones` (
  `observacion_id` int(11) NOT NULL,
  `nombreObservacion` varchar(50) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `observe_startdate` date NOT NULL,
  `integration_totalTime` decimal(10,0) NOT NULL,
  `observed_object` int(11) NOT NULL,
  `telescopeUsed` int(11) NOT NULL,
  `filters` varchar(20) NOT NULL,
  `progress` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `observaciones`
--

INSERT INTO `observaciones` (`observacion_id`, `nombreObservacion`, `created_by`, `created_at`, `observe_startdate`, `integration_totalTime`, `observed_object`, `telescopeUsed`, `filters`, `progress`) VALUES
(0, 'test1', 1, '2023-10-10', '2023-10-10', 50, 0, 0, 'L,Ha,RGB,Sii,Oiii', 46),
(1, 'test2', 1, '2023-10-10', '2023-10-10', 50, 1, 0, 'L,Ha,RGB,Sii,Oiii', 46),
(2, 'dsgfs', 1, '2023-11-17', '1998-05-10', 13, 1, 3, 'RGB', 16),
(3, 'dsgfs2', 1, '2023-11-17', '1998-05-10', 13, 1, 3, 'RGB', 90);

-- --------------------------------------------------------

--
-- Table structure for table `reservas`
--

CREATE TABLE `reservas` (
  `reserva_id` int(11) NOT NULL,
  `email` varchar(70) NOT NULL,
  `dateReservation` date NOT NULL,
  `fullName` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `telescopios`
--

CREATE TABLE `telescopios` (
  `telescope_id` int(11) NOT NULL,
  `nombreTel` varchar(20) NOT NULL,
  `fl` int(4) NOT NULL,
  `apert` decimal(5,2) NOT NULL,
  `fullName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `telescopios`
--

INSERT INTO `telescopios` (`telescope_id`, `nombreTel`, `fl`, `apert`, `fullName`) VALUES
(0, 'TAK FSQ130', 650, 5.00, 'Takahashi FSQ130'),
(1, 'ROK 135F2', 135, 2.00, 'Rokinon DSLR FF'),
(2, 'SW 72ED', 420, 5.80, 'SkyWatcher Evostar 72ED'),
(3, 'OM RC Pro', 2432, 8.00, 'Omegon Ritchey-Chretien Pro');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `user_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`user_id`, `username`, `pass`, `email`, `role`) VALUES
(1, 'manel', '1234', '1234', 1),
(2, 'test1', 'test1', 'test1', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`imagen_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `objetos`
--
ALTER TABLE `objetos`
  ADD PRIMARY KEY (`objeto_id`);

--
-- Indexes for table `observaciones`
--
ALTER TABLE `observaciones`
  ADD PRIMARY KEY (`observacion_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `observed_object` (`observed_object`),
  ADD KEY `telescopeUsed` (`telescopeUsed`);

--
-- Indexes for table `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`reserva_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `telescopios`
--
ALTER TABLE `telescopios`
  ADD PRIMARY KEY (`telescope_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `observaciones` (`observacion_id`);

--
-- Constraints for table `observaciones`
--
ALTER TABLE `observaciones`
  ADD CONSTRAINT `observaciones_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`user_id`),
  ADD CONSTRAINT `observaciones_ibfk_2` FOREIGN KEY (`observed_object`) REFERENCES `objetos` (`objeto_id`),
  ADD CONSTRAINT `observaciones_ibfk_3` FOREIGN KEY (`telescopeUsed`) REFERENCES `telescopios` (`telescope_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
