CREATE DATABASE bancosolar;

CREATE TABLE public.usuarios (
	id serial4 NOT NULL,
	nombre varchar(50) NULL,
	balance float8 NULL,
	CONSTRAINT usuarios_balance_check CHECK ((balance >= (0)::double precision)),
	CONSTRAINT usuarios_pkey PRIMARY KEY (id)
);


CREATE TABLE public.transferencias (
	id serial4 NOT NULL,
	emisor varchar NULL,
	receptor varchar NULL,
	monto float8 NULL,
	fecha timestamp NULL,
	CONSTRAINT transferencias_pkey PRIMARY KEY (id)
);


/*
CREATE TABLE public.transferencias (
	id serial4 NOT NULL,
	emisor int4 NULL,
	receptor int4 NULL,
	monto float8 NULL,
	fecha timestamp NULL,
	CONSTRAINT transferencias_pkey PRIMARY KEY (id)
);
*/