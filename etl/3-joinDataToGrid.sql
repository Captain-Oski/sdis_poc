DROP TABLE IF EXISTS sdis.indice_emv_hex_200m_result;

create table sdis.indice_emv_hex_200m_result as 
WITH temp as (
  select
    AVG(b.acp_sociale::numeric)::real AS acp_sociale,
    AVG(b.acp_econo::numeric)::real AS acp_econo,
    AVG(b.acp_environn::numeric)::real AS acp_enviro,
    AVG(b.acp_securité::numeric)::real AS acp_securite,
    AVG(b.acp_proximité::numeric)::real AS acp_proximite,
    AVG(b.acp_cultsportloisir::numeric)::real AS acp_cultsportloisir,
    MIN(b.idpop_2021::int4)* 1.4487 AS pop2021_id,
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