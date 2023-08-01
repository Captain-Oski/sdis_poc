
DROP TABLE IF EXISTS sdis.indice_emv_ilots_data;
CREATE TABLE sdis.indice_emv_ilots_data AS 
    WITH 
        ilot_pip AS (
            SELECT
            LEFT(ididu,8) AS adidu,
            (ST_DumpPoints(ST_SetSRID(ST_GeneratePoints(geom, idpop_2021::int),3857)::geometry)).geom AS geom 
            FROM sdis.ilots
            WHERE idpop_2021 > 0 AND "caractéri" = 'Arrondissement de Montréal'
        ), 
    indice_emv_data_pip AS (
        SELECT 
            a.geom,
            b.*
        FROM
            ilot_pip a
        LEFT JOIN 
            sdis.da_data b
        ON
        a.adidu::integer = b.adidu::integer
    ) 

    SELECT 
        b.id AS hex_id,
        a.*	
    FROM 
        indice_emv_data_pip a
    LEFT JOIN 
        sdis.ilots_hex_200m b
    ON 
    st_intersects(a.geom,b.geom);



ALTER TABLE sdis.indice_emv_ilots_data
  ALTER COLUMN geom TYPE geometry(POINT, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX indice_emv_ilots_data_geom_idx ON sdis.indice_emv_ilots_data  USING GIST (geom);