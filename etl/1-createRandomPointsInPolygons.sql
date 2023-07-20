DROP TABLE IF exists sdis.indice_emv_pip;
CREATE TABLE sdis.indice_emv_pip AS SELECT
adidu,
arr_ville,
pop2021,
logpriv2021,
acp_sociale as acp_sociale,
acp_econo as acp_econo,
acp_enviro as acp_enviro,
acp_securite as acp_securite,
acp_proximite as acp_proximite,
acp_cultsportloisir as acp_cultsportloisir,
indice_emv,
(ST_DumpPoints(ST_SetSRID(ST_GeneratePoints(geom, pop2021),3857)::geometry)).geom as geom 
from sdis.indice_emv_data_da
;

ALTER TABLE sdis.indice_emv_pip
  ALTER COLUMN geom TYPE geometry(POINT, 3857)
    USING ST_SetSRID(geom,3857)
;
    
CREATE INDEX pip_geom_idx ON sdis.indice_emv_pip USING GIST (geom)