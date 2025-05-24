-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-05-2025 a las 20:13:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gam`
--
CREATE DATABASE IF NOT EXISTS `gam` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gam`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `external_id` varchar(100) NOT NULL,
  `comment` text NOT NULL,
  `commented_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `external_id`, `comment`, `commented_at`) VALUES
(14, 1, '52991', 'El mejor', '2025-05-23 17:49:41'),
(16, 2, '52991', 'Hola', '2025-05-23 17:54:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `follows`
--

CREATE TABLE `follows` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `followed_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `follows`
--

INSERT INTO `follows` (`id`, `user_id`, `followed_id`, `created_at`) VALUES
(14, 1, 2, '2025-05-23 17:58:47'),
(15, 1, 3, '2025-05-23 17:58:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `library`
--

CREATE TABLE `library` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `external_id` varchar(100) NOT NULL,
  `content_type` varchar(50) NOT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `library`
--

INSERT INTO `library` (`id`, `user_id`, `external_id`, `content_type`, `rating`, `position`, `added_at`) VALUES
(18, 1, '52991', 'anime', 10.0, 1, '2025-05-23 17:49:45'),
(19, 1, '60022', 'anime', 7.0, 0, '2025-05-23 17:50:07'),
(20, 1, '2904', 'anime', 9.5, 6, '2025-05-23 17:50:29'),
(21, 1, '49918', 'anime', 10.0, 2, '2025-05-23 17:50:58'),
(22, 1, '31240', 'anime', 10.0, 3, '2025-05-23 17:51:29'),
(23, 1, '13', 'manga', 10.0, 4, '2025-05-23 17:52:36'),
(24, 2, '52991', 'anime', 10.0, 0, '2025-05-23 17:55:07'),
(25, 2, '51535', 'anime', 9.0, 0, '2025-05-23 17:55:21'),
(26, 2, '43608', 'anime', 10.0, 0, '2025-05-23 17:55:41'),
(27, 2, '50273', 'anime', 9.0, 0, '2025-05-23 17:55:50'),
(28, 2, '90125', 'manga', 10.0, 0, '2025-05-23 17:56:53'),
(29, 3, '21', 'anime', 10.0, 0, '2025-05-23 17:57:55'),
(30, 3, '51009', 'anime', 9.0, 0, '2025-05-23 17:58:09'),
(31, 3, '96792', 'manga', 9.0, 0, '2025-05-23 17:58:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `auth_token` varchar(255) DEFAULT NULL,
  `avatar_image` longblob DEFAULT NULL,
  `banner_image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_content_index` (`external_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`followed_id`),
  ADD KEY `followed_id` (`followed_id`);

--
-- Indices de la tabla `library`
--
ALTER TABLE `library`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`external_id`,`content_type`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `follows`
--
ALTER TABLE `follows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `library`
--
ALTER TABLE `library`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`followed_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `library`
--
ALTER TABLE `library`
  ADD CONSTRAINT `library_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
