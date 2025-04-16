-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 16. 16:25
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `teaching_website_db`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` enum('Admin','Teacher','Student') NOT NULL DEFAULT 'Admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Brandon Kirlin', 'Angela@citromail.com', '$2b$10$fTunvdOrytMLdqssLwBpfO8Dm3WvRh79pnjFaIVEBiBsz5bAcHMYS', 'Admin');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `assignment`
--

CREATE TABLE `assignment` (
  `id` int(11) NOT NULL,
  `subject` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `ageGroup` varchar(191) NOT NULL,
  `teacherId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `assignment`
--

INSERT INTO `assignment` (`id`, `subject`, `name`, `description`, `ageGroup`, `teacherId`) VALUES
(1, 'Literature', 'Lanthanum előállítás feladat', 'waist junkie  🤚🏻', 'High', 14),
(2, 'Maths', 'Germanium előállítás feladat', 'sunbeam devotee', 'Elementary', 11),
(3, 'Maths', 'Gold előállítás feladat', 'detective fan  🎯', 'Elementary', 8),
(4, 'English', 'Selenium előállítás feladat', 'provision devotee  ✊🏾', 'High', 7),
(5, 'History', 'Caesium előállítás feladat', 'entrepreneur, grad, student 🙌🏼', 'Elementary', 10),
(6, 'English', 'Sodium előállítás feladat', 'adult enthusiast, singer', 'Elementary', 5),
(7, 'English', 'Hassium előállítás feladat', 'person, author, founder', 'University', 20),
(8, 'Maths', 'Protactinium előállítás feladat', 'avalanche enthusiast, parent 🍧', 'Elementary', 2),
(9, 'Science', 'Cadmium előállítás feladat', 'dream fan', 'High', 11),
(10, 'Science', 'Gadolinium előállítás feladat', 'e-mail supporter  🇨🇼', 'Elementary', 5),
(11, 'Literature', 'Terbium előállítás feladat', 'complication junkie, activist', 'Secondary', 8),
(12, 'Compsci', 'Phosphorus előállítás feladat', 'dream supporter, grad 😪', 'Secondary', 3),
(13, 'Compsci', 'Selenium előállítás feladat', 'public speaker, public speaker, foodie', 'Elementary', 17),
(14, 'Science', 'Rubidium előállítás feladat', 'leader', 'Secondary', 5),
(15, 'English', 'Barium előállítás feladat', 'teacher, grad, musician', 'University', 9),
(16, 'Maths', 'Zinc előállítás feladat', 'vanadyl junkie, inventor', 'Elementary', 13),
(17, 'Compsci', 'Neodymium előállítás feladat', 'experience enthusiast, blogger', 'University', 8),
(18, 'Science', 'Neptunium előállítás feladat', 'friend', 'Secondary', 8),
(19, 'Science', 'Barium előállítás feladat', 'jellyfish enthusiast  🚊', 'High', 3),
(20, 'Maths', 'Plutonium előállítás feladat', 'educator', 'Elementary', 12),
(21, 'English', 'Zirconium előállítás feladat', 'patriot, public speaker', 'Secondary', 19),
(22, 'Science', 'Europium előállítás feladat', 'cutlet advocate', 'Elementary', 8),
(23, 'Maths', 'Copernicium előállítás feladat', 'fog lover, student 🚁', 'High', 17),
(24, 'Literature', 'Lutetium előállítás feladat', 'student, film lover, writer', 'High', 16),
(25, 'Maths', 'Nihonium előállítás feladat', 'scenario lover', 'Elementary', 8),
(26, 'Compsci', 'Holmium előállítás feladat', 'majority lover, musician 🥴', 'Elementary', 17),
(27, 'History', 'Gallium előállítás feladat', 'collaboration enthusiast  🖥️', 'Secondary', 5),
(28, 'Literature', 'Hafnium előállítás feladat', 'writer, public speaker, foodie 👳🏽‍♀️', 'Secondary', 1),
(29, 'Science', 'Gadolinium előállítás feladat', 'unique enthusiast, creator', 'University', 9),
(30, 'English', 'Terbium előállítás feladat', 'film lover, singer', 'Elementary', 16),
(31, 'English', 'Osmium előállítás feladat', 'film lover, leader, entrepreneur 🇭🇰', 'University', 14),
(32, 'Science', 'Silver előállítás feladat', 'citizen junkie, friend', 'High', 8),
(33, 'Literature', 'Yttrium előállítás feladat', 'singer, developer, scientist', 'University', 7),
(34, 'History', 'Francium előállítás feladat', 'validity lover  🍈', 'University', 13),
(35, 'Science', 'Manganese előállítás feladat', 'affect advocate, dreamer 😏', 'Elementary', 6),
(36, 'Literature', 'Hydrogen előállítás feladat', 'artist, activist, dreamer', 'Secondary', 13),
(37, 'Compsci', 'Barium előállítás feladat', 'veteran', 'Elementary', 8),
(38, 'Compsci', 'Nitrogen előállítás feladat', 'arcade devotee, dreamer', 'Elementary', 6),
(39, 'History', 'Cerium előállítás feladat', 'teacher, inventor, friend', 'High', 6),
(40, 'English', 'Hassium előállítás feladat', 'educator', 'Secondary', 11),
(41, 'History', 'Lutetium előállítás feladat', 'entrepreneur, geek, nerd', 'Secondary', 8),
(42, 'Literature', 'Livermorium előállítás feladat', 'cannon supporter, film lover', 'Secondary', 9),
(43, 'Compsci', 'Ytterbium előállítás feladat', 'taxicab fan', 'Elementary', 20),
(44, 'Compsci', 'Neptunium előállítás feladat', 'teacher, writer, writer 🇸🇿', 'Secondary', 12),
(45, 'Compsci', 'Actinium előállítás feladat', 'patriot, model, entrepreneur', 'Secondary', 11),
(46, 'English', 'Neon előállítás feladat', 'vanadyl supporter', 'High', 14),
(47, 'Maths', 'Gold előállítás feladat', 'digestive devotee  🧍', 'High', 18),
(48, 'Literature', 'Tellurium előállítás feladat', 'fax enthusiast', 'Elementary', 7),
(49, 'Literature', 'Promethium előállítás feladat', 'filmmaker', 'University', 12),
(50, 'Science', 'Francium előállítás feladat', 'friend, gamer, writer 🖤', 'Elementary', 9),
(51, 'Maths', 'Rhenium előállítás feladat', 'poetry devotee, filmmaker 🦍', 'Secondary', 13),
(52, 'Literature', 'Argon előállítás feladat', 'swine advocate, parent', 'High', 9),
(53, 'History', 'Bismuth előállítás feladat', 'pine advocate', 'Elementary', 18),
(54, 'Science', 'Manganese előállítás feladat', 'cricket advocate, blogger', 'High', 2),
(55, 'Literature', 'Vanadium előállítás feladat', 'philosopher, philosopher, geek', 'Secondary', 3),
(56, 'Science', 'Iridium előállítás feladat', 'film lover', 'High', 19),
(57, 'Science', 'Strontium előállítás feladat', 'educator', 'Elementary', 9),
(58, 'Compsci', 'Nitrogen előállítás feladat', 'musician, writer', 'High', 1),
(59, 'Science', 'Roentgenium előállítás feladat', 'dreamer, entrepreneur, grad', 'Secondary', 12),
(60, 'Maths', 'Seaborgium előállítás feladat', 'wheel devotee, entrepreneur', 'University', 12),
(61, 'Compsci', 'Zinc előállítás feladat', 'singer', 'University', 17),
(62, 'Compsci', 'Einsteinium előállítás feladat', 'ceramics advocate, teacher', 'High', 12),
(63, 'Literature', 'Sodium előállítás feladat', 'patriot', 'Secondary', 12),
(64, 'Literature', 'Magnesium előállítás feladat', 'activist, entrepreneur, writer 🍩', 'Secondary', 11),
(65, 'Science', 'Europium előállítás feladat', 'opera lover', 'University', 5),
(66, 'Science', 'Selenium előállítás feladat', 'film lover, person', 'Elementary', 12),
(67, 'Maths', 'Yttrium előállítás feladat', 'foodie, streamer, streamer 🧵', 'Secondary', 4),
(68, 'Compsci', 'Promethium előállítás feladat', 'engineer', 'University', 2),
(69, 'English', 'Silicon előállítás feladat', 'leader', 'Secondary', 19),
(70, 'History', 'Lanthanum előállítás feladat', 'reach fan, photographer', 'Elementary', 8),
(71, 'Literature', 'Selenium előállítás feladat', 'hundred fan  🌼', 'High', 20),
(72, 'Maths', 'Livermorium előállítás feladat', 'patriot, leader', 'University', 5),
(73, 'Maths', 'Curium előállítás feladat', 'carnival junkie  🕖', 'Elementary', 13),
(74, 'Maths', 'Argon előállítás feladat', 'flat advocate, leader', 'University', 6),
(75, 'English', 'Seaborgium előállítás feladat', 'scientist, engineer', 'University', 10),
(76, 'Maths', 'Tungsten előállítás feladat', 'lady enthusiast, friend', 'Secondary', 6),
(77, 'History', 'Uranium előállítás feladat', 'veteran, environmentalist', 'Elementary', 2),
(78, 'Literature', 'Iodine előállítás feladat', 'packaging lover', 'High', 19),
(79, 'Maths', 'Californium előállítás feladat', 'bran supporter', 'University', 16),
(80, 'History', 'Roentgenium előállítás feladat', 'photographer, scientist', 'Secondary', 7),
(81, 'English', 'Neon előállítás feladat', 'championship lover, developer 🌃', 'Secondary', 2),
(82, 'Science', 'Scandium előállítás feladat', 'mountain supporter, veteran', 'Elementary', 12),
(83, 'Literature', 'Barium előállítás feladat', 'decision junkie', 'High', 3),
(84, 'Maths', 'Copper előállítás feladat', 'grad, activist, writer', 'Secondary', 6),
(85, 'Compsci', 'Chromium előállítás feladat', 'inventor, patriot, public speaker', 'Elementary', 9),
(86, 'History', 'Rhodium előállítás feladat', 'council lover', 'Secondary', 4),
(87, 'Compsci', 'Hafnium előállítás feladat', 'tarragon lover  🫐', 'Elementary', 7),
(88, 'Maths', 'Zirconium előállítás feladat', 'ecliptic advocate  ♊', 'High', 1),
(89, 'Literature', 'Magnesium előállítás feladat', 'dreamer', 'High', 19),
(90, 'Science', 'Astatine előállítás feladat', 'student', 'Secondary', 6),
(91, 'English', 'Potassium előállítás feladat', 'creator', 'Secondary', 8),
(92, 'Compsci', 'Xenon előállítás feladat', 'corral advocate', 'Elementary', 15),
(93, 'Compsci', 'Molybdenum előállítás feladat', 'patriot', 'Secondary', 16),
(94, 'Maths', 'Mendelevium előállítás feladat', 'business owner, photographer, public speaker 🎇', 'High', 12),
(95, 'Literature', 'Cerium előállítás feladat', 'teammate fan  🪁', 'Elementary', 1),
(96, 'Maths', 'Ruthenium előállítás feladat', 'tool enthusiast', 'High', 17),
(97, 'Maths', 'Lawrencium előállítás feladat', 'anticodon lover  ✡️', 'University', 20),
(98, 'Science', 'Chlorine előállítás feladat', 'hello devotee, philosopher 🧑🏿‍🚀', 'Secondary', 11),
(99, 'Compsci', 'Helium előállítás feladat', 'sanity enthusiast, designer 🇸🇾', 'Elementary', 10),
(100, 'Science', 'Radium előállítás feladat', 'casket advocate, philosopher 🏒', 'University', 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `ageGroup` enum('Elementary','Secondary','High','University') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `student`
--

INSERT INTO `student` (`id`, `ageGroup`) VALUES
(1, 'Elementary'),
(2, 'Elementary'),
(3, 'University'),
(4, 'High'),
(5, 'Secondary'),
(6, 'High'),
(7, 'University'),
(8, 'Secondary'),
(9, 'High'),
(10, 'Elementary'),
(11, 'Elementary'),
(12, 'Elementary'),
(13, 'Elementary'),
(14, 'University'),
(15, 'University'),
(16, 'High'),
(17, 'Secondary'),
(18, 'Secondary'),
(19, 'Elementary'),
(20, 'High');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `studentassignment`
--

CREATE TABLE `studentassignment` (
  `studentId` int(11) NOT NULL,
  `assignmentId` int(11) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `mark` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `studentassignmentfile`
--

CREATE TABLE `studentassignmentfile` (
  `assignmentId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `fileName` varchar(191) NOT NULL,
  `fileType` varchar(191) NOT NULL,
  `fileData` longblob NOT NULL,
  `uploadedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `subject` enum('Maths','History','Literature','English','Science','Compsci') NOT NULL,
  `hourlyRate` int(11) NOT NULL,
  `rating` double NOT NULL,
  `numberOfRatings` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `teacher`
--

INSERT INTO `teacher` (`id`, `subject`, `hourlyRate`, `rating`, `numberOfRatings`) VALUES
(1, 'Science', 69588, 6.9, 1),
(2, 'English', 15626, 8.1, 1),
(3, 'History', 8240, 8.6, 1),
(4, 'Literature', 39816, 1, 1),
(5, 'Science', 19951, 6.7, 1),
(6, 'Science', 65429, 6, 1),
(7, 'Science', 88706, 9.8, 1),
(8, 'Literature', 26952, 7.1, 1),
(9, 'Maths', 54425, 9.5, 1),
(10, 'Maths', 52336, 8.1, 1),
(11, 'Science', 72147, 5.1, 1),
(12, 'Compsci', 57492, 9.6, 1),
(13, 'English', 73828, 7.2, 1),
(14, 'Maths', 15719, 2.8, 1),
(15, 'English', 45421, 3.2, 1),
(16, 'History', 81568, 6.5, 1),
(17, 'English', 81677, 8.5, 1),
(18, 'Literature', 30097, 2.8, 1),
(19, 'Maths', 41181, 9, 1),
(20, 'Compsci', 30529, 2.5, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(191) NOT NULL,
  `lastName` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `role` enum('Admin','Teacher','Student') NOT NULL DEFAULT 'Student',
  `sTeacherId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `password`, `email`, `role`, `sTeacherId`) VALUES
(1, 'Yasmin', 'Abernathy', '$2b$10$siFmr6WfSMctZTxUiWJrYelxQcLkR1682rMG/S8ZXAok2hZ4MPngW', 'Abernathy.Yasmin@citromail.com', 'Student', 3),
(2, 'Berta', 'Medhurst', '$2b$10$GYrVSjwj45/x/g9wTg0IiuLCT5rmZtqAXnJyEd2b20LeN//7d0uS.', 'Medhurst.Berta@citromail.com', 'Student', 3),
(3, 'Prudence', 'Schroeder', '$2b$10$vMpf4R84E1KnQOjJbpjCL.418pG/gQoQ9cgp1oZgmYk3DVGJrdrPC', 'Schroeder.Prudence@citromail.com', 'Teacher', NULL),
(4, 'Flo', 'Zemlak', '$2b$10$T9FeujLgoONfs6kqzMwv8OnekH12Q5DBk.L8FACjhu1.gIBdzDt12', 'Zemlak.Flo@citromail.com', 'Teacher', NULL),
(5, 'Garnett', 'Kreiger', '$2b$10$1.dJmYV96v0TD7HCTPpU0O61uNvHr.hxaOCQMhLQLk5U1qP3KnVuS', 'Kreiger.Garnett@citromail.com', 'Student', NULL),
(6, 'Dewayne', 'Lowe', '$2b$10$lsbc5ExC6EkTYcpbJ7sSYOMjBLVnGdPrdTtUB9ns6bUNnQqrkmN6m', 'Lowe.Dewayne@citromail.com', 'Teacher', NULL),
(7, 'Einar', 'Wehner', '$2b$10$Q392PRE0gxz3QcWW9IvFleDmLAeen6ln7hkmrjmFusvT4cyYWH47i', 'Wehner.Einar@citromail.com', 'Student', 3),
(8, 'Felix', 'Lebsack', '$2b$10$ScnD3D9TOf/nsEUcjd1RK.PmXYk.Sgq3RA3ADCZxG01sXx9igVNha', 'Lebsack.Felix@citromail.com', 'Teacher', NULL),
(9, 'Ryann', 'Rath', '$2b$10$G3bsKw113raoiT0D3CHTpeN82Ygaf2xxFdtBpV2884YMCCrmikwSe', 'Rath.Ryann@citromail.com', 'Student', 3),
(10, 'Zechariah', 'Runte', '$2b$10$XAjGKbrFN8.FK/8atVRH6.p2Ky/mGzEmmpmimINlCqRKX4EDNhUqu', 'Runte.Zechariah@citromail.com', 'Student', 3),
(11, 'Eleanora', 'Feest', '$2b$10$U4bLPITEEHTOk79Xtj2AAuqR4hN2J.4uc44RGAmRNxz0Hy469g/ra', 'Feest.Eleanora@citromail.com', 'Teacher', NULL),
(12, 'Aubrey', 'Erdman', '$2b$10$EhuLpKGKkBk2x5Ev9z4jwO3D4J2YBrHWDyn42C4nGDaDrFWFW7Jmy', 'Erdman.Aubrey@citromail.com', 'Teacher', NULL),
(13, 'Kennedy', 'Stiedemann', '$2b$10$5WRD2Uadt/CiX.o66J622uIOquZp1I8rsY0iPg1MsfZgFwaIsV7hy', 'Stiedemann.Kennedy@citromail.com', 'Student', 3),
(14, 'Bonnie', 'Dooley', '$2b$10$i0tgmUiTOKOUVTJAoQzKLO5ahxYBzA7bV6LiycJ2ciHILXjG0l9Yi', 'Dooley.Bonnie@citromail.com', 'Student', NULL),
(15, 'Kelvin', 'Dare', '$2b$10$1k6QyH9znRHkLAzHbux9ceTX79EfHJdPdq4JiInRLJc9uUvgfFu3S', 'Dare.Kelvin@citromail.com', 'Teacher', NULL),
(16, 'Armando', 'Harvey', '$2b$10$3N467ko4kEUnq4fHd9/ZveVVyjyCX5vyJzv8vZoxrh2wPQhfyM3FC', 'Harvey.Armando@citromail.com', 'Teacher', NULL),
(17, 'Eli', 'McDermott', '$2b$10$n4Or1usANEOeyh0VslvUG.607KUvhiXaJhqHlLdV5PqEVXhN4vg02', 'McDermott.Eli@citromail.com', 'Teacher', NULL),
(18, 'Rick', 'Torphy', '$2b$10$O8EqAom7ira/YTYZFzIoAeI2GMqXAOLybHiLcYg7xJe32l7.o5cq2', 'Torphy.Rick@citromail.com', 'Teacher', NULL),
(19, 'Jaime', 'Wilkinson', '$2b$10$d1JmeGoraQwNE92Ni9ppIOpzIMSFfgWtTK6NpGlr8KenG7bHBUDNm', 'Wilkinson.Jaime@citromail.com', 'Student', NULL),
(20, 'Libby', 'Kemmer', '$2b$10$9ZbfFCjjkdNYnXEFGdxO6ORM52CLPAtcICDS4npTRzcyuHaCczYei', 'Kemmer.Libby@citromail.com', 'Student', NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Admin_email_key` (`email`);

--
-- A tábla indexei `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Assignment_teacherId_fkey` (`teacherId`);

--
-- A tábla indexei `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `studentassignment`
--
ALTER TABLE `studentassignment`
  ADD PRIMARY KEY (`studentId`,`assignmentId`),
  ADD KEY `StudentAssignment_assignmentId_fkey` (`assignmentId`);

--
-- A tábla indexei `studentassignmentfile`
--
ALTER TABLE `studentassignmentfile`
  ADD PRIMARY KEY (`studentId`,`assignmentId`),
  ADD KEY `StudentAssignmentFile_assignmentId_fkey` (`assignmentId`);

--
-- A tábla indexei `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `assignment`
--
ALTER TABLE `assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT a táblához `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `assignment`
--
ALTER TABLE `assignment`
  ADD CONSTRAINT `Assignment_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `Student_id_fkey` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `studentassignment`
--
ALTER TABLE `studentassignment`
  ADD CONSTRAINT `StudentAssignment_assignmentId_fkey` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `StudentAssignment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `studentassignmentfile`
--
ALTER TABLE `studentassignmentfile`
  ADD CONSTRAINT `StudentAssignmentFile_assignmentId_fkey` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `StudentAssignmentFile_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `Teacher_id_fkey` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
