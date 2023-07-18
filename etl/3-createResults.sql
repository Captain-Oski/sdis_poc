------------------------------------------------------------------
------------------------REFERENCE  800m---------------------------
------------------------------------------------------------------

create table sdis.indice_emv_hex_800m_result as select 
AVG(acp_sociale_2quintiles)::real as acp_sociale,
AVG(acp_econo_2quintiles)::real as acp_econo,
AVG(acp_enviro_2quintiles)::real as acp_enviro,
AVG(acp_securite_2quintiles)::real as acp_securite,
AVG(acp_proximite_2quintiles)::real as acp_proximite,
AVG(acp_cultsportloisir_2quintiles)::real as acp_cultsportloisir,
AVG(indice_emv) as indice_emv,
sdis.indice_emv_hex_800m.geom
FROM sdis.indice_emv_hex_800m
LEFT JOIN sdis.indice_emv_pip ON st_intersects(sdis.indice_emv_hex_800m.geom,sdis.indice_emv_pip.geom)
GROUP BY sdis.indice_emv_hex_800m.geom;

ALTER TABLE sdis.indice_emv_hex_800m_acp_avg
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX indice_emv_hex_800m_result_geom_idx ON sdis.indice_emv_hex_800m_result  USING GIST (geom);