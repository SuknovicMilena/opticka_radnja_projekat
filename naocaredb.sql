-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2017 at 11:17 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `naocaredb`
--

-- --------------------------------------------------------

--
-- Table structure for table `kontaktna_sociva`
--

CREATE TABLE `kontaktna_sociva` (
  `id` int(11) NOT NULL,
  `ime` varchar(10) NOT NULL,
  `proizvodjac_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kontaktna_sociva`
--

INSERT INTO `kontaktna_sociva` (`id`, `ime`, `proizvodjac_id`) VALUES
(1, 'Meka', 38),
(2, 'tvrda', 40),
(3, 'milena', 41);

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE `korisnici` (
  `id_korisnika` int(11) NOT NULL,
  `ime` varchar(11) NOT NULL,
  `prezime` varchar(11) NOT NULL,
  `lozinka` varchar(11) NOT NULL,
  `email` varchar(25) NOT NULL,
  `login_token` varchar(50) DEFAULT NULL,
  `rola` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`id_korisnika`, `ime`, `prezime`, `lozinka`, `email`, `login_token`, `rola`) VALUES
(1, 'milena', 'suknovic', 'milena', 'milena@milena.com', 'B9BDBBAA-E50B-4722-BBB7-1E04F413041D', 'admin'),
(2, 'milica', 'suknovic', 'milica', 'milica@milica.com', '1D2744C3-25E5-4D70-9520-D994B17A6880', 'prodavac');

-- --------------------------------------------------------

--
-- Table structure for table `naocare_za_sunce`
--

CREATE TABLE `naocare_za_sunce` (
  `id` int(11) NOT NULL,
  `ime` varchar(25) NOT NULL,
  `proizvodjac_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `naocare_za_sunce`
--

INSERT INTO `naocare_za_sunce` (`id`, `ime`, `proizvodjac_id`) VALUES
(2311, 'AVANGLION 201 C14M', 2),
(2312, 'Flower', 38),
(2313, 'SunKiss', 2),
(2315, 'Cat', 38),
(2316, '', 3),
(2317, 'f2', 2),
(2318, 'test', 2);

-- --------------------------------------------------------

--
-- Table structure for table `naocare_za_vid`
--

CREATE TABLE `naocare_za_vid` (
  `id` int(11) NOT NULL,
  `ime` varchar(25) NOT NULL,
  `proizvodjac_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `naocare_za_vid`
--

INSERT INTO `naocare_za_vid` (`id`, `ime`, `proizvodjac_id`) VALUES
(6, 'Avang', 2),
(8, 'Cat ', 41),
(9, 'test', 2);

-- --------------------------------------------------------

--
-- Table structure for table `proizvodjac`
--

CREATE TABLE `proizvodjac` (
  `proizvodjac_id` int(11) NOT NULL,
  `ime` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proizvodjac`
--

INSERT INTO `proizvodjac` (`proizvodjac_id`, `ime`) VALUES
(2, 'Avanglion'),
(3, 'RayBan'),
(38, 'Armani'),
(39, 'Dior'),
(40, 'Michael Kors'),
(41, 'Cavalli');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kontaktna_sociva`
--
ALTER TABLE `kontaktna_sociva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proizvodjac_id` (`proizvodjac_id`,`ime`) USING BTREE;

--
-- Indexes for table `naocare_za_sunce`
--
ALTER TABLE `naocare_za_sunce`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proizvodjac_id` (`proizvodjac_id`) USING BTREE;

--
-- Indexes for table `naocare_za_vid`
--
ALTER TABLE `naocare_za_vid`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proizvodjac_id` (`proizvodjac_id`) USING BTREE;

--
-- Indexes for table `proizvodjac`
--
ALTER TABLE `proizvodjac`
  ADD PRIMARY KEY (`proizvodjac_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kontaktna_sociva`
--
ALTER TABLE `kontaktna_sociva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `naocare_za_sunce`
--
ALTER TABLE `naocare_za_sunce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2319;
--
-- AUTO_INCREMENT for table `naocare_za_vid`
--
ALTER TABLE `naocare_za_vid`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `proizvodjac`
--
ALTER TABLE `proizvodjac`
  MODIFY `proizvodjac_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `kontaktna_sociva`
--
ALTER TABLE `kontaktna_sociva`
  ADD CONSTRAINT `kontaktna_sociva_ibfk_1` FOREIGN KEY (`proizvodjac_id`) REFERENCES `proizvodjac` (`proizvodjac_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `naocare_za_sunce`
--
ALTER TABLE `naocare_za_sunce`
  ADD CONSTRAINT `naocare_za_sunce_ibfk_1` FOREIGN KEY (`proizvodjac_id`) REFERENCES `proizvodjac` (`proizvodjac_id`);

--
-- Constraints for table `naocare_za_vid`
--
ALTER TABLE `naocare_za_vid`
  ADD CONSTRAINT `naocare_za_vid_ibfk_1` FOREIGN KEY (`proizvodjac_id`) REFERENCES `proizvodjac` (`proizvodjac_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
