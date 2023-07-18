DROP TABLE IF exists sdis.indice_emv_pip;
CREATE TABLE sdis.indice_emv_pip AS SELECT ogc_fid
adidu,
arr_ville,
pop2021,
logpriv2021,
acp_sociale_2quintiles,
acp_econo_2quintiles,
acp_enviro_2quintiles,
acp_securite_2quintiles,
acp_proximite_2quintiles,
acp_cultsportloisir_2quintiles,
indice_emv,
(ST_DumpPoints(ST_SetSRID(ST_GeneratePoints(geom, pop2021),3857)::geometry)).geom as geom 
from sdis.test
;

ALTER TABLE sdis.indice_emv_pip
  ALTER COLUMN geom TYPE geometry(POINT, 3857)
    USING ST_SetSRID(geom,3857)
;
    
CREATE INDEX pip_geom_idx ON sdis.indice_emv_pip USING GIST (geom)