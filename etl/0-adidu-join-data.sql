DROP TABLE if exists sdis.test;
create table sdis.test as
select b.*, a.geom
from sdis.indice_emv a 
left join sdis.indice_emv_data b
ON a.adidu::int4 = b.adidu::int4;