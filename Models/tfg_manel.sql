-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2023 at 04:46 AM
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
CREATE DATABASE IF NOT EXISTS `tfg_manel` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `tfg_manel`;

-- --------------------------------------------------------

--
-- Table structure for table `imagenes`
--

CREATE TABLE `imagenes` (
  `imagen_id` int(11) NOT NULL,
  `captured_at` datetime NOT NULL,
  `project_id` int(11) NOT NULL,
  `filter` varchar(20) NOT NULL,
  `exposure` decimal(2,2) NOT NULL,
  `image_type` varchar(20) NOT NULL,
  `file` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `objetos`
--

INSERT INTO `objetos` (`objeto_id`, `name`, `catalog`, `coord_DEC`, `coord_RA`) VALUES
(1, 'Andromeda Galaxy', 'Messier 31', '00h,42m,44.3s', '+41d,16m,09s'),
(2, 'North America Nebula', 'NGC 7000', '00:42:44.3', '+41d,16m,09s');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `observaciones`
--

INSERT INTO `observaciones` (`observacion_id`, `nombreObservacion`, `created_by`, `created_at`, `observe_startdate`, `integration_totalTime`, `observed_object`, `telescopeUsed`, `filters`, `progress`) VALUES
(1, 'test1', 1, '2023-11-30', '2023-11-30', 50, 1, 1, 'L,Ha,RGB,Sii,Oiii', 46),
(3, 'fdafd', 1, '2023-11-25', '2023-12-07', 235, 2, 2, 'RGB', 16),
(4, 'fdafd', 1, '2023-11-25', '2023-12-07', 235, 2, 3, 'RGB', 90),
(5, 'fdafd', 1, '2023-11-25', '2023-12-07', 235, 2, 4, 'RGB', 35),
(6, 'fdafd', 1, '2023-11-25', '2023-12-14', 235, 2, 4, 'RGB', 96),
(7, 'agfdsg', 4, '2023-11-25', '2023-11-29', 55, 1, 1, 'RGB', 92);

-- --------------------------------------------------------

--
-- Table structure for table `reservas`
--

CREATE TABLE `reservas` (
  `reserva_id` int(11) NOT NULL,
  `email` varchar(70) NOT NULL,
  `dateReservation` date NOT NULL,
  `fullName` varchar(70) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `tipoReserva` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `reservas`
--

INSERT INTO `reservas` (`reserva_id`, `email`, `dateReservation`, `fullName`, `dni`, `tipoReserva`) VALUES
(1, 'd@d.com', '2023-11-29', 'asf', '82286739F', 3),
(2, 'a@a2.com', '2023-11-30', 'maskf', '25971726B', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `telescopios`
--

INSERT INTO `telescopios` (`telescope_id`, `nombreTel`, `fl`, `apert`, `fullName`) VALUES
(1, 'TAK FSQ130', 650, 5.00, 'Takahashi FSQ130'),
(2, 'ROK 135F2', 135, 2.00, 'Rokinon DSLR FF'),
(3, 'SW 72ED', 420, 5.80, 'SkyWatcher Evostar 72ED'),
(4, 'OM RC Pro', 2432, 8.00, 'Omegon Ritchey-Chretien Pro');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `user_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `email` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`user_id`, `username`, `pass`, `email`) VALUES
(1, 'manel', '1234', 'a@a.com'),
(2, 'test1', 'test1', 'b@b.com'),
(4, 'mlc', '1234', 'c@c.com');

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
  ADD KEY `telescopeUsed` (`telescopeUsed`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `observed_object` (`observed_object`);

--
-- Indexes for table `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`reserva_id`),
  ADD UNIQUE KEY `dni` (`dni`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `imagen_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `objetos`
--
ALTER TABLE `objetos`
  MODIFY `objeto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `observaciones`
--
ALTER TABLE `observaciones`
  MODIFY `observacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reservas`
--
ALTER TABLE `reservas`
  MODIFY `reserva_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `telescopios`
--
ALTER TABLE `telescopios`
  MODIFY `telescope_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  ADD CONSTRAINT `observaciones_ibfk_1` FOREIGN KEY (`telescopeUsed`) REFERENCES `telescopios` (`telescope_id`),
  ADD CONSTRAINT `observaciones_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`user_id`),
  ADD CONSTRAINT `observaciones_ibfk_3` FOREIGN KEY (`observed_object`) REFERENCES `objetos` (`objeto_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
