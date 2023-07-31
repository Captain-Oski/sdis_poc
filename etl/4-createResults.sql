------------------------------------------------------------------
---- OBSOLETE 31-07-2023 ------
------------------------------------------------------------------
DROP TABLE IF EXISTS sdis.indice_emv_hex_200m_result;

create table sdis.indice_emv_hex_200m_result as 
WITH temp as (
  SELECT
    ROUND(AVG(b.acp_sociale::real),2)::real as acp_sociale,
    ROUND(AVG(b.acp_econo),2)::real as acp_econo,
    ROUND(AVG(b.acp_enviro),2)::real as acp_enviro,
    ROUND(AVG(b.acp_securite),2)::real as acp_securite,
    ROUND(AVG(b.acp_proximite),2)::real as acp_proximite,
    ROUND(AVG(b.acp_cultsportloisir),2)::real as acp_cultsportloisir,
    ROUND(AVG(b.indice_emv),2)::real as indice_emv,
    AVG(pop2021)::int4 as pop2021,
    a.geom
  FROM sdis.indice_emv_hex_200m a
  LEFT JOIN sdis.indice_emv_ilots_data b ON st_intersects(sdis.indice_emv_hex_200m.geom,sdis.indice_emv_ilots_data.geom)
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