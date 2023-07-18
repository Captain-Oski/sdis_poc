
------------------------------------------------------------------
------------------REFERENCE GRID-----------------------------
------------------------------------------------------------------
DROP TABLE IF EXISTS sdis.da_grid;
create table sdis.da_grid as select ST_UNION(indice_emv.geom) as geom
FROM
    sdis.indice_emv
;
 
 ALTER TABLE sdis.da_grid
  ALTER COLUMN geom TYPE geometry(MULTIPOLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX pip_da_grid_geom_idx ON sdis.da_grid  USING GIST (geom);

------------------------------------------------------------------
------------------REFERENCE GRID 400m-----------------------------
------------------------------------------------------------------
DROP TABLE IF EXISTS sdis.indice_emv_hex_400m;
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
