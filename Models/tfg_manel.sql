-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2023 at 10:50 AM
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
  `captured_at` date NOT NULL,
  `project_id` int(11) NOT NULL,
  `file` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `imagenes`
--

INSERT INTO `imagenes` (`imagen_id`, `captured_at`, `project_id`, `file`) VALUES
(2, '2023-12-27', 11, '../Resources/m42-(19.20).2.2023_ToLRM-2.png'),
(3, '2023-12-27', 12, '../Resources/californiaDetail.jpg'),
(4, '2023-12-27', 24, '../Resources/iss_luckyImaging.png'),
(6, '2023-12-27', 20, '../Resources/luna_crater.jpg');

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
(2, 'Nebulosa Norteamérica', 'NGC 7000', '00:42:44.3', '+41d,16m,09s'),
(3, 'Nebulosa de Orión', 'Messier 42', '05h 35m 17s', '-05° 23\' 28\"'),
(4, 'Pléyades', 'Messier 45', '03h 47m 24s', '+36° 27\' 36\"'),
(5, 'Nebulosa del Velo', 'NGC 6995', '20 56 18s', '+31° 43\' 00\"'),
(6, 'Horsehead Nebula', 'IC 434', '05h 40m 59s', '-02° 27\' 30\"'),
(7, 'California Nebula', 'NGC 1499', '04h 00m 00s', '+36° 30\' 00\"'),
(8, 'Clúster de Hércules', 'Messier 13', '16h 41m 41s', '+36° 27\' 36\"'),
(9, 'La Luna', 'N/A', 'N/A', 'N/A'),
(10, 'Júpiter', 'N/A', 'N/A', 'N/A'),
(11, 'Saturno', 'N/A', 'N/A', 'N/A'),
(12, 'Marte', 'N/A', 'N/A', 'N/A'),
(13, 'Urano', 'N/A', 'N/A', 'N/A'),
(14, 'Estación Espacial', 'N/A', 'N/A', 'N/A'),
(16, 'Lorem Ipsum', 'N/A', 'N/A', 'N/A'),
(17, 'Galaxia del Triángulo', 'Messier 33', '01h33m54s', '30°39\'27\"'),
(18, 'Galaxia del Triángulo', 'Messier 33', '01h33m54s', '30°39\'27\"');

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
(8, 'Norteamérica en RGB', 1, '2023-11-30', '2024-08-14', 40, 2, 3, 'L,RGB', 100),
(10, 'Nebulosa del Velo en doble banda', 1, '2023-11-30', '2023-12-14', 75, 5, 1, 'L,Oiii,Ha', 94),
(11, 'Núcleo de Orión', 1, '2023-11-30', '2023-12-25', 120, 3, 4, 'L,RGB', 36),
(12, 'California en detalle', 1, '2023-11-30', '2024-01-04', 120, 7, 1, 'L,Ha', 40),
(15, 'Orión en infrarrojos', 1, '2023-12-01', '2023-11-23', 0, 1, 4, 'L', 91),
(18, 'Urano en infrarrojos', 1, '2023-12-05', '2024-01-06', 1, 13, 4, 'L,RGB,Ha', 47),
(19, 'Lorem Ipsum', 1, '2023-12-05', '2023-12-13', 2, 16, 3, 'L,RGB', 52),
(20, 'The Southern Lunar Limb', 6, '2023-12-05', '2023-12-26', 1, 9, 4, 'RGB', 86),
(21, 'Pléyades a color', 6, '2023-12-05', '2023-12-26', 6, 4, 3, 'L,RGB', 85),
(23, 'Galaxia del Triángulo', 6, '2023-12-05', '2023-12-21', 211, 17, 3, 'L,RGB,Ha', 18),
(24, 'Estación Espacial Internacional', 6, '2023-12-05', '2023-12-27', 1, 14, 4, 'RGB', 67);

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
(15, 'dskjfdskfs@es.es', '0000-00-00', 'NSSLSKDKDJFSKDS', '16629099F', 2);

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
(6, 'lorem', '1234', 'x1@a.com');

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
  MODIFY `imagen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `objetos`
--
ALTER TABLE `objetos`
  MODIFY `objeto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `observaciones`
--
ALTER TABLE `observaciones`
  MODIFY `observacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `reservas`
--
ALTER TABLE `reservas`
  MODIFY `reserva_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `telescopios`
--
ALTER TABLE `telescopios`
  MODIFY `telescope_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
