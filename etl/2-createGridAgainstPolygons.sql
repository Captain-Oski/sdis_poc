
------------------------------------------------------------------
------------------REFERENCE GRID-----------------------------
------------------------------------------------------------------

create table sdis.da_grid as select ST_UNION(indice_emv.geom) as geom
FROM
    sdis.indice_emv
;
 
 ALTER TABLE sdis.da_grid
  ALTER COLUMN geom TYPE geometry(MULTIPOLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX pip_da_grid_geom_idx ON sdis.da_grid  USING GIST (geom);

------------------------------------------------------------------
------------------REFERENCE GRID 100m-----------------------------
------------------------------------------------------------------

create table sdis.indice_emv_hex_100m as (
SELECT da_grid.*, hex.geom as shape
FROM
    sdis.da_grid
    CROSS JOIN
    ST_HexagonGrid(100, da_grid.geom) AS hex
WHERE
    ST_Intersects(da_grid.geom, hex.geom)
  );

ALTER TABLE sdis.indice_emv_hex_100m DROP COLUMN geom;
ALTER TABLE sdis.indice_emv_hex_100m RENAME COLUMN shape TO geom;

ALTER TABLE sdis.indice_emv_hex_100m
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX pip_hex_100_geom_idx ON sdis.indice_emv_hex_100m  USING GIST (geom);

------------------------------------------------------------------
------------------REFERENCE GRID 200m-----------------------------
------------------------------------------------------------------

create table sdis.indice_emv_hex_200m as (
SELECT da_grid.*, hex.geom as shape
FROM
    sdis.da_grid
    CROSS JOIN
    ST_HexagonGrid(200, da_grid.geom) AS hex
WHERE
    ST_Intersects(da_grid.geom, hex.geom)
  );

ALTER TABLE sdis.indice_emv_hex_200m DROP COLUMN geom;
ALTER TABLE sdis.indice_emv_hex_200m RENAME COLUMN shape TO geom;

ALTER TABLE sdis.indice_emv_hex_200m
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX pip_hex_200_geom_idx ON sdis.indice_emv_hex_200m  USING GIST (geom);

------------------------------------------------------------------
------------------REFERENCE GRID 400m-----------------------------
------------------------------------------------------------------

create table sdis.indice_emv_hex_400m as (
SELECT da_grid.*, hex.geom as shape
FROM
    sdis.da_grid
    CROSS JOIN
    ST_HexagonGrid(400, da_grid.geom) AS hex
WHERE
    ST_Intersects(da_grid.geom, hex.geom)
  );

ALTER TABLE sdis.indice_emv_hex_400m DROP COLUMN geom;
ALTER TABLE sdis.indice_emv_hex_400m RENAME COLUMN shape TO geom;

ALTER TABLE sdis.indice_emv_hex_400m
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX pip_hex_400_geom_idx ON sdis.indice_emv_hex_400m  USING GIST (geom);

------------------------------------------------------------------
------------------REFERENCE GRID 800m-----------------------------
------------------------------------------------------------------

create table sdis.indice_emv_hex_800m as (
SELECT da_grid.*, hex.geom as shape
FROM
    sdis.da_grid
    CROSS JOIN
    ST_HexagonGrid(800, da_grid.geom) AS hex
WHERE
    ST_Intersects(da_grid.geom, hex.geom)
  );

ALTER TABLE sdis.indice_emv_hex_800m DROP COLUMN geom;
ALTER TABLE sdis.indice_emv_hex_800m RENAME COLUMN shape TO geom;

ALTER TABLE sdis.indice_emv_hex_800m
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX pip_hex_800_geom_idx ON sdis.indice_emv_hex_800m  USING GIST (geom);

------------------------------------------------------------------
------------------REFERENCE GRID 1000m-----------------------------
------------------------------------------------------------------

create table sdis.indice_emv_hex_1000m as (
SELECT da_grid.*, hex.geom as shape
FROM
    sdis.da_grid
    CROSS JOIN
    ST_HexagonGrid(1000, da_grid.geom) AS hex
WHERE
    ST_Intersects(da_grid.geom, hex.geom)
  );

ALTER TABLE sdis.indice_emv_hex_1000m DROP COLUMN geom;
ALTER TABLE sdis.indice_emv_hex_1000m RENAME COLUMN shape TO geom;

ALTER TABLE sdis.indice_emv_hex_1000m
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX pip_hex_1000_geom_idx ON sdis.indice_emv_hex_1000m  USING GIST (geom);