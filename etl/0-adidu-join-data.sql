DROP TABLE if exists sdis.indice_emv_data_da;
create table sdis.indice_emv_data_da as
select
b.ogc_fid,
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
from sdis.indice_emv a 
left join sdis.indice_emv_data b
ON a.adidu::int4 = b.adidu::int4;