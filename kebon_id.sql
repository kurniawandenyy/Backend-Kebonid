-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 09 Jan 2020 pada 04.00
-- Versi server: 10.1.38-MariaDB
-- Versi PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kebon_id`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart`
--

CREATE TABLE `cart` (
  `id` varchar(50) NOT NULL,
  `customer_id` varchar(50) DEFAULT NULL,
  `product_id` varchar(50) DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `amount` int(11) NOT NULL DEFAULT '0',
  `price` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `cart`
--

INSERT INTO `cart` (`id`, `customer_id`, `product_id`, `product_name`, `amount`, `price`) VALUES
('1', '1', '1', 'sayur', 1, 1000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `address` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`id`, `name`, `photo`, `phone`, `address`) VALUES
('1', 'Deny', '', NULL, NULL),
('2e662f5a-1efb-4858-9413-510a451c719c', 'undefined', 'profil.jpg', 'undefined', 'undefined');

-- --------------------------------------------------------

--
-- Struktur dari tabel `message`
--

CREATE TABLE `message` (
  `id` varchar(50) NOT NULL,
  `sender_id` varchar(50) NOT NULL,
  `receiver_id` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `message`
--

INSERT INTO `message` (`id`, `sender_id`, `receiver_id`, `message`, `date`) VALUES
('1', '1', '123', 'Halo', '2020-01-08 06:59:40'),
('123', '2e662f5a-1efb-4858-9413-510a451c719c', '122', 'b37d149d7ac13a281bc524e684c73b61', '2020-01-08 13:57:12'),
('2', '1', '123', 'Heii', '2020-01-08 06:59:40'),
('bbe3a5a5-30b4-441b-a063-28f9166d1737', '1', '123', 'Holaa', '2020-01-08 07:36:38'),
('c7181b00-1ded-4795-8acf-56529e65a705', '2e662f5a-1efb-4858-9413-510a451c719c', '123', 'mosi mosi', '2020-01-08 14:58:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` varchar(50) NOT NULL,
  `seller_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `description` text,
  `stock` int(11) NOT NULL DEFAULT '0',
  `price` double NOT NULL DEFAULT '0',
  `date_created` timestamp NULL DEFAULT NULL,
  `date_updated` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `seller_id`, `name`, `photo`, `description`, `stock`, `price`, `date_created`, `date_updated`) VALUES
('1', '1', 'Sayur', '', NULL, 12, 1000, NULL, NULL),
('2', '1', 'Beras', '', NULL, 100, 98000, NULL, NULL),
('a3dcc072-b777-4d84-bafb-df6183f2037f', '1', 'Jagung', 'photo-1578491590993.jpg', 'ini jagung', 12, 25000, '2020-01-08 13:53:11', '2020-01-08 13:53:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sellers`
--

CREATE TABLE `sellers` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `address` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `sellers`
--

INSERT INTO `sellers` (`id`, `name`, `photo`, `phone`, `address`) VALUES
('1', 'jo', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction`
--

CREATE TABLE `transaction` (
  `id` varchar(50) NOT NULL,
  `customer_id` varchar(50) DEFAULT NULL,
  `product_id` varchar(50) DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `amount` int(11) DEFAULT '0',
  `price` double NOT NULL DEFAULT '0',
  `status` varchar(10) DEFAULT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `transaction`
--

INSERT INTO `transaction` (`id`, `customer_id`, `product_id`, `product_name`, `amount`, `price`, `status`, `transaction_date`) VALUES
('4748bd02-4c56-4513-8e4f-7030c4e8679a', '1', '1', 'Pupuk', 3, 10000, 'success', '2020-01-08 02:55:00'),
('7a4197f9-3999-4c73-af40-bdc095d7575f', '1', '1', 'Bibit Jagung', 2, 12000, 'success', '2020-01-08 02:46:38'),
('a798a70a-c11a-4dc8-b561-0d30f6a7624e', '1', '1', 'Beras', 2, 98000, 'success', '2020-01-08 13:12:31'),
('c2dd749d-9da4-446f-9b0c-46c6404071bf', '1', '1', 'Jagung', 12, 24000, 'success', '2020-01-08 02:46:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_seller` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `is_seller`) VALUES
('1', 'email@gmail.com', '123', 0),
('2e662f5a-1efb-4858-9413-510a451c719c', 'user1@gmail.com', '$2a$10$HCAtLOf6XvY1qsEAswjot.EdXmHddX5FxHECx6tjnHhkfE6/5k2Mq', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `wishlist`
--

CREATE TABLE `wishlist` (
  `id` varchar(50) NOT NULL,
  `customer_id` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `wishlist`
--

INSERT INTO `wishlist` (`id`, `customer_id`, `product_id`) VALUES
('7092fad9-7447-443f-8539-340b325ccab1', '2e662f5a-1efb-4858-9413-510a451c719c', 'a3dcc072-b777-4d84-bafb-df6183f2037f');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`,`product_id`),
  ADD KEY `cart_ibfk_3` (`product_id`);

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indeks untuk tabel `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`,`product_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sellers`
--
ALTER TABLE `sellers`
  ADD CONSTRAINT `sellers_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `cart` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
