------------------------------------------------------------------
------------------REFERENCE ILOT UNION-----------------------------
------------------------------------------------------------------
DROP TABLE IF EXISTS sdis.ilot_grid;
CREATE TABLE sdis.ilot_grid AS SELECT ST_UNION(st_makevalid(geom)) as geom
FROM sdis.ilots
WHERE idpop_2021 > 0 and caractéri = 'Arrondissement de Montréal';

 ALTER TABLE sdis.ilot_grid
  ALTER COLUMN geom TYPE geometry(MULTIPOLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX pip_ilot_grid_geom_idx ON sdis.ilot_grid  USING GIST (geom);

------------------------------------------------------------------
------------------REFERENCE HEXGRID 200m-----------------------------
------------------------------------------------------------------

DROP TABLE IF EXISTS sdis.ilots_hex_200m;
CREATE TABLE sdis.ilots_hex_200m AS (
SELECT row_number() over () as id, ilot_grid.*, hex.geom as shape
FROM
    sdis.ilot_grid
    CROSS JOIN
    ST_HexagonGrid(200, ilot_grid.geom) AS hex
WHERE
    ST_Intersects(ilot_grid.geom, hex.geom)
  );

ALTER TABLE sdis.ilots_hex_200m DROP COLUMN geom;
ALTER TABLE sdis.ilots_hex_200m RENAME COLUMN shape TO geom;

ALTER TABLE sdis.ilots_hex_200m
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX pip_hex_200_geom_idx ON sdis.ilots_hex_200m  USING GIST (geom);
