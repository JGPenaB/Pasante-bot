DROP DATABASE IF EXISTS PASANTE;

CREATE DATABASE PASANTE;

USE PASANTE;

SET GLOBAL time_zone = '-4:00';
SET NAMES utf8;

CREATE TABLE USUARIOS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    USERNAME VARCHAR(191) NOT NULL,
    VIVO ENUM('SI', 'NO')
);

INSERT INTO USUARIOS VALUES (NULL, 'Pescuaz', 'SI');
INSERT INTO USUARIOS VALUES (NULL, 'Autz', 'SI');
INSERT INTO USUARIOS VALUES (NULL, 'Bayke', 'SI');
INSERT INTO USUARIOS VALUES (NULL, 'Nicolas', 'SI');
INSERT INTO USUARIOS VALUES (NULL, 'Destrun', 'SI');
INSERT INTO USUARIOS VALUES (NULL, 'Templarius', 'SI');
INSERT INTO USUARIOS VALUES (NULL, 'Darioxlz', 'SI');
INSERT INTO USUARIOS VALUES (NULL, '3duno', 'SI');
INSERT INTO USUARIOS VALUES (NULL, 'Leo', 'SI');
INSERT INTO USUARIOS VALUES (NULL, 'Sergio', 'SI');

CREATE TABLE GANADORES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    USERNAME VARCHAR(191) NOT NULL,
    FECHA DATETIME
);

CREATE TABLE TEXTOS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    TEXTO TEXT,
    USADO ENUM ('SI', 'NO')
);

INSERT INTO TEXTOS VALUES (NULL, '{P1} se sentó a fumar un pase de montecristo cuando {P2} se le acerco y pidió... {P2} al ver que era de buena calidad se hizo el loco fumándoselo completo, {P1} al verle le cayó a lepe hasta producirle fractura de cráneo.', 'NO');
INSERT INTO TEXTOS VALUES (NULL, '{P1} y {P2} fueron a comer perros, cuando el perrero les pregunta si le echa papas {P2} dice que no, porque eso da cáncer… entre {P1} y el perrero lo cayeron a puñalada 47 veces.', 'NO');
INSERT INTO TEXTOS VALUES (NULL, '{P1} y {P2} cuadran para jugar espaditas, en eso las cosas se salen de control y {P1} le mete una pipechetada a {P2} en el cuello lo cual produce una fractura letal.', 'NO');
INSERT INTO TEXTOS VALUES (NULL, '{P1} se mete caleta 10 lineas de cocaina, empericado le salta a {P2} y le clava 28 veces un lapicero mientras le grita chavista.', 'NO');
INSERT INTO TEXTOS VALUES (NULL, '{P1} cuadra con {P2} para ver Netflix juntos, al final era una trampa y solo tenia telecaribe con juana la iguana, {P1} se le tira y le cae a lata hasta matarle… el capítulo de juana la iguana era repetido.', 'NO');
# INSERT INTO TEXTOS VALUES (NULL, '{P1} le ofreció prepararle unas arepas a {P2}, lo que nuestro amigo no sabe es que tiene diablo rojo y al comerlo le limpio hasta el alma y termino en el cielo.', 'NO');
INSERT INTO TEXTOS VALUES (NULL, '{P1} salió con el cuadre y se encuentra de casualidad con {P2}, como pilla que {P2} le quiere tumbar el cuadre, {P1} apuñala 16 veces a {P2} con un pico de botella.', 'NO');
# INSERT INTO TEXTOS VALUES (NULL, '{P2} le debe plata a {P1}, como ya tiene tiempo sin pagarle, {P1} le dice a unos panas que son MotoPiruetas que le den un susto a {P2}, como los MotoPiruetas no creen en naiden le echaron plomo a {P2}, al no ser malandro no pudo aguantar el plomo y valió vergulis.', 'NO');
INSERT INTO TEXTOS VALUES (NULL, '{P1} y {P2} fueron a los buhoneros a ver que encontraban, justo cuando salió un tema de conversación delicado… la compra de pantalones, {P1} le dice: eso no es peo tuyo si me veo bien o no, pedazo de webon. Así que le echa 3 plomazos y se va.', 'NO');
INSERT INTO TEXTOS VALUES (NULL, '{P1} y {P2} estaban hablando de que la sociedad se ha vuelto loca, cuando unas feministas extremas preguntan si las llamaron locas a ellas, {P1} para joder la paciencia dice que {P2} si lo hizo y las feministas atacan a {P2} con sus axilas peludas hasta asfixiarle.', 'NO');
INSERT INTO TEXTOS VALUES (NULL, '{P1} y {P2} cuadraron para tener sexo anal, al comienzo del acto {P1} se da cuenta que el culo de {P2} se deformo, al parecer {P2} tiene alergia al latex. Al final no puedo cagar y muere por estreñimiento crónico.', 'NO');
