-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2021 at 06:37 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `burapha_t_shirt`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_buy` (IN `buy_date` DATE, IN `buy_id` VARCHAR(5), IN `buy_status` VARCHAR(10))  BEGIN

    INSERT INTO buy (buy_id,buy_date,buy_status)
    VALUES (buy_id,buy_date,buy_status) ;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_buy_detail` (IN `buy_id_in` VARCHAR(5), IN `_prod_name` VARCHAR(100), IN `_color` VARCHAR(15), IN `_size` VARCHAR(5), IN `buy_amount` INT(11), IN `buy_cost` DOUBLE(10,2))  BEGIN

    DECLARE pre_item_num int(11);
    DECLARE next_item_num int(11) DEFAULT 1;
    DECLARE find_full_prod_id varchar(11);

    BEGIN

        -- Find the previous item number from the same buy_id
        SELECT MAX(item) INTO pre_item_num
        FROM buy_detail 
        WHERE buy_id = buy_id_in;


        -- check pre_item_num
        IF pre_item_num > 0 THEN
            SET next_item_num := pre_item_num + 1;
        END IF;
        -- Find the full_prod_id using name-color-size
        SELECT full_prod_id INTO find_full_prod_id
        FROM warehouse_view 
        WHERE prod_name = _prod_name
        AND color = _color
        AND size = _size;

        INSERT INTO buy_detail (buy_id,item,full_prod_id,buy_amount,buy_cost)
        VALUES (buy_id_in,next_item_num,find_full_prod_id,buy_amount,buy_cost) ;

    END;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_cart` (IN `_sale_id` VARCHAR(6), IN `_cust_id` VARCHAR(5), IN `_prod_id` VARCHAR(5), IN `_color` VARCHAR(15), IN `_size` VARCHAR(5), IN `_sale_amount` INT(11))  BEGIN

    DECLARE pre_item_num int(11);
    DECLARE next_item_num int(11) DEFAULT 1;
    DECLARE find_full_prod_id varchar(11);
    DECLARE is_id_exist varchar(6);
    DECLARE _sale_cost double(10,2);
    DECLARE _sale_price double(10,2);

    BEGIN

        
        -- check if sale_id already exist with sale_status=cart
        SET is_id_exist = (SELECT sale_id FROM sale WHERE sale_id = _sale_id);
        -- SELECT sale_id
        -- FROM sale
        -- WHERE sale_id = _sale_id;
        -- );
        

        IF is_id_exist IS NULL THEN
            -- create new sale_id
            INSERT INTO sale (sale_id, sale_date, cust_id, sale_status)
            VALUES (_sale_id,CURRENT_DATE(),_cust_id,"cart");
        END IF;

        -- Find the previous item number from the same sale_id
        SELECT MAX(item) INTO pre_item_num
        FROM sale_detail 
        WHERE sale_id = _sale_id;

        -- check pre_item_num
        IF pre_item_num > 0 THEN
            SET next_item_num := pre_item_num + 1;
        END IF;

        -- Find the full_prod_id using name-color-size
        SELECT full_prod_id, prod_cost, prod_price INTO find_full_prod_id, _sale_cost,_sale_price
        FROM warehouse_view 
        WHERE prod_id = _prod_id
        AND color = _color
        AND size = _size;

        INSERT INTO sale_detail (sale_id,item,full_prod_id,sale_amount,sale_cost,sale_price)
        VALUES (_sale_id,next_item_num,find_full_prod_id,_sale_amount,_sale_cost,_sale_price) ;

    END;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_customer` (IN `cust_id` VARCHAR(5), IN `cust_name` VARCHAR(30), IN `cust_lname` VARCHAR(30), IN `phone_num` VARCHAR(10), IN `credit_card` VARCHAR(16))  BEGIN

    INSERT INTO customer
    VALUES (cust_id,cust_name,cust_lname, phone_num,credit_card) ;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_sale` (IN `sale_id` VARCHAR(6), IN `sale_date` DATE, IN `cust_id` VARCHAR(5), IN `receiver_name` VARCHAR(60), IN `receiver_phone` VARCHAR(11), IN `sale_status` VARCHAR(10), IN `delivery_id` VARCHAR(6), IN `delivery_price` DOUBLE(5,2), IN `delivery_begin_date` DATE, IN `delivery_receive_date` DATE, IN `address` VARCHAR(100), IN `delivery_status` VARCHAR(15))  BEGIN

    INSERT INTO sale (sale_id, sale_date, cust_id, receiver_name, receiver_phone, sale_status, delivery_id, delivery_price, delivery_begin_date, delivery_receive_date, address, delivery_status)
    VALUES (sale_id, sale_date, cust_id, receiver_name, receiver_phone, sale_status, delivery_id, delivery_price, delivery_begin_date, delivery_receive_date, address, delivery_status) ;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_sale_detail` (IN `sale_id` VARCHAR(6), IN `item` INT, IN `full_prod_id` VARCHAR(11), IN `sale_amount` VARCHAR(5), IN `sale_cost` DOUBLE(10,2), IN `sale_price` DOUBLE(10,2))  BEGIN

    INSERT INTO sale_detail
    VALUES (sale_id, item, full_prod_id, sale_amount, sale_cost, sale_price) ;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_buy` (IN `_buy_id` VARCHAR(5), IN `_buy_date` DATE, IN `_buy_status` VARCHAR(30))  BEGIN

    UPDATE buy
    SET buy_date = _buy_date, buy_status = _buy_status
    WHERE buy_id = _buy_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_customer` (IN `_cust_id` VARCHAR(5), IN `_cust_name` VARCHAR(30), IN `_cust_lname` VARCHAR(30), IN `_phone_num` VARCHAR(10), IN `_credit_card` VARCHAR(16))  BEGIN

    UPDATE customer
    SET cust_name = _cust_name, cust_lname = _cust_lname, 
    phone_num = _phone_num, credit_card = _credit_card
    WHERE cust_id = _cust_id;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `buy`
--

CREATE TABLE `buy` (
  `buy_date` date DEFAULT NULL COMMENT '??????????????????????????????????????????',
  `buy_id` varchar(5) NOT NULL COMMENT '??????????????????????????????????????????',
  `buy_status` varchar(10) DEFAULT NULL COMMENT '????????????????????????????????????????????????'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buy`
--

INSERT INTO `buy` (`buy_date`, `buy_id`, `buy_status`) VALUES
('2021-07-01', 'B0001', 'completed'),
('2021-07-01', 'B0002', 'completed'),
('2021-07-03', 'B0003', 'completed'),
('2021-07-23', 'B0004', 'completed'),
('2021-10-18', 'B0005', 'completed'),
('2021-10-29', 'B0006', 'completed'),
('2021-10-14', 'B9999', 'buying');

-- --------------------------------------------------------

--
-- Table structure for table `buy_detail`
--

CREATE TABLE `buy_detail` (
  `buy_id` varchar(5) NOT NULL COMMENT '??????????????????????????????????????????',
  `item` int(11) NOT NULL COMMENT '??????????????????',
  `full_prod_id` varchar(11) DEFAULT NULL COMMENT '????????????????????????????????????',
  `buy_amount` int(11) DEFAULT NULL COMMENT '???????????????????????????????????????',
  `buy_cost` double(10,2) DEFAULT NULL COMMENT '????????????????????????'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buy_detail`
--

INSERT INTO `buy_detail` (`buy_id`, `item`, `full_prod_id`, `buy_amount`, `buy_cost`) VALUES
('B0001', 1, 'P001-DO-S', 10, 195.00),
('B0001', 2, 'P001-WH-S', 10, 195.00),
('B0001', 3, 'P001-BK-S', 10, 195.00),
('B0001', 4, 'P001-NA-S', 10, 195.00),
('B0001', 5, 'P001-BR-S', 10, 195.00),
('B0001', 6, 'P001-BL-S', 10, 195.00),
('B0001', 7, 'P002-WH-S', 10, 295.00),
('B0001', 8, 'P002-BK-S', 10, 295.00),
('B0001', 9, 'P002-BL-S', 10, 295.00),
('B0001', 10, 'P002-GR-S', 10, 295.00),
('B0001', 11, 'P003-PI-S', 10, 95.00),
('B0001', 12, 'P003-WI-S', 10, 95.00),
('B0001', 13, 'P003-OR-S', 10, 95.00),
('B0001', 14, 'P003-BE-S', 10, 95.00),
('B0001', 15, 'P003-BR-S', 10, 95.00),
('B0001', 16, 'P001-DO-M', 10, 195.00),
('B0001', 17, 'P001-WH-M', 10, 195.00),
('B0001', 18, 'P001-BK-M', 10, 195.00),
('B0001', 19, 'P001-NA-M', 10, 195.00),
('B0001', 20, 'P001-BR-M', 10, 195.00),
('B0001', 21, 'P001-BL-M', 10, 195.00),
('B0001', 22, 'P002-WH-M', 10, 295.00),
('B0001', 23, 'P002-BK-M', 10, 295.00),
('B0001', 24, 'P002-BL-M', 10, 295.00),
('B0001', 25, 'P002-GR-M', 10, 295.00),
('B0001', 26, 'P003-PI-M', 10, 95.00),
('B0001', 27, 'P003-WI-M', 10, 95.00),
('B0001', 28, 'P003-OR-M', 10, 95.00),
('B0001', 29, 'P003-BE-M', 10, 95.00),
('B0001', 30, 'P003-BR-M', 10, 95.00),
('B0001', 31, 'P001-DO-L', 10, 195.00),
('B0001', 32, 'P001-WH-L', 10, 195.00),
('B0001', 33, 'P001-BK-L', 10, 195.00),
('B0001', 34, 'P001-NA-L', 10, 195.00),
('B0001', 35, 'P001-BR-L', 10, 195.00),
('B0001', 36, 'P001-BL-L', 10, 195.00),
('B0001', 37, 'P002-WH-L', 10, 295.00),
('B0001', 38, 'P002-BK-L', 10, 295.00),
('B0001', 39, 'P002-BL-L', 10, 295.00),
('B0001', 40, 'P002-GR-L', 10, 295.00),
('B0001', 41, 'P003-PI-L', 10, 95.00),
('B0001', 42, 'P003-WI-L', 10, 95.00),
('B0001', 43, 'P003-OR-L', 10, 95.00),
('B0001', 44, 'P003-BE-L', 10, 95.00),
('B0001', 45, 'P003-BR-L', 10, 95.00),
('B0001', 46, 'P001-DO-XL', 10, 195.00),
('B0001', 47, 'P001-WH-XL', 10, 195.00),
('B0001', 48, 'P001-BK-XL', 10, 195.00),
('B0001', 49, 'P001-NA-XL', 10, 195.00),
('B0001', 50, 'P001-BR-XL', 10, 195.00),
('B0001', 51, 'P001-BL-XL', 10, 195.00),
('B0001', 52, 'P002-WH-XL', 10, 295.00),
('B0001', 53, 'P002-BK-XL', 10, 295.00),
('B0001', 54, 'P002-BL-XL', 10, 295.00),
('B0001', 55, 'P002-GR-XL', 10, 295.00),
('B0001', 56, 'P003-PI-XL', 10, 95.00),
('B0001', 57, 'P003-WI-XL', 10, 95.00),
('B0001', 58, 'P003-OR-XL', 10, 95.00),
('B0001', 59, 'P003-BE-XL', 10, 95.00),
('B0001', 60, 'P003-BR-XL', 10, 95.00),
('B0001', 61, 'P001-DO-XXL', 10, 195.00),
('B0001', 62, 'P001-WH-XXL', 10, 195.00),
('B0001', 63, 'P001-BK-XXL', 10, 195.00),
('B0001', 64, 'P001-NA-XXL', 10, 195.00),
('B0001', 65, 'P001-BR-XXL', 10, 195.00),
('B0001', 66, 'P001-BL-XXL', 10, 195.00),
('B0001', 67, 'P002-WH-XXL', 10, 295.00),
('B0001', 68, 'P002-BK-XXL', 10, 295.00),
('B0001', 69, 'P002-BL-XXL', 10, 295.00),
('B0001', 70, 'P002-GR-XXL', 10, 295.00),
('B0001', 71, 'P003-PI-XXL', 10, 95.00),
('B0001', 72, 'P003-WI-XXL', 10, 95.00),
('B0001', 73, 'P003-OR-XXL', 10, 95.00),
('B0001', 74, 'P003-BE-XXL', 10, 95.00),
('B0001', 75, 'P003-BR-XXL', 10, 95.00),
('B0002', 1, 'P001-DO-M', 3, 195.00),
('B0002', 2, 'P001-BR-S', 1, 195.00),
('B0002', 3, 'P003-OR-XL', 2, 95.00),
('B0002', 4, 'P003-OR-XXL', 2, 95.00),
('B0002', 5, 'P001-BL-S', 4, 195.00),
('B0002', 6, 'P003-PI-L', 3, 95.00),
('B0002', 7, 'P003-BR-L', 1, 95.00),
('B0002', 8, 'P001-BL-XXL', 1, 195.00),
('B0002', 9, 'P002-WH-M', 3, 295.00),
('B0002', 10, 'P003-BR-M', 2, 95.00),
('B0002', 11, 'P002-GR-L', 2, 295.00),
('B0002', 12, 'P001-BR-XXL', 1, 195.00),
('B0003', 1, 'P003-PI-S', 3, 95.00),
('B0003', 2, 'P003-BR-S', 4, 95.00),
('B0003', 3, 'P002-BL-M', 1, 295.00),
('B0003', 4, 'P001-DO-XXL', 1, 195.00),
('B0003', 5, 'P002-WH-XL', 1, 295.00),
('B0003', 6, 'P001-BL-M', 2, 195.00),
('B0003', 7, 'P001-NA-XL', 4, 195.00),
('B0003', 8, 'P002-GR-XL', 3, 295.00),
('B0003', 9, 'P001-DO-S', 5, 195.00),
('B0003', 10, 'P003-OR-M', 2, 95.00),
('B0003', 11, 'P001-DO-XL', 2, 195.00),
('B0003', 12, 'P001-BL-XL', 3, 195.00),
('B0003', 13, 'P001-NA-L', 1, 195.00),
('B0004', 1, 'P001-DO-S', 3, 195.00),
('B0004', 2, 'P001-BK-L', 3, 195.00),
('B0004', 3, 'P001-BK-M', 2, 195.00),
('B0004', 4, 'P001-BK-XXL', 5, 195.00),
('B0005', 1, 'P005-Gray-L', 10, 295.00),
('B0005', 2, 'P001-BL-M', 11, 195.00),
('B0006', 1, 'P002-BL-L', 11, 195.00),
('B0006', 2, 'P001-BL-M', 2, 195.00),
('B0006', 3, 'P003-WI-M', 11, 95.00),
('B9999', 1, 'P001-BL-M', 3, 195.00);

--
-- Triggers `buy_detail`
--
DELIMITER $$
CREATE TRIGGER `update_warehouse_buy` AFTER INSERT ON `buy_detail` FOR EACH ROW BEGIN
    
    UPDATE warehouse
    SET warehouse.total_amount = warehouse.total_amount + NEW.buy_amount,
    warehouse.prod_cost = NEW.buy_cost,
    warehouse.prod_price = NEW.buy_cost*2
    WHERE warehouse.full_prod_id = NEW.full_prod_id;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cust_id` varchar(5) NOT NULL COMMENT '????????????????????????????????????',
  `cust_name` varchar(30) DEFAULT NULL COMMENT '??????????????????????????????',
  `cust_lname` varchar(30) DEFAULT NULL COMMENT '???????????????????????????????????????',
  `phone_num` varchar(10) DEFAULT NULL COMMENT '?????????????????????????????????',
  `credit_card` varchar(16) DEFAULT NULL COMMENT '??????????????????????????????',
  `email` varchar(50) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user',
  `profile_img` varchar(256) NOT NULL DEFAULT 'https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg',
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cust_id`, `cust_name`, `cust_lname`, `phone_num`, `credit_card`, `email`, `role`, `profile_img`, `password`) VALUES
('C0001', '??????????????????', '???????????????????????????????????????', '096-864023', '6233 5560 8929 0', 'ananda@gmail.com', 'user', 'https://i.pinimg.com/originals/05/12/20/051220ddda09ee81ad0bbf58c091b158.jpg', '$2b$10$jQ6WcYyVEq29OQhuwCoYVO6VxPF4fNEv389nveez7NlCeB.RH26Cu'),
('C0002', '????????????????????????', '???????????????????????????', '084-140526', '5577 5571 1999 8', 'folk@gmail.com', 'user', 'https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg', '$2b$10$jQ6WcYyVEq29OQhuwCoYVO6VxPF4fNEv389nveez7NlCeB.RH26Cu'),
('C0003', '??????????????????', '??????????????????????????????????????????', '094-215325', '5236 2135 7994 7', 'bew@gmail.com', 'user', 'https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg', '$2b$10$jQ6WcYyVEq29OQhuwCoYVO6VxPF4fNEv389nveez7NlCeB.RH26Cu'),
('C0004', '???????????????', '???????????????', '090-085632', '6231 0134 1456 8', 'bam@gmail.com', 'user', 'https://i.pinimg.com/originals/d9/e8/ef/d9e8efdf30aba891f3484c403078a238.jpg', '$2b$10$jQ6WcYyVEq29OQhuwCoYVO6VxPF4fNEv389nveez7NlCeB.RH26Cu'),
('C0005', '????????????????????????', '????????????????????????', '095-924070', '6233 5617 5498 5', 'tom@gmail.com', 'user', 'https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg', '$2b$10$jQ6WcYyVEq29OQhuwCoYVO6VxPF4fNEv389nveez7NlCeB.RH26Cu'),
('C0006', '???????????????????????????', '?????????????????????', '091-235455', '5325 1486 2153 2', 'jr@gmail.com', 'user', 'https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg', '$2b$10$jQ6WcYyVEq29OQhuwCoYVO6VxPF4fNEv389nveez7NlCeB.RH26Cu'),
('C0007', '?????????????????????', '????????????????????????', '097-146251', '5577 2315 8596 8', 'jane@gmail.com', 'user', 'https://media.istockphoto.com/vectors/avatar-icon-of-girl-in-a-baseball-cap-vector-id542940830?k=20&m=542940830&s=170667a&w=0&h=se4mS6kwTS4RlEoaqK2H3Z0nEdqIPia7C-BtiCZ_Ays=', '$2b$10$jQ6WcYyVEq29OQhuwCoYVO6VxPF4fNEv389nveez7NlCeB.RH26Cu'),
('C0008', '???????????????', '??????????????????', '096-864118', '5685 9575 4565 5', 'tane@gmail.com', 'user', 'https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg', '$2b$10$jQ6WcYyVEq29OQhuwCoYVO6VxPF4fNEv389nveez7NlCeB.RH26Cu'),
('C0009', '?????????????????????????????????', '?????????????????????', '080-530079', '6231 4526 6985 1', 'bank2@gmail.com', 'user', 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/102348974/original/039aee69bface75f7440dbcefd24fe3a606f9f7c/create-profile-avatar-of-your-image.png', '$2b$10$jQ6WcYyVEq29OQhuwCoYVO6VxPF4fNEv389nveez7NlCeB.RH26Cu'),
('C0010', '?????????????????????', '????????????????????????', '095-124247', '4568 6523 4587 5', 'benz@gmail.com', 'user', 'https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg', '$2b$10$jQ6WcYyVEq29OQhuwCoYVO6VxPF4fNEv389nveez7NlCeB.RH26Cu'),
('C09a2', 'Tiger', 'Big', '0923345344', '2342412432143', 'tiger@gmail.com', 'user', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt7a1Kpo1zc1nxrHIO4HhGALeKh-BE3JCt5KY4Loq3Xev404278wDoXfbt2PgkQAPio00&usqp=CAU', '$2b$10$NGgNsoDq2KOaUuz32ASh3efOq.lNIq0BYMR1OhqcmFIlSawVI4wRO'),
('C75aa', 'PJom', 'Abc', '4354235432', '24354353454345', 'pjom@gmail.com', 'user', 'https://openclipart.org/download/294868/myAvatar.svg', '$2b$10$vZJDUUNipBk1ZHV2HUuSLeI4onn6dA1XyMNSQ4KklrklzVIIsq.Jm'),
('C9999', 'NONT', 'Sokheng', '1234454623', '1234454623423', 'nont@gmail.com', 'admin', 'https://pbs.twimg.com/media/EYVxlOSXsAExOpX.jpg', '$2b$10$jQ6WcYyVEq29OQhuwCoYVO6VxPF4fNEv389nveez7NlCeB.RH26Cu'),
('Cc788', 'Ptoy', 'Jane', '0923345343', '12354654365445', 'ptoy@gmail.com', 'admin', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFjJO0hz4oD-fIlwa-zOwFpcawqEb5NHdFRszPEH9Ykr3F0vv52Dg-uZPd0gNlYb_0UWg&usqp=CAU', '$2b$10$5raO0KAW.JlwEgjH3NXDUeY54dy.irr0JNowRyhv9ksOfyPN91hZy');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `cust_id` varchar(5) NOT NULL,
  `message` varchar(500) NOT NULL,
  `message_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) NOT NULL DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`cust_id`, `message`, `message_id`, `date`, `status`) VALUES
('C9999', 'Hello', 1, '2021-10-28 22:35:50', 'Read'),
('C9999', 'Helllo world', 2, '2021-10-28 22:41:45', 'Read'),
('C9999', 'Test', 3, '2021-10-28 23:52:53', 'Read'),
('C0001', 'Good night admin', 4, '2021-10-29 00:01:21', 'Read'),
('C0007', 'I would like to buy some shirts', 5, '2021-10-29 00:07:14', 'Read'),
('C09a2', 'Hello admin......', 7, '2021-10-29 00:08:38', 'Read'),
('C0007', 'Good night....', 8, '2021-10-29 01:00:35', 'Read');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `prod_id` varchar(4) NOT NULL COMMENT '??????????????????',
  `prod_name` varchar(100) DEFAULT NULL COMMENT '????????????????????????????????????????????????'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`prod_id`, `prod_name`) VALUES
('P001', '???????????????????????????????????????????????????'),
('P002', '???????????????????????????????????????Dry-EX'),
('P003', '???????????????????????????????????? Dry'),
('P004', '??????????????? AIRism ?????????????????? ????????????????????? (Unisex)'),
('P005', 'MEN Uniqlo U ??????????????? AIRism ?????????????????? ?????????????????????'),
('P006', 'MEN ?????????????????????????????? Dry-EX Marvel');

-- --------------------------------------------------------

--
-- Table structure for table `prod_color`
--

CREATE TABLE `prod_color` (
  `prod_color_id` varchar(20) NOT NULL COMMENT '???????????????????????????????????????',
  `prod_id` varchar(4) NOT NULL COMMENT '??????????????????',
  `color` varchar(15) DEFAULT NULL COMMENT '????????????????????????',
  `image_url` varchar(256) DEFAULT NULL COMMENT '???????????????????????????????????????'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prod_color`
--

INSERT INTO `prod_color` (`prod_color_id`, `prod_id`, `color`, `image_url`) VALUES
('P001-BK', 'P001', 'BLACK', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_09_433031.jpg?width=1600&impolicy=quality_75\r\n'),
('P001-BL', 'P001', 'BLUE', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/sub/goods_433031_sub13.jpg?width=1600&impolicy=quality_75\r\n'),
('P001-BR', 'P001', 'BROWN', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_34_433031.jpg?width=1600&impolicy=quality_75\r\n'),
('P001-DO', 'P001', 'DARK ORANGE', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_29_433031.jpg?width=1600&impolicy=quality_75'),
('P001-NA', 'P001', 'NATURAL', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_30_433031.jpg?width=1600&impolicy=quality_75\r\n'),
('P001-WH', 'P001', 'WHITE', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433031/item/goods_00_433031.jpg?width=1600&impolicy=quality_75'),
('P002-BK', 'P002', 'BLACK', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/442131/item/goods_09_442131.jpg?width=1600&impolicy=quality_75\r\n'),
('P002-BL', 'P002', 'BLUE', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/442131/sub/goods_442131_sub13.jpg?width=1600&impolicy=quality_75\r\n'),
('P002-GR', 'P002', 'GREEN', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/442131/item/goods_54_442131.jpg?width=1600&impolicy=quality_75\r\n'),
('P002-WH', 'P002', 'WHITE', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/442131/item/goods_00_442131.jpg?width=1600&impolicy=quality_75\r\n'),
('P003-BE', 'P003', 'BEIGE', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427916/item/goods_31_427916.jpg?width=1600&impolicy=quality_75\r\n'),
('P003-BR', 'P003', 'BROWN', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427916/item/goods_37_427916.jpg?width=1600&impolicy=quality_75\r\n'),
('P003-OR', 'P003', 'ORANGE', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427916/item/goods_24_427916.jpg?width=1600&impolicy=quality_75\r\n'),
('P003-PI', 'P003', 'PINK', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427916/item/goods_12_427916.jpg?width=1600&impolicy=quality_75\r\n'),
('P003-WI', 'P003', 'WINE', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427916/sub/goods_427916_sub13.jpg?width=1600&impolicy=quality_75\r\n'),
('P004-Olive', 'P004', 'Olive', 'https://image.uniqlo.com/UQ/ST3/th/imagesgoods/425974/item/thgoods_56_425974.jpg?width=1600&impolicy=quality_75'),
('P004-Wine', 'P004', 'Wine', 'https://image.uniqlo.com/UQ/ST3/th/imagesgoods/425974/item/thgoods_19_425974.jpg?width=1600&impolicy=quality_75'),
('P005-Gray', 'P005', 'Gray', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/425974/item/goods_07_425974.jpg?width=1600&impolicy=quality_75'),
('P006-BLACK', 'P006', 'BLACK', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/443163/item/goods_09_443163.jpg?width=1600&impolicy=quality_75');

-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

CREATE TABLE `sale` (
  `sale_id` varchar(6) NOT NULL COMMENT '????????????????????????????????????',
  `sale_date` date DEFAULT NULL COMMENT '???????????????????????????',
  `cust_id` varchar(5) DEFAULT NULL COMMENT '????????????????????????????????????',
  `receiver_name` varchar(60) DEFAULT NULL COMMENT '???????????????????????????????????????',
  `receiver_phone` varchar(11) DEFAULT NULL COMMENT '???????????????????????????????????????????????????',
  `sale_status` varchar(10) DEFAULT NULL COMMENT '?????????????????????????????????',
  `delivery_id` varchar(6) DEFAULT NULL COMMENT '?????????????????????????????????????????????',
  `delivery_price` double(5,2) DEFAULT NULL COMMENT '???????????????????????????????????????',
  `delivery_begin_date` date DEFAULT NULL COMMENT '????????????????????????????????????',
  `delivery_receive_date` date DEFAULT NULL COMMENT '????????????????????????????????????',
  `address` varchar(100) DEFAULT NULL COMMENT '???????????????????????????????????????',
  `delivery_status` varchar(15) DEFAULT NULL COMMENT '??????????????????????????????????????????'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sale`
--

INSERT INTO `sale` (`sale_id`, `sale_date`, `cust_id`, `receiver_name`, `receiver_phone`, `sale_status`, `delivery_id`, `delivery_price`, `delivery_begin_date`, `delivery_receive_date`, `address`, `delivery_status`) VALUES
('S00001', '2021-07-05', 'C0001', '?????????????????? ???????????????????????????????????????', '096-8640235', 'completed', 'd00001', 30.00, '2021-07-05', '2021-07-07', '???????????????????????????????????????????????? ????????????????????????????????????????????????', 'delivered'),
('S00002', '2021-07-06', 'C0005', '????????????????????? ????????????????????????', '097-1462513', 'completed', 'd00002', 30.00, '2021-07-06', '2021-07-08', '???????????????????????????????????????????????? ????????????????????????????????????????????????', 'delivered'),
('S00003', '2021-07-06', 'C0004', '??????????????? ???????????????', '090-0856325', 'completed', 'd00003', 30.00, '2021-07-06', '2021-07-08', '???????????????????????????????????????????????? ????????????????????????????????????????????????', 'delivered'),
('S00004', '2021-07-07', 'C0002', '???????????????????????? ???????????????????????????', '084-1405264', 'completed', 'd00004', 30.00, '2021-07-07', '2021-07-09', '???????????????????????????????????????????????? ????????????????????????????????????????????????', 'delivered'),
('S00005', '2021-07-07', 'C0010', '????????????????????? ????????????????????????', '095-1242472', 'completed', 'd00005', 30.00, '2021-07-07', '2021-07-09', '???????????????????????????????????????????????? ????????????????????????????????????????????????', 'delivered'),
('S00006', '2021-07-07', 'C0008', '??????????????? ???????????????', '090-0856325', 'completed', 'd00006', 30.00, '2021-07-07', '2021-07-09', '???????????????????????????????????????????????? ????????????????????????????????????????????????', 'delivered'),
('S00007', '2021-07-07', 'C0001', '?????????????????? ???????????????????????????????????????', '096-8640235', 'completed', 'd00007', 30.00, '2021-07-07', '2021-07-09', '???????????????????????????????????????????????? ????????????????????????????????????????????????', 'delivered'),
('S00008', '2021-07-08', 'C0002', '???????????????????????? ???????????????????????????', '084-1405264', 'completed', 'd00008', 30.00, '2021-07-08', '2021-07-10', '???????????????????????????????????????????????? ????????????????????????????????????????????????', 'delivered'),
('S00009', '2021-07-09', 'C0008', '??????????????? ??????????????????', '096-8641184', 'completed', 'd00009', 30.00, '2021-07-09', '2021-07-11', '???????????????????????????????????????????????? ????????????????????????????????????????????????', 'delivered'),
('S00013', '2021-07-05', 'C0001', '?????????????????? ???????????????????????????????????????', '096-8640235', 'completed', 'd00001', 30.00, '2021-07-05', '2021-07-07', '???????????????????????????????????????????????? ????????????????????????????????????????????????', 'delivering'),
('S00014', '2021-10-10', 'C0011', 'NONT', '099999999', 'completed', 'd00000', 0.00, '2021-10-11', '2021-10-12', 'BUU CHAN', 'cart'),
('S00015', '2021-10-17', 'Cc788', 'Sokheng', '09212345678', 'new_order', NULL, NULL, NULL, NULL, 'BUU CHAN', NULL),
('S00016', '2021-10-17', 'Cc788', 'Sokheng', '09212345678', 'cancel', NULL, NULL, NULL, NULL, 'Burapha Chan', NULL),
('S00017', '2021-10-18', 'Cc788', 'Sokheng', '09212345678', 'completed', NULL, 35.00, '2021-10-18', '2021-10-19', 'Buu Chan', 'delivering'),
('S00018', '2021-10-23', 'C9999', 'Sokheng', 'nont@gmail.', 'new_order', NULL, NULL, NULL, NULL, 'ewrwer', NULL),
('S00019', '2021-10-27', 'C0001', NULL, NULL, 'cart', NULL, NULL, NULL, NULL, NULL, NULL),
('S31fed', '2021-10-27', 'Cc788', NULL, NULL, 'cart', NULL, NULL, NULL, NULL, NULL, NULL),
('S87a6f', '2021-10-27', 'C09a2', 'Sokheng', 'tiger@gmail', 'new_order', NULL, NULL, NULL, NULL, 'Bankok', NULL),
('S99bd1', '2021-10-27', 'C0007', 'Janejira', 'ananda@gmai', 'new_order', NULL, NULL, NULL, NULL, 'Burapha Chan', NULL),
('S9ad46', '2021-10-27', 'C09a2', NULL, NULL, 'cart', NULL, NULL, NULL, NULL, NULL, NULL),
('Sdf3a2', '2021-10-27', 'C0007', NULL, NULL, 'cart', NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Triggers `sale`
--
DELIMITER $$
CREATE TRIGGER `update_warehouse_when_update_sale` AFTER UPDATE ON `sale` FOR EACH ROW BEGIN
    -- DECLARE _full_prod_id varchar(11);
    -- DECLARE _sale_amount int(11);

    BEGIN
        

        IF NEW.sale_status = "cancel" THEN 
            --  if cancel, we delete from sale_detail
            DELETE FROM sale_detail WHERE sale_detail.sale_id = NEW.sale_id;

            -- find full_prod_id from table sale_detail 
            -- SELECT full_prod_id,sale_amount INTO _full_prod_id, _sale_amount
            -- FROM sale_detail
            -- WHERE sale_detail.sale_id = NEW.sale_id;


            -- UPDATE warehouse
            -- SET warehouse.sold_amount = warehouse.sold_amount + _sale_amount
            -- WHERE warehouse.full_prod_id = _full_prod_id;

            

        END IF;
    END;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `sale_detail`
--

CREATE TABLE `sale_detail` (
  `sale_id` varchar(6) NOT NULL COMMENT '????????????????????????????????????',
  `item` int(11) NOT NULL COMMENT '??????????????????',
  `full_prod_id` varchar(11) DEFAULT NULL COMMENT '????????????????????????????????????',
  `sale_amount` int(11) DEFAULT NULL COMMENT '?????????????????????????????????',
  `sale_cost` double(10,2) DEFAULT NULL COMMENT '??????????????????????????????',
  `sale_price` double(10,2) DEFAULT NULL COMMENT '?????????????????????'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sale_detail`
--

INSERT INTO `sale_detail` (`sale_id`, `item`, `full_prod_id`, `sale_amount`, `sale_cost`, `sale_price`) VALUES
('S00001', 1, 'P001-DO-S', 2, 195.00, 390.00),
('S00001', 2, 'P002-WH-S', 3, 295.00, 590.00),
('S00002', 1, 'P001-WH-S', 2, 195.00, 390.00),
('S00003', 1, 'P001-NA-XL', 2, 195.00, 390.00),
('S00004', 1, 'P001-BR-XL', 5, 195.00, 390.00),
('S00005', 1, 'P001-BL-XL', 1, 195.00, 390.00),
('S00006', 1, 'P002-WH-XL', 2, 295.00, 590.00),
('S00007', 1, 'P002-BK-XL', 1, 295.00, 590.00),
('S00008', 1, 'P003-BR-XL', 5, 95.00, 190.00),
('S00009', 1, 'P001-DO-XXL', 2, 195.00, 390.00),
('S00009', 2, 'P001-WH-XXL', 3, 195.00, 390.00),
('S00013', 1, 'P001-DO-S', 3, 195.00, 390.00),
('S00014', 1, 'P001-BK-L', 3, 195.00, 390.00),
('S00014', 2, 'P001-BK-M', 2, 195.00, 390.00),
('S00014', 3, 'P001-BK-S', 2, 195.00, 390.00),
('S00015', 1, 'P001-BK-L', 2, 195.00, 390.00),
('S00015', 2, 'P002-WH-L', 2, 295.00, 590.00),
('S00017', 1, 'P005-Gray-L', 1, 295.00, 590.00),
('S00018', 1, 'P001-BK-L', 2, 195.00, 390.00),
('S00018', 2, 'P001-BL-L', 1, 195.00, 390.00),
('S00019', 1, 'P001-BL-L', 2, 195.00, 390.00),
('S00019', 2, 'P001-NA-XXL', 1, 195.00, 390.00),
('S00019', 3, 'P001-NA-L', 2, 195.00, 390.00),
('S31fed', 1, 'P001-BL-L', 2, 195.00, 390.00),
('S31fed', 2, 'P001-BK-XXL', 2, 195.00, 390.00),
('S31fed', 3, 'P005-Gray-L', 2, 295.00, 590.00),
('S87a6f', 1, 'P003-PI-L', 2, 95.00, 190.00),
('S99bd1', 1, 'P002-BL-L', 2, 295.00, 590.00),
('S99bd1', 2, 'P001-BR-M', 3, 195.00, 390.00),
('S9ad46', 1, 'P001-BK-L', 2, 195.00, 390.00),
('Sdf3a2', 1, 'P001-BK-M', 2, 195.00, 390.00);

--
-- Triggers `sale_detail`
--
DELIMITER $$
CREATE TRIGGER `update_warehouse_when_delete_sale_detail` BEFORE DELETE ON `sale_detail` FOR EACH ROW BEGIN
    DECLARE _full_prod_id varchar(11);
    DECLARE _sale_amount int(11);

    BEGIN
        -- find full_prod_id from table sale_detail 
            SELECT full_prod_id,sale_amount INTO _full_prod_id, _sale_amount
            FROM sale_detail
            WHERE sale_detail.sale_id = OLD.sale_id and item=OLD.item;


            UPDATE warehouse
            SET warehouse.sold_amount = warehouse.sold_amount - _sale_amount
            WHERE warehouse.full_prod_id = _full_prod_id;

    END;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_warehouse_when_insert_sale_detail` AFTER INSERT ON `sale_detail` FOR EACH ROW BEGIN
    DECLARE _sale_status varchar(10);

    BEGIN
        -- find sale_status from table sale 
        SELECT sale_status INTO _sale_status
        FROM sale
        WHERE sale.sale_id = NEW.sale_id;

        -- IF _sale_status = "completed" THEN 
        --     UPDATE warehouse
        --     SET warehouse.sold_amount = warehouse.sold_amount + NEW.sale_amount
        --     WHERE warehouse.full_prod_id = NEW.full_prod_id;
        -- END IF;
        IF _sale_status = "cart" THEN 
            UPDATE warehouse
            SET warehouse.sold_amount = warehouse.sold_amount + NEW.sale_amount
            WHERE warehouse.full_prod_id = NEW.full_prod_id;
        END IF;
    END;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `size_chart`
--

CREATE TABLE `size_chart` (
  `size` varchar(3) NOT NULL COMMENT '????????????',
  `body_length_cm` double(5,2) DEFAULT NULL COMMENT '????????????????????????????????????(???????????????????????????)',
  `shoulder_length_cm` double(5,2) DEFAULT NULL COMMENT '?????????????????????????????????(???????????????????????????)',
  `chest_length_cm` double(5,2) DEFAULT NULL COMMENT '???????????????????????????????????????(???????????????????????????)',
  `sleeve_length_cm` double(5,2) DEFAULT NULL COMMENT '?????????????????????????????????????????????(???????????????????????????)',
  `body_length_inch` double(5,2) DEFAULT NULL COMMENT '????????????????????????????????????(????????????)',
  `shoulder_length_inch` double(5,2) DEFAULT NULL COMMENT '?????????????????????????????????(????????????)',
  `chest_length_inch` double(5,2) DEFAULT NULL COMMENT '???????????????????????????????????????(????????????)',
  `sleeve_length_inch` double(5,2) DEFAULT NULL COMMENT '?????????????????????????????????????????????(????????????)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `size_chart`
--

INSERT INTO `size_chart` (`size`, `body_length_cm`, `shoulder_length_cm`, `chest_length_cm`, `sleeve_length_cm`, `body_length_inch`, `shoulder_length_inch`, `chest_length_inch`, `sleeve_length_inch`) VALUES
('L', 71.00, 44.50, 52.00, 45.50, 27.95, 17.52, 20.47, 17.91),
('M', 68.00, 43.00, 49.00, 43.50, 26.77, 16.93, 19.29, 17.13),
('S', 65.00, 41.50, 46.00, 41.50, 25.59, 16.34, 18.11, 16.34),
('XL', 74.00, 46.50, 56.00, 47.50, 29.13, 18.31, 22.05, 18.70),
('XXL', 76.00, 48.50, 60.00, 48.50, 29.92, 19.09, 23.62, 19.09);

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE `warehouse` (
  `full_prod_id` varchar(20) NOT NULL COMMENT '????????????????????????????????????',
  `prod_id` varchar(4) DEFAULT NULL COMMENT '??????????????????',
  `color` varchar(15) DEFAULT NULL COMMENT '????????????????????????',
  `size` varchar(3) DEFAULT NULL COMMENT '????????????',
  `total_amount` int(11) DEFAULT NULL COMMENT '????????????????????????????????????',
  `sold_amount` int(11) DEFAULT NULL COMMENT '????????????????????????????????????',
  `prod_cost` double(10,2) DEFAULT NULL COMMENT '????????????????????????????????????',
  `prod_price` double(10,2) DEFAULT NULL COMMENT '????????????????????????????????????',
  `prod_color_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `warehouse`
--

INSERT INTO `warehouse` (`full_prod_id`, `prod_id`, `color`, `size`, `total_amount`, `sold_amount`, `prod_cost`, `prod_price`, `prod_color_id`) VALUES
('P001-BK-L', 'P001', 'BLACK', 'L', 13, 9, 195.00, 390.00, 'P001-BK'),
('P001-BK-M', 'P001', 'BLACK', 'M', 12, 4, 195.00, 390.00, 'P001-BK'),
('P001-BK-S', 'P001', 'BLACK', 'S', 10, 2, 195.00, 390.00, 'P001-BK'),
('P001-BK-XL', 'P001', 'BLACK', 'XL', 10, 0, 195.00, 390.00, 'P001-BK'),
('P001-BK-XXL', 'P001', 'BLACK', 'XXL', 15, 2, 195.00, 390.00, 'P001-BK'),
('P001-BL-L', 'P001', 'BLUE', 'L', 10, 5, 195.00, 390.00, 'P001-BL'),
('P001-BL-M', 'P001', 'BLUE', 'M', 28, 0, 195.00, 390.00, 'P001-BL'),
('P001-BL-S', 'P001', 'BLUE', 'S', 14, 0, 195.00, 390.00, 'P001-BL'),
('P001-BL-XL', 'P001', 'BLUE', 'XL', 13, 1, 195.00, 390.00, 'P001-BL'),
('P001-BL-XXL', 'P001', 'BLUE', 'XXL', 11, 0, 195.00, 390.00, 'P001-BL'),
('P001-BR-L', 'P001', 'BROWN', 'L', 10, 0, 195.00, 390.00, 'P001-BR'),
('P001-BR-M', 'P001', 'BROWN', 'M', 10, 3, 195.00, 390.00, 'P001-BR'),
('P001-BR-S', 'P001', 'BROWN', 'S', 11, 0, 195.00, 390.00, 'P001-BR'),
('P001-BR-XL', 'P001', 'BROWN', 'XL', 10, 5, 195.00, 390.00, 'P001-BR'),
('P001-BR-XXL', 'P001', 'BROWN', 'XXL', 11, 0, 195.00, 390.00, 'P001-BR'),
('P001-DO-L', 'P001', 'DARK ORANGE', 'L', 10, 0, 195.00, 390.00, 'P001-DO'),
('P001-DO-M', 'P001', 'DARK ORANGE', 'M', 13, 0, 195.00, 390.00, 'P001-DO'),
('P001-DO-S', 'P001', 'DARK ORANGE', 'S', 18, 5, 195.00, 390.00, 'P001-DO'),
('P001-DO-XL', 'P001', 'DARK ORANGE', 'XL', 12, 0, 195.00, 390.00, 'P001-DO'),
('P001-DO-XXL', 'P001', 'DARK ORANGE', 'XXL', 11, 2, 195.00, 390.00, 'P001-DO'),
('P001-NA-L', 'P001', 'NATURAL', 'L', 11, 2, 195.00, 390.00, 'P001-NA'),
('P001-NA-M', 'P001', 'NATURAL', 'M', 10, 0, 195.00, 390.00, 'P001-NA'),
('P001-NA-S', 'P001', 'NATURAL', 'S', 10, 0, 195.00, 390.00, 'P001-NA'),
('P001-NA-XL', 'P001', 'NATURAL', 'XL', 14, 2, 195.00, 390.00, 'P001-NA'),
('P001-NA-XXL', 'P001', 'NATURAL', 'XXL', 10, 1, 195.00, 390.00, 'P001-NA'),
('P001-WH-L', 'P001', 'WHITE', 'L', 10, 0, 195.00, 390.00, 'P001-WH'),
('P001-WH-M', 'P001', 'WHITE', 'M', 10, 0, 195.00, 390.00, 'P001-WH'),
('P001-WH-S', 'P001', 'WHITE', 'S', 10, 2, 195.00, 390.00, 'P001-WH'),
('P001-WH-XL', 'P001', 'WHITE', 'XL', 10, 0, 195.00, 390.00, 'P001-WH'),
('P001-WH-XXL', 'P001', 'WHITE', 'XXL', 10, 3, 195.00, 390.00, 'P001-WH'),
('P002-BK-L', 'P002', 'BLACK', 'L', 10, 0, 295.00, 590.00, 'P002-BK'),
('P002-BK-M', 'P002', 'BLACK', 'M', 10, 0, 295.00, 590.00, 'P002-BK'),
('P002-BK-S', 'P002', 'BLACK', 'S', 10, 0, 295.00, 590.00, 'P002-BK'),
('P002-BK-XL', 'P002', 'BLACK', 'XL', 10, 1, 295.00, 590.00, 'P002-BK'),
('P002-BK-XXL', 'P002', 'BLACK', 'XXL', 10, 0, 295.00, 590.00, 'P002-BK'),
('P002-BL-L', 'P002', 'BLUE', 'L', 21, 2, 195.00, 390.00, 'P002-BL'),
('P002-BL-M', 'P002', 'BLUE', 'M', 11, 0, 295.00, 590.00, 'P002-BL'),
('P002-BL-S', 'P002', 'BLUE', 'S', 10, 0, 295.00, 590.00, 'P002-BL'),
('P002-BL-XL', 'P002', 'BLUE', 'XL', 10, 0, 295.00, 590.00, 'P002-BL'),
('P002-BL-XXL', 'P002', 'BLUE', 'XXL', 10, 0, 295.00, 590.00, 'P002-BL'),
('P002-GR-L', 'P002', 'GREEN', 'L', 12, 0, 295.00, 590.00, 'P002-GR'),
('P002-GR-M', 'P002', 'GREEN', 'M', 10, 0, 295.00, 590.00, 'P002-GR'),
('P002-GR-S', 'P002', 'GREEN', 'S', 10, 0, 295.00, 590.00, 'P002-GR'),
('P002-GR-XL', 'P002', 'GREEN', 'XL', 13, 0, 295.00, 590.00, 'P002-GR'),
('P002-GR-XXL', 'P002', 'GREEN', 'XXL', 10, 0, 295.00, 590.00, 'P002-GR'),
('P002-WH-L', 'P002', 'WHITE', 'L', 10, 2, 295.00, 590.00, 'P002-WH'),
('P002-WH-M', 'P002', 'WHITE', 'M', 13, 0, 295.00, 590.00, 'P002-WH'),
('P002-WH-S', 'P002', 'WHITE', 'S', 10, 3, 295.00, 590.00, 'P002-WH'),
('P002-WH-XL', 'P002', 'WHITE', 'XL', 11, 2, 295.00, 590.00, 'P002-WH'),
('P002-WH-XXL', 'P002', 'WHITE', 'XXL', 10, 0, 295.00, 590.00, 'P002-WH'),
('P003-BE-L', 'P003', 'BEIGE', 'L', 10, 0, 95.00, 190.00, 'P003-BE'),
('P003-BE-M', 'P003', 'BEIGE', 'M', 10, 0, 95.00, 190.00, 'P003-BE'),
('P003-BE-S', 'P003', 'BEIGE', 'S', 10, 0, 95.00, 190.00, 'P003-BE'),
('P003-BE-XL', 'P003', 'BEIGE', 'XL', 10, 0, 95.00, 190.00, 'P003-BE'),
('P003-BE-XXL', 'P003', 'BEIGE', 'XXL', 10, 0, 95.00, 190.00, 'P003-BE'),
('P003-BR-L', 'P003', 'BROWN', 'L', 11, 0, 95.00, 190.00, 'P003-BR'),
('P003-BR-M', 'P003', 'BROWN', 'M', 12, 0, 95.00, 190.00, 'P003-BR'),
('P003-BR-S', 'P003', 'BROWN', 'S', 14, 0, 95.00, 190.00, 'P003-BR'),
('P003-BR-XL', 'P003', 'BROWN', 'XL', 10, 5, 95.00, 190.00, 'P003-BR'),
('P003-BR-XXL', 'P003', 'BROWN', 'XXL', 10, 0, 95.00, 190.00, 'P003-BR'),
('P003-OR-L', 'P003', 'ORANGE', 'L', 10, 0, 95.00, 190.00, 'P003-OR'),
('P003-OR-M', 'P003', 'ORANGE', 'M', 12, 0, 95.00, 190.00, 'P003-OR'),
('P003-OR-S', 'P003', 'ORANGE', 'S', 10, 0, 95.00, 190.00, 'P003-OR'),
('P003-OR-XL', 'P003', 'ORANGE', 'XL', 12, 0, 95.00, 190.00, 'P003-OR'),
('P003-OR-XXL', 'P003', 'ORANGE', 'XXL', 12, 0, 95.00, 190.00, 'P003-OR'),
('P003-PI-L', 'P003', 'PINK', 'L', 13, 2, 95.00, 190.00, 'P003-PI'),
('P003-PI-M', 'P003', 'PINK', 'M', 10, 0, 95.00, 190.00, 'P003-PI'),
('P003-PI-S', 'P003', 'PINK', 'S', 13, 0, 95.00, 190.00, 'P003-PI'),
('P003-PI-XL', 'P003', 'PINK', 'XL', 10, 0, 95.00, 190.00, 'P003-PI'),
('P003-PI-XXL', 'P003', 'PINK', 'XXL', 10, 0, 95.00, 190.00, 'P003-PI'),
('P003-WI-L', 'P003', 'WINE', 'L', 10, 0, 95.00, 190.00, 'P003-WI'),
('P003-WI-M', 'P003', 'WINE', 'M', 21, 0, 95.00, 190.00, 'P003-WI'),
('P003-WI-S', 'P003', 'WINE', 'S', 10, 0, 95.00, 190.00, 'P003-WI'),
('P003-WI-XL', 'P003', 'WINE', 'XL', 10, 0, 95.00, 190.00, 'P003-WI'),
('P003-WI-XXL', 'P003', 'WINE', 'XXL', 10, 0, 95.00, 190.00, 'P003-WI'),
('P004-Olive-L', 'P004', 'Olive', 'L', 0, 0, 295.00, 590.00, 'P004-Olive'),
('P004-Wine-M', 'P004', 'Wine', 'M', 0, 0, 295.00, 590.00, 'P004-Wine'),
('P005-Gray-L', 'P005', 'Gray', 'L', 10, 3, 295.00, 590.00, 'P005-Gray'),
('P006-BLACK-L', 'P006', 'BLACK', 'L', 0, 0, 295.00, 590.00, 'P006-BLACK');

-- --------------------------------------------------------

--
-- Stand-in structure for view `warehouse_view`
-- (See below for the actual view)
--
CREATE TABLE `warehouse_view` (
`full_prod_id` varchar(20)
,`prod_name` varchar(100)
,`color` varchar(15)
,`size` varchar(3)
,`total_amount` int(11)
,`sold_amount` int(11)
,`prod_cost` double(10,2)
,`prod_price` double(10,2)
,`prod_id` varchar(4)
,`prod_color_id` varchar(20)
,`image_url` varchar(256)
);

-- --------------------------------------------------------

--
-- Structure for view `warehouse_view`
--
DROP TABLE IF EXISTS `warehouse_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `warehouse_view`  AS  select `warehouse`.`full_prod_id` AS `full_prod_id`,`product`.`prod_name` AS `prod_name`,`prod_color`.`color` AS `color`,`warehouse`.`size` AS `size`,`warehouse`.`total_amount` AS `total_amount`,`warehouse`.`sold_amount` AS `sold_amount`,`warehouse`.`prod_cost` AS `prod_cost`,`warehouse`.`prod_price` AS `prod_price`,`product`.`prod_id` AS `prod_id`,`prod_color`.`prod_color_id` AS `prod_color_id`,`prod_color`.`image_url` AS `image_url` from ((`warehouse` join `prod_color` on((`warehouse`.`prod_color_id` = `prod_color`.`prod_color_id`))) join `product` on((`prod_color`.`prod_id` = `product`.`prod_id`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buy`
--
ALTER TABLE `buy`
  ADD PRIMARY KEY (`buy_id`);

--
-- Indexes for table `buy_detail`
--
ALTER TABLE `buy_detail`
  ADD PRIMARY KEY (`buy_id`,`item`),
  ADD KEY `full_prod_id` (`full_prod_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cust_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indexes for table `prod_color`
--
ALTER TABLE `prod_color`
  ADD PRIMARY KEY (`prod_color_id`);

--
-- Indexes for table `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`sale_id`);

--
-- Indexes for table `sale_detail`
--
ALTER TABLE `sale_detail`
  ADD PRIMARY KEY (`sale_id`,`item`),
  ADD KEY `full_prod_id` (`full_prod_id`);

--
-- Indexes for table `size_chart`
--
ALTER TABLE `size_chart`
  ADD PRIMARY KEY (`size`);

--
-- Indexes for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`full_prod_id`),
  ADD KEY `prod_id` (`prod_id`),
  ADD KEY `size` (`size`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buy_detail`
--
ALTER TABLE `buy_detail`
  ADD CONSTRAINT `buy_detail_ibfk_1` FOREIGN KEY (`buy_id`) REFERENCES `buy` (`buy_id`),
  ADD CONSTRAINT `buy_detail_ibfk_2` FOREIGN KEY (`full_prod_id`) REFERENCES `warehouse` (`full_prod_id`);

--
-- Constraints for table `sale_detail`
--
ALTER TABLE `sale_detail`
  ADD CONSTRAINT `sale_detail_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`sale_id`);

--
-- Constraints for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD CONSTRAINT `warehouse_ibfk_3` FOREIGN KEY (`size`) REFERENCES `size_chart` (`size`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
