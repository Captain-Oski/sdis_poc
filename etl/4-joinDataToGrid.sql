DROP TABLE IF EXISTS sdis.indice_emv_hex_200m_result;

create table sdis.indice_emv_hex_200m_result as 
WITH temp as (
  select
    ROUND(AVG(replace(b.acp_sociale, ',', '.')::numeric), 2)::real AS acp_sociale,
    ROUND(AVG(replace(b.acp_econo, ',', '.')::numeric), 2)::real AS acp_econo,
    ROUND(AVG(replace(b.acp_environn, ',', '.')::numeric), 2)::real AS acp_enviro,
    ROUND(AVG(replace(b.acp_securité, ',', '.')::numeric), 2)::real AS acp_securite,
    ROUND(AVG(replace(b.acp_proximité, ',', '.')::numeric), 2)::real AS acp_proximite,
    ROUND(AVG(replace(b.acp_cultsportloisir, ',', '.')::numeric), 2)::real AS acp_cultsportloisir,
    MIN(idpop_2021::int4)* 1.4487 AS pop2021_id,
    a.geom
	FROM sdis.ilots_hex_200m a
	LEFT JOIN sdis.indice_emv_ilots_data b ON st_intersects(a.geom, b.geom)
	GROUP BY a.geom
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