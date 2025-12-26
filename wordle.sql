-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 21 déc. 2025 à 15:46
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `wordle`
--

-- --------------------------------------------------------

--
-- Structure de la table `difficulty`
--

DROP TABLE IF EXISTS `difficulty`;
CREATE TABLE IF NOT EXISTS `difficulty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `difficulty_label` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `min_letters` int NOT NULL,
  `max_letters` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `difficulty`
--

INSERT INTO `difficulty` (`id`, `difficulty_label`, `min_letters`, `max_letters`) VALUES
(1, 'Easy', 5, 6),
(2, 'Medium', 6, 7),
(3, 'Hard', 7, 8),
(4, 'Expert', 8, 10);

-- --------------------------------------------------------

--
-- Structure de la table `game`
--

DROP TABLE IF EXISTS `game`;
CREATE TABLE IF NOT EXISTS `game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `word_id` int NOT NULL,
  `user_id` int NOT NULL,
  `difficulty_id` int NOT NULL,
  `mode_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_games_word` (`word_id`),
  KEY `fk_games_user` (`user_id`),
  KEY `fk_games_difficulty` (`difficulty_id`),
  KEY `fk_games_mode` (`mode_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `game`
--

INSERT INTO `game` (`id`, `word_id`, `user_id`, `difficulty_id`, `mode_id`) VALUES
(1, 1, 1, 1, 1),
(2, 2, 3, 1, 2),
(3, 3, 5, 2, 1),
(4, 4, 2, 2, 2),
(5, 5, 7, 1, 1),
(6, 6, 4, 2, 2),
(7, 7, 8, 3, 1),
(8, 8, 2, 3, 2),
(9, 9, 9, 2, 1),
(10, 10, 6, 1, 1),
(11, 11, 1, 2, 2),
(12, 12, 3, 3, 1),
(13, 13, 4, 3, 2),
(14, 14, 5, 2, 1),
(15, 15, 10, 1, 2),
(16, 16, 9, 4, 1),
(17, 17, 7, 4, 2),
(18, 18, 8, 3, 1),
(19, 19, 6, 3, 2),
(20, 20, 2, 4, 1),
(21, 21, 3, 4, 2),
(22, 22, 5, 3, 1),
(23, 23, 9, 2, 1),
(24, 24, 7, 1, 2),
(25, 25, 4, 2, 1),
(26, 26, 10, 4, 2),
(27, 27, 8, 3, 1),
(28, 28, 6, 2, 2),
(29, 29, 1, 4, 1),
(30, 30, 2, 3, 1),
(31, 1, 15, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `mode`
--

DROP TABLE IF EXISTS `mode`;
CREATE TABLE IF NOT EXISTS `mode` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mode_label` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `mode`
--

INSERT INTO `mode` (`id`, `mode_label`) VALUES
(1, 'Classic'),
(2, 'Timed');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb3_unicode_ci NOT NULL,
  `google_id` int DEFAULT NULL,
  `nb_victories` int NOT NULL DEFAULT '0',
  `nb_games` int NOT NULL DEFAULT '0',
  `avg_attempts` float NOT NULL DEFAULT '100',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `google_id`, `nb_victories`, `nb_games`, `avg_attempts`, `is_admin`) VALUES
(2, 'alice', '$2b$10$HgMFmJk.ViIuf4wLqM$2b$10$HgMFmJk.ViIuf4wLqM', NULL, 3, 10, 4, 0),
(3, 'bob', '$2b$10$HgMFmJk.ViIuf4wLqM$2b$10$HgMFmJk.ViIuf4wLqM', NULL, 5, 12, 5, 0),
(4, 'charlie', '$2b$10$HgMFmJk.ViIuf4wLqM$2b$10$HgMFmJk.ViIuf4wLqM', NULL, 2, 8, 6, 0),
(5, 'david', '$2b$10$HgMFmJk.ViIuf4wLqM$2b$10$HgMFmJk.ViIuf4wLqM', NULL, 6, 15, 4.5, 0),
(6, 'emma', '$2b$10$HgMFmJk.ViIuf4wLqM$2b$10$HgMFmJk.ViIuf4wLqM', NULL, 4, 9, 5.5, 0),
(7, 'frank', '$2b$10$HgMFmJk.ViIuf4wLqM$2b$10$HgMFmJk.ViIuf4wLqM', NULL, 1, 6, 7, 0),
(8, 'grace', '$2b$10$HgMFmJk.ViIuf4wLqM$2b$10$HgMFmJk.ViIuf4wLqM', NULL, 7, 16, 4.2, 0),
(9, 'henry', '$2b$10$HgMFmJk.ViIuf4wLqM$2b$10$HgMFmJk.ViIuf4wLqM', NULL, 3, 11, 6.6, 0),
(10, 'isabel', '$2b$10$HgMFmJk.ViIuf4wLqM$2b$10$HgMFmJk.ViIuf4wLqM', NULL, 2, 7, 6.7, 0),
(11, 'jack', '$2b$10$HgMFmJk.ViIuf4wLqM$2b$10$HgMFmJk.ViIuf4wLqM', NULL, 5, 14, 5.1, 0),
(15, 'sakured', '$2b$10$HgMFmJk.ViIuf4wLqM1l5.J/ORD8JOiQH1v.EUt8paxvvE0zqIycm', NULL, 3, 3, 3.33333, 1),
(16, 'toto', '$2b$10$5UaDlyhbG3o6ga.UbZC2U.Mycq1Cyfw.Fpyq3zZhIywWmxsfxsOxO', NULL, 0, 0, 100, 0),
(17, 'tata', '$2b$10$A7gG/MZtwc5iLXvtj9x.QerEH0Rz326j0N4UlxcHINpuNlrixFpqG', NULL, 0, 0, 100, 0),
(19, 'tutu', '$2b$10$WErBGJ3sy54euc3XPb2HU.9UWKf6XFcCuwYFiCfUU0r2ORgZWqg8q', NULL, 0, 0, 100, 0),
(20, 'Louane Galois', '', 0, 0, 0, 100, 0);

-- --------------------------------------------------------

--
-- Structure de la table `word`
--

DROP TABLE IF EXISTS `word`;
CREATE TABLE IF NOT EXISTS `word` (
  `id` int NOT NULL AUTO_INCREMENT,
  `word` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `nb_letters` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `word`
--

INSERT INTO `word` (`id`, `word`, `nb_letters`) VALUES
(1, 'apple', 5),
(2, 'river', 5),
(3, 'storm', 5),
(4, 'light', 5),
(5, 'chair', 5),
(6, 'planet', 6),
(7, 'rocket', 6),
(8, 'forest', 6),
(9, 'silver', 6),
(10, 'bridge', 6),
(11, 'picture', 7),
(12, 'station', 7),
(13, 'journey', 7),
(14, 'captain', 7),
(15, 'freedom', 7),
(16, 'notebook', 8),
(17, 'building', 8),
(18, 'darkness', 8),
(19, 'calendar', 8),
(20, 'mountain', 8),
(21, 'chocolate', 9),
(22, 'adventure', 9),
(23, 'equipment', 9),
(24, 'character', 9),
(25, 'education', 9),
(26, 'understand', 10),
(27, 'background', 10),
(28, 'generation', 10),
(29, 'restaurant', 10),
(30, 'foundation', 10),
(34, 'building', 8),
(35, 'computer', 8);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
