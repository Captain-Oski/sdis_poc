------------------------------------------------------------------
------------------------REFERENCE  200m---------------------------
------------------------------------------------------------------
DROP TABLE IF EXISTS sdis.indice_emv_hex_200m_result;

create table sdis.indice_emv_hex_200m_result as 
WITH temp as (
  SELECT
    AVG(acp_sociale)::real as acp_sociale,
    AVG(acp_econo)::real as acp_econo,
    AVG(acp_enviro)::real as acp_enviro,
    AVG(acp_securite)::real as acp_securite,
    AVG(acp_proximite)::real as acp_proximite,
    AVG(acp_cultsportloisir)::real as acp_cultsportloisir,
    AVG(indice_emv)::real as indice_emv,
    AVG(pop2021)::real as pop2021,
    sdis.indice_emv_hex_200m.geom
  FROM sdis.indice_emv_hex_200m
  LEFT JOIN sdis.indice_emv_pip ON st_intersects(sdis.indice_emv_hex_200m.geom,sdis.indice_emv_pip.geom)
  WHERE indice_emv IS NOT NULL
  GROUP BY sdis.indice_emv_hex_200m.geom
),
result as (
  SELECT 
    ROW_NUMBER() OVER () AS id,
   b.nom,
   a.*
  FROM temp a
  JOIN sdis.arrondissements b 
  ON ST_Intersects(st_centroid(a.geom), b.geom)  
)

select * from result ;


ALTER TABLE sdis.indice_emv_hex_200m_result
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX indice_emv_hex_200m_result_geom_idx ON sdis.indice_emv_hex_200m_result  USING GIST (geom);