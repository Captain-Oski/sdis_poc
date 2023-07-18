------------------------------------------------------------------
------------------------REFERENCE  400m---------------------------
------------------------------------------------------------------
DROP TABLE IF EXISTS sdis.indice_emv_hex_400m_result;
create table sdis.indice_emv_hex_400m_result as select 
AVG(acp_sociale_2quintiles)::real as acp_sociale,
AVG(acp_econo_2quintiles)::real as acp_econo,
AVG(acp_enviro_2quintiles)::real as acp_enviro,
AVG(acp_securite_2quintiles)::real as acp_securite,
AVG(acp_proximite_2quintiles)::real as acp_proximite,
AVG(acp_cultsportloisir_2quintiles)::real as acp_cultsportloisir,
AVG(indice_emv)::real as indice_emv,
AVG(pop2021)::real as pop2021,
sdis.indice_emv_hex_400m.geom
FROM sdis.indice_emv_hex_400m
LEFT JOIN sdis.indice_emv_pip ON st_intersects(sdis.indice_emv_hex_400m.geom,sdis.indice_emv_pip.geom)
WHERE indice_emv IS NOT NULL
GROUP BY sdis.indice_emv_hex_400m.geom;

ALTER TABLE sdis.indice_emv_hex_400m_result
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX indice_emv_hex_400m_result_geom_idx ON sdis.indice_emv_hex_400m_result  USING GIST (geom);