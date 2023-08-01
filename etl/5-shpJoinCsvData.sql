DROP TABLE if exists sdis.indice_emv_data_da;
create table sdis.indice_emv_data_da as
select
b.adidu,
b.arr_ville,
b.pop2021,
b.logpriv2021,
b.acp_sociale_2quintiles as acp_sociale,
b.acp_econo_2quintiles as acp_econo,
b.acp_enviro_2quintiles as acp_enviro,
b.acp_securite_2quintiles as acp_securite,
b.acp_proximite_2quintiles as acp_proximite,
b.acp_cultsportloisir_2quintiles as acp_cultsportloisir,
b.indice_emv,
a.geom
from sdis.da_geom a 
left join sdis.da_data b
ON a.adidu::int4 = b.adidu::int4;

ALTER TABLE sdis.indice_emv_data_da
  ALTER COLUMN geom TYPE geometry(MULTIPOLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX indice_emv_data_da_geom_idx ON sdis.indice_emv_data_da  USING GIST (geom);