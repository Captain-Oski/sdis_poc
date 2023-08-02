------------------------------------------------------------------
------------------REFERENCE indice_emv_ilots_data-----------------------------
------------------------------------------------------------------
DROP TABLE IF EXISTS sdis.indice_emv_ilots_data;
CREATE TABLE sdis.indice_emv_ilots_data AS 
    WITH 
        ilot_pip AS (
            SELECT
            LEFT(ididu,8) AS adidu,
            idpop_2021,
            (ST_DumpPoints(ST_SetSRID(ST_GeneratePoints(geom, idpop_2021::int),3857)::geometry)).geom AS geom 
            FROM sdis.ilots
            WHERE idpop_2021 > 0 AND "caractéri" = 'Arrondissement de Montréal'
        ), 
    indice_emv_data_pip AS (
        SELECT 
            a.geom,
	        b.adidu, 
            a.idpop_2021,
	        b.pop2021,
            b.arr_ville,
            b.acp_sociale ,
            b.acp_econo,
            b.acp_environn,
            b.acp_securité,
            b.acp_proximité,
            b.acp_cultsportloisir
        FROM
            ilot_pip a
        LEFT JOIN 
            sdis.da_data b
        ON
        a.adidu::integer = b.adidu::integer
    ) 

    SELECT 
        *
    FROM 
        indice_emv_data_pip;

ALTER TABLE sdis.indice_emv_ilots_data
  ALTER COLUMN geom TYPE geometry(point, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX indice_emv_ilots_data_geom_idx ON sdis.indice_emv_ilots_data  USING GIST (geom);
