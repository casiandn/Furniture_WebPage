create database if not exists Muebles character set 'utf8mb4' collate 'utf8mb4_unicode_ci';

create table Producto (
	codigoProducto mediumint auto_increment primary key,
    nombre varchar(40) not null,
    cantidadEnStock mediumint default 100,
    categoria enum('Colchones', 'Canapes', 'Bases y Somieres', 'Almohadas', 'Ropa de Cama', 'Sanitaria') not null,
    dimensiones varchar(10) not null,
    descripcion varchar(200) not null,
    precioBase int not null,
    precioVenta int not null,
    fechaPuestaVenta datetime default now(),
    imagen varchar(100) not null
);
#drop table producto;

#alter table Producto modify column fecha datetime default now();