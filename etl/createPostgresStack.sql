CREATE DATABASE sdis;
\c sdis
CREATE EXTENSION postgis;
-- CREATE EXTENSION postgis_raster;
-- CREATE EXTENSION pgh3;
CREATE schema sdis;
SET search_path TO sdis;
CREATE USER admin_geo SUPERUSER password 'password';
GRANT ALL ON SCHEMA sdis TO admin_geo;