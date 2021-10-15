-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: tvcpw8tpu4jvgnnq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com    Database: veewykwetvy92l60
-- ------------------------------------------------------
-- Server version	8.0.23

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` varchar(36) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('1','Gato'),('10','Higiene'),('11','Alimento'),('2','Perro'),('3','Hurón'),('4','Roedores'),('5','Reptiles'),('6','Peces'),('7','Anfibios'),('8','Exoticos'),('9','Aves');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` varchar(36) NOT NULL,
  `discount` float NOT NULL,
  `id_user` varchar(36) NOT NULL,
  `total` float NOT NULL,
  `sale_date` datetime NOT NULL,
  `delivery_date` datetime NOT NULL,
  `received_date` datetime NOT NULL,
  `delivery_rating` float NOT NULL,
  `id_status` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_status` (`id_status`),
  KEY `invoices_ibfk_2_idx` (`id_user`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`id_status`) REFERENCES `statuses` (`id`),
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES ('1',0,'24c846d5-87d3-411d-ac28-349a375c7f60',999,'1997-09-04 00:00:00','1997-09-04 00:00:00','1997-09-04 00:00:00',5,'1'),('2',0,'72fa84fd-2336-46ee-b817-7ff5b223242e',60,'1997-09-04 00:00:00','1997-09-04 00:00:00','1997-09-04 00:00:00',4,'4'),('3',0,'29d6ec6c-ea5a-4b59-a013-18889650b170',90,'1997-09-04 00:00:00','1997-09-04 00:00:00','1997-09-04 00:00:00',5,'3'),('4',0,'b5d6b099-44c7-479c-8041-6f4b443455c6',80,'1997-09-04 00:00:00','1997-09-04 00:00:00','1997-09-04 00:00:00',3,'3');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `image` varchar(30) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `rating` float NOT NULL,
  `reviewsAmount` int unsigned NOT NULL,
  `price` float NOT NULL,
  `brand` varchar(200) CHARACTER SET armscii8 COLLATE armscii8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('1','Rueda para hámster','rueda_hamster.jpg','¡Corre, Eddie, corre!',0.1,456,149.99,'LEE\'S'),('2','Correa Reflectante para Perros','correa_fullgaden.jpg','Correa Reflectante para Perro, Resistente, con Mango Acolchado cómodo, Color Morado',0.6,1000,219.99,'Fullgaden'),('2e6a6c24-2ef6-40cc-a899-2097903309ec','Joel Sayavedra','prod_1630508328940.jpg','io',5,500,1000,'Purina cat chow'),('3','Croquetas para gato ','prod_1626885053975.jpg','Croquetas para gatitos de 1 a 12 meses de edad. Bolsa de 1.5 kilogramos',0,0,84.5,'Purina cat chow'),('3da3d2d2-bb7c-446e-9a1f-7497849c617f','Nupec Adulto','prod_1631667665356.jpg','ALTA DIGESTIBILIDAD\r\nBalance nutricional entre proteínas, grasas, carbohidratos, vitaminas y minerales, ingredientes de la más alta calidad y procesos de alta tecnología que garantizan un máximo aprovechamiento nutricional.\r\n\r\nCON ZINC\r\nFundamental para la síntesis de las proteínas y ácidos nucleicos, claves en la inmunidad del canino.\r\n\r\nALTA PALATABILIDAD DESARROLLADA POR EXPERTOS\r\nSabor, aroma y textura únicos para NUPECMR.\r\nInyección del palatante al alto vacío, asegurando un sabor único e irresistible desde adentro de la croqueta hacia afuera.\r\n\r\nCONSERVADORES NATURALES\r\nMezcla de romero y tocoferoles que garantizan la frescura en cada croqueta, gracias a sus propiedades antioxidantes que protegen al alimento de la oxidación.\r\n\r\nFUENTE DE PROTEÍNA DE ALTA CALIDAD\r\nTecnología de punta que permite la inclusión de carne fresca directamente en el proceso de extrusión.\r\nMas del 90% de digestibilidad de la proteína.\r\n\r\nVITAMINAS A, B, C Y E\r\nBrindan una piel saludable y un pelaje hermoso.',0,0,800,'Nupec'),('441d650f-3cfd-4afe-bf58-2e6ade8ce511','Shampoo para Perros','prod_1626908470398.jpg','473 ml. \\r\\nTratamiento de la piel sensible\\r\\nLimpieza suave.\\r\\nAceite de árbol de té medicinal que ha demostrado ser eficaz contra infecciones bacterianas y fúngicas.\\r\\nAyuda a calmar la picadura y la picazón de las picaduras de insectos.\\r\\nNo hay fragancias artificiales. No hay productos químicos agresivos. Libre de parabeno.',0,0,199,'SynergyLabs'),('5271cd11-81d9-4e7e-99ca-5c5bca73a771','Casa para perro grande','prod_1631667861997.jpg','Casa Grande para el consentido de la casa. Completamente resistente para condiciones al exterior con protección UV. Piso elevado del suelo para aislar el frío y mantener fresco y seco a tu perrito. Diseñada con el tamaño ideal para razas mediana y grandes. El diseño del techo evita que la lluvia moje el interior. Con dimensiones de 90 cm de frente, 92 cm de fondo y 89 cm de alto Material resistente a la humedad y fácil de limpiar. Es la mejor de su categoría para razas grandes Contenida en una caja de 91 cm x 90 cm x 19 cm y 10 kg de peso. Se arma prácticamente en 3 minutos sin necesidad de herramienta \r\nRenueva ya la vivienda del guardián de la casa',0,0,1500,'Select Choice'),('5a0940e5-3fee-4622-aa04-06d99a1bbc1b','Estanque pequeño para pez/tortuga','prod_1631669905646.jpg','1. Mascotas sugeridas: Tortuga, cangrejo ermitaño, pequeños anfibios.\r\n2. Material: Hecho de plástico de alta calidad, seguro, no tóxico, duradero y puede soportar 150 kg de peso, permite a tus mascotas disfrutar mejor del tanque.\r\n3. El paquete incluye: 3 piezas, 1 tanque de tortuga, 1 flor de plástico, 1 absorbente de suciedad. Para hacer la vida de tu mascota más agradable.\r\n4. Excelente diseño: Cinco áreas, una zona de hibernación de reproducción, una zona de rampa de acoplamiento, una zona de alimentación de descanso y una zona de natación para satisfacer las diferentes necesidades de las mascotas.\r\n5. ¿Por qué elegirnos? Fácil de limpiar, fuerte, diseño transparente, fácil de observar. -',0,0,250,'Select Choice'),('5b14550a-b841-4ea9-ac87-5ffb1b7b9bcb','Alimento Húmedo Pedigree para perro pequeño','prod_1631670006646.jpg','PEDIGREE Sobre. Alimento para Perro Adulto de Razas Pequeñas Sabor Res en Filetes, es un delicioso alimento húmedo para perros, elaborado con una jugosa salsa, elaborado con trozos de res cocidos al vapor, que le brindan a tu mejor amigo, todo el sabor y nutrición que necesita. Es una comida 100% completa y balanceada para servir todos los días, ayudando a mantener una vida sana gracias a: - Ingredientes naturales; - Ayuda al sistema inmune: Vitamina E que fortalecen la salud de tu perro; - Sin sabores ni conservadores artificiales; - Fuente de proteína; - Balance ideal de fibras; - Con Omega 6 y Zinc para un pelo saludable. Los Sobres Pedigree para perros adultos, son un alimento húmedo para tu mascota, contiene filetitos suaves con carne de ternera, cocidos al vapor en salsa que a tu perro le encantaran por su delicioso sabor; Los puedes servir solos o mezclarlos con su alimento seco, tendrás la tranquilidad que estarás cubriendo los requerimientos nutricionales que tu perro necesita ya que son un alimento 100% completo y balanceado. ¡Descubre los deliciosos sabores y texturas de los sobres PEDIGREE! Combínalo con sus croquetas PEDIGREE, y ¡dale Sobres todos los días! Recuerda que todos los alimentos de Pedigree son respaldados por el Centro de Investigación Waltham, que es el líder en cuidado y nutrición de las mascotas.',0,0,30,'Pedigree'),('5b4655b7-2c21-44b2-8ef2-3efb33399aec','Purina Cat Chow alimento húmedo gatito','prod_1631669637260.jpg','El único alimento húmedo enfocado en proteger la salud de tu gato\r\nContiene un mix de minerales que ayuda a mantener balanceado el PH de su orina\r\ny un nivel de humedad y minerales adicionados para ayudar a mantenerlo hidratado\r\ncon antioxidantes que protegen su sistema inmune',0,0,15,'Purina'),('5ed026d3-9c73-4ee3-9088-689f55cd3a0a','Nupec Alimento húmedo Kitten','prod_1631669807497.jpg','Alimento húmedo para gato que ayuda al desarrollo visual del gatito. Con taurina, carne y derivados de cerdo (hígado, pulmón, bazo) y/o pollo (retazo, hígado, corazón). Alimento completo para gatitos. Servir a temperatura ambiente. Es recomendable ajustar la cantidad de alimento de acuerdo al nivel de actividad, raza y edad de su gato.',0,0,25,'Nupec'),('6bc868aa-54d3-4761-9aa1-f9d6a3bba4d1','Pro Plan Urinary Care Alimento Húmedo','prod_1631669557764.jpg','Especialmente formulado para obtener un pH en la orina ligeramente más ácido para ayudar a disolver los cálculos de estruvita\r\nCon una proporción adecuada de sodio para fomentar el consumo de agua, lo que ayuda a reducir la formación de cristales urinarios de estruvita y oxalato\r\nTecnología Optitract with Dual Stone Protection, combinación exclusiva de nutrientes, manteniendo y protegiendo la salud del tracto urinario inferior de los gatos adultos\r\nLa inclusión de minerales quelados ayuda a asegurar una óptima disponibilidad y absorción de nutrientes clave para el crecimiento saludable',0,0,20,'Purina'),('6d1debe1-6d51-4664-acc8-ccef2560864e','Nupec Adulto Raza Pequeña','prod_1631668037809.jpg','ALTA DIGESTIBILIDAD\r\nBalance nutricional entre proteínas, grasas, carbohidratos, vitaminas y minerales, ingredientes de la más alta calidad y procesos de alta tecnología que garantizan un máximo aprovechamiento nutricional.\r\n\r\nCON ZINC\r\nFundamental para la síntesis de las proteínas y ácidos nucélicos, claves en la inmunidad del cachorro.\r\n\r\nALTA PALATABILIDAD DESARROLLADA POR EXPERTOS\r\nSabor, aroma y textura únicos para NUPECMR.\r\nInyección del palatante al alto vacío, asegurando un sabor único e irresistible desde adentro de la croqueta hacia afuera.\r\n\r\nCONSERVADORES NATURALES\r\nMezcla de romero y tocoferoles que garantizan la frescura en cada croqueta, gracias a sus propiedades antioxidantes que protegen al alimento de la oxidación.\r\n\r\nFUENTE DE PROTEÍNA DE ALTA CALIDAD\r\nTecnología de punta que permite la inclusión de carne fresca directamente en el proceso de extrusión.\r\nMas del 90% de digestibilidad de la proteína.',0,0,900,'Nupec'),('7cca2266-cf5d-4b35-bbfc-56ca212acd6c','Nupec Adulto Gato','prod_1631668164740.jpg','Alimento seco para gato adulto con carne de pollo y salmon fresco de alta digestibilidad\r\nPrebioticos que promueven una microflora saludable\r\nVitaminas de complejo b y romero que regulan el sistema nervioso y controlan el estrés',0,0,400,'Nupec'),('8f228d9d-5e6a-495f-b855-8e99befe81c4','Bebedero automático para gato','prod_1631667479920.jpg','Fuente de agua para gatos, dispensador de agua para perros, de 1.8 litros, fuente automática de agua potable para mascotas, con tres filtros de repuesto, una bomba inteligente, un paquete de cepillo de limpieza, una alfombrilla de silicona para alimentos, un adaptador para gatos y perros en interiores',0,0,850,'Eukanuba'),('905b898e-a1c2-434d-93ae-4be868451dfc','Nupec Gato Kitten','prod_1631668250461.jpg','Alimento seco para gato adulto con carne de pollo y salmon fresco de alta digestibilidad\r\nPrebioticos que promueven una microflora saludable\r\nVitaminas de complejo b y romero que regulan el sistema nervioso y controlan el estrés',0,0,350,'Nupec'),('b5693b73-1308-4dac-86db-860619891a73','Cápsula para gato','prod_1631667575950.jpg','Transportín de burbujas expandible: cuenta con una espaciosa cama temporal mientras se expande descomprimiendo el panel trasero de la mochila para mascotas. El diseño de burbujas de cápsula espacial hace que tu mascota se sienta más segura, cómoda y proporciona una visión visual más amplia.\r\nMochila para gatos duradera y segura: hecha de tela Oxford de alta calidad, impermeable, antiarañazos, respetuosa con el medio ambiente, no tóxica y no irritante. Carcasa superresistente al desgaste perfectamente contra mordeduras y arañazos por las mascotas.\r\nMochila ventilada e higiénica para mascotas: 12 agujeros de ventilación alrededor de este transportín para mascotas y dos ventanas laterales para realizar una gran circulación de aire en el interior. Equipado con una almohadilla inferior resistente y suave que hace que tu mascota sea cómoda e higiénica.\r\nCómodo para los amantes de las mascotas: correas acolchadas ajustables y correa de pecho mantienen las correas de hombro de tu mochila de gato en su lugar de forma segura. Puedes llevar la mochila ya sea en tu espalda o en tu parte delantera, o llevarla con una sola mano.\r\nDisfruta de viajes con tu mascota: correa integrada con clip para asegurar el arnés y el collar de la mascota, evita que la mascota se escape o se pierda cuando la bolsa está abierta. Bolsillo lateral de malla diseñado para sostener la botella de agua. Perfecto para llevar perros pequeños o gatos para ciclismo, senderismo, camping, caminar o conocer amigos. Se adapta a gatos de hasta 12 libras o cachorros de 10 libras. La mayoría de las aerolíneas aprobadas debajo del asiento. Importante: comprueba los requisitos de tu aerolínea antes de viajar',0,0,450,'Mr Happy'),('c51ae418-bf1a-4da3-9569-71f7fc05edda','Hamaca colgante de animal pequeño','prod_1626907966393.jpg','Hamaca colgante de animal pequeño de triple capa.  Juguete para hurones, cobayas, hámster, rata, chinchilla, loro, ardilla, gerbo, pájaro.',0,0,349.5,'HOMEYA'),('d69a4cac-6163-496c-95d7-6c302fac439f','Critter Nation with Stand','prod_1626908185859.jpg','Jaula para roedores de dos pisos, con bandeja para recoger desperdicios.',0,0,3589.6,'MidWest Homes for Pets'),('dccb12b1-b6e6-4a44-aae7-e048f5e7b2ea','Pechera para perro grande','prod_1631668458132.jpg','COMFORT: Ajustable, cuenta con correa ajustable para cachorros y perros adultos de cualquier raza y tamaño chico, mediano o grande, ofreciendo protección y comodidad al mismo tiempo mientras sales a pasear con tu mascota. La pechera anti tirones de ofrece seguridad y comfort total a tu mascota mientras lo sacas de paseo o lo llevas a sesiones de entrenamiento. Tiene un ajuste perfecto, suave y cómodo.\r\nDISEÑO: Este collar entrenador está fabricado de nylon y poliéster ligero de alta calidad y resistencia para brindar el máximo comfort, distribuyendo uniformemente la presión de la correa en cuello y hombros sin riesgo de lastimarlo.\r\nBANDAS REFLECTORAS INCLUIDO: Las bandas reflectoras son especiales para la visibilidad nocturna y aseguran una mayor seguridad cuando salgas a pasear a tu perro. Saca a pasear a tu mascota con seguridad y no permitas que los conductores distraídos provoquen un accidente.\r\nDISTINTAS MEDIDAS: Disponible en varias medidas para asegurar que encuentras la perfecta para tu mascota. Por favor asegurarse de medir bien a la mascota antes de hacer la compra. SI tu perro sigue en crecimiento y su medida está en un rango alto, es recomendable comprar una talla arriba para de la suya.\r\nPRODUCTO GARANTIZADO: Todos los productos vendidos por Atomzone products están completamente garantizados. brindarte un excelente servicio al cliente y la entrega rápida de Mexico.',0,0,550,'Mr Happy'),('f2fe6d62-4999-454d-9871-8e916411c1d4','Pack 4 collares para gato','prod_1631668392228.jpg','4 collares ajustables de 20-30 cm de perímetro, ideal para gato adulto. Tela resistente a jalones, arañazos y confort que no lastima ni pica',0,0,300,'ICA'),('Prueba 1','Prueba','default.jpg','Prueba',0,0,0,'a'),('Prueba 2','Prueba','default.jpg','Prueba',0,0,0,'a'),('Prueba 3','Prueba','default.jpg','Prueba',0,0,0,'a'),('Prueba 4','Prueba','default.jpg','Prueba',0,0,0,'a');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_categories`
--

DROP TABLE IF EXISTS `products_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_categories` (
  `id` varchar(36) NOT NULL,
  `id_product` varchar(36) NOT NULL,
  `id_category` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_categories_ibfk_1_idx` (`id_product`),
  KEY `products_categories_ibfk_1_idx1` (`id_category`),
  CONSTRAINT `products_categories_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  CONSTRAINT `products_categories_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_categories`
--

LOCK TABLES `products_categories` WRITE;
/*!40000 ALTER TABLE `products_categories` DISABLE KEYS */;
INSERT INTO `products_categories` VALUES ('1','1','1'),('2','1','3'),('3','2','2'),('4','2','3');
/*!40000 ALTER TABLE `products_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_invoices`
--

DROP TABLE IF EXISTS `products_invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_product` varchar(36) NOT NULL,
  `id_invoice` varchar(36) NOT NULL,
  `sold_price` varchar(36) NOT NULL,
  `amount` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_invoices_ibfk_2_idx` (`id_invoice`),
  KEY `products_invoices_ibfk_1_idx` (`id_product`),
  CONSTRAINT `products_invoices_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  CONSTRAINT `products_invoices_ibfk_2` FOREIGN KEY (`id_invoice`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_invoices`
--

LOCK TABLES `products_invoices` WRITE;
/*!40000 ALTER TABLE `products_invoices` DISABLE KEYS */;
INSERT INTO `products_invoices` VALUES (1,'905b898e-a1c2-434d-93ae-4be868451dfc','1','350',1),(2,'b5693b73-1308-4dac-86db-860619891a73','1','450',1),(3,'8f228d9d-5e6a-495f-b855-8e99befe81c4','1','850',1),(4,'441d650f-3cfd-4afe-bf58-2e6ade8ce511','2','50',1),(5,'5271cd11-81d9-4e7e-99ca-5c5bca73a771','2','20',1),(6,'5a0940e5-3fee-4622-aa04-06d99a1bbc1b','2','150',1),(7,'6bc868aa-54d3-4761-9aa1-f9d6a3bba4d1','3','20',1),(8,'5271cd11-81d9-4e7e-99ca-5c5bca73a771','3','30',1),(9,'1','4','40',1),(10,'2','4','50',3);
/*!40000 ALTER TABLE `products_invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` varchar(36) NOT NULL,
  `id_product` varchar(36) NOT NULL,
  `id_user` varchar(36) NOT NULL,
  `review` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_fk1_idx` (`id_product`),
  KEY `reviews_fk2_idx` (`id_user`),
  CONSTRAINT `reviews_fk1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  CONSTRAINT `reviews_fk2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES ('1','1','5dbb7d33-e14b-4421-9430-92333874c4d9','Pésima rueda, muy incómoda, no la recomiendo','1997-09-04 00:00:00',1),('2','1','f542c398-bff2-4dd7-8009-c275ea127e44','Excelente rueda, 10 de 10','1997-09-04 00:00:00',5),('3','905b898e-a1c2-434d-93ae-4be868451dfc','24c846d5-87d3-411d-ac28-349a375c7f60','Son buenas, pero no son nada comparado con el alimento húmedo','1997-09-04 00:00:00',3),('4','5ed026d3-9c73-4ee3-9088-689f55cd3a0a','24c846d5-87d3-411d-ac28-349a375c7f60','Son el cielo hecho comida, recomensadísimas','1997-09-04 00:00:00',5),('5','2e6a6c24-2ef6-40cc-a899-2097903309ec','24c846d5-87d3-411d-ac28-349a375c7f60','Buen esclavo, aunque debería servirme más sobres','1997-09-04 00:00:00',4);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statuses` (
  `id` varchar(36) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statuses`
--

LOCK TABLES `statuses` WRITE;
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
INSERT INTO `statuses` VALUES ('1','Programado'),('2','En camino'),('3','Entregado'),('4','Esperando pago');
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `nombreUsuario` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `nombrePila` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `imagenPerfil` varchar(45) NOT NULL,
  `tipoUsuario` varchar(45) NOT NULL DEFAULT 'cliente',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('24c846d5-87d3-411d-ac28-349a375c7f60','Pusa Westerosi','Sayavedra','Pusa','ximeehfranco@gmail.com','$2a$12$5gKQuqdzKf9BCwVsFusLK.A0oyfO25GB63qzEyeGrKzkm5hWyR2DC','5560986010',NULL,'users_1631668560626.jpg','cliente'),('29d6ec6c-ea5a-4b59-a013-18889650b170','añañin','amaraquelinda','Aladin','cringe@mail.com','$2a$12$f4h0YJyLvD.BOdt10PmOBuAaKwEWb5m6NrZ/ZjgtT5xndq9aHNPEq','8978455623',NULL,'users_1632272713387.jpg','cliente'),('4daaed1e-a90d-4326-ad67-e3aa379943e3','jarronbonito','Sanchez','Benedicto','benedicto0@test.com','$2a$12$6cjTsJDRLMdfKB5Lx/5Lg.p8o9LdfUhj07bN4B1KqrTVEVG4W0uji','4835448790',NULL,'users_1631669759550.jpg','cliente'),('5dbb7d33-e14b-4421-9430-92333874c4d9','Eduardot','Acosta','eduardo','test@test.com','$2a$12$PVIDS75eGWiyM85Cdc1s1uRTLhBABLnh53r/BkYlPYq1Rr2fFbC66','1234567889',NULL,'users_1632272378906.jpg','cliente'),('72fa84fd-2336-46ee-b817-7ff5b223242e','CabaioPan','Salvaje','Caballo','cabaiopan@mail.com','$2a$12$/gdKkoAUBy0cNaEjP8mf1Oel3X/XQg.ocS0JBCY0BhXVRjSwBIz7C','5555111122',NULL,'users_1631670188789.jpg',''),('8c118f45-1353-4971-bd23-375820c2eab8','SeñordeGafas','Medina','Luis','prueba@mail.com','$2a$12$Sxe4yBzzAX0T5FJWjM3gWO.O2m0UwwAVBBGBhlieF.NTeW0uQnor6','5554444888',NULL,'users_1631670271775.jpg',''),('b5d6b099-44c7-479c-8041-6f4b443455c6','Mamá_Coco','Manolo','Adrés','itsmo@mail.com','$2a$12$VwahxiiZUOYtme996ARAf.mRva7sOw/Bv0ONSDSCibMdDT6SVmjxy','9999999999',NULL,'users_1632273110354.jpg','cliente'),('bb99e8e5-3b9f-47b1-a56c-c26d09ffcce4','PruebaUsuario','Carrito','Carrito','test@test.com','$2a$12$pvX2.TYaUl5KNo/1BOH7j.mSxuYByBcFUDurK3KRdAv.oyPByDkku','7894561318',NULL,'Portrait_Placeholder.png','cliente'),('d6d9e8c5-e7d7-4264-af4f-cdb3d750e3df','Señoradegafas','degafas','señora','pasamada@mail.com','$2a$12$dAvBzd6WPvta8us7AbN.3ObzjQW/3DVIN.NsgALlH.HuGVMLmZ//a','5689784512',NULL,'users_1632272066998.jpg','cliente'),('f542c398-bff2-4dd7-8009-c275ea127e44','test1','test','testing','test@test.com','$2a$12$SemQPYY7AR/IVJOn3bOluOKOtYxELHC/rqEuxiN7L4./51ijTVx0W','7894561230',NULL,'peeper.jpg','cliente'),('f601d08c-be2b-424b-b88c-97ea3127e177','hijoconsentido','andarroza','tilin','pasadas@mail.com','$2a$12$VBOeBVdzZKC4AXdQrzjq9eGX6AACXuEk54wUP.RmKIVM2QKMihTEC','789465130',NULL,'default.png','cliente');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-24 23:13:50
