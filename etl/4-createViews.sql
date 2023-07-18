
DROP table if exists sdis.h3_200m;
DROP table if exists sdis.h3_400m;
DROP table if exists sdis.h3_800m;

create table sdis.h3_200m as (
with result as ( select
row_number() OVER () as id, 
AVG(acp_scl)::real as acp_scl, 
AVG(acp_ecn)::real as acp_ecn, 
AVG(acp_nvr)::real as acp_nvr, 
AVG(acp_scr)::real as acp_scr,
AVG(acp_prx)::real as acp_prx,
AVG(acp_csl)::real as acp_csl,
 sdis.indice_emv_pip.arr_vll,
sdis.indice_emv_hex_200m.geom
FROM sdis.indice_emv_hex_200m
LEFT JOIN sdis.indice_emv_pip ON st_intersects(sdis.indice_emv_hex_200m.geom,sdis.indice_emv_pip.geom)
GROUP BY sdis.indice_emv_hex_200m.geom, sdis.indice_emv_pip.arr_vll
 ), minmax as (
select 
MIN(a.acp_scl)::real as acp_scl_min, 
MIN(a.acp_ecn)::real as acp_ecn_min, 
MIN(a.acp_nvr)::real as acp_nvr_min, 
MIN(a.acp_scr)::real as acp_scr_min, 
MIN(a.acp_prx)::real as acp_prx_min,
MIN(a.acp_csl)::real as acp_csl_min,
MAX(a.acp_scl)::real as acp_scl_max, 
MAX(a.acp_ecn)::real as acp_ecn_max, 
MAX(a.acp_nvr)::real as acp_nvr_max, 
MAX(a.acp_scr)::real as acp_scr_max, 
MAX(a.acp_prx)::real as acp_prx_max,
MAX(a.acp_csl)::real as acp_csl_max
from result a
),
layer  as (
select a.*, b.* from
result a, minmax b
)
 select * from layer
);

-------------------------
create table sdis.h3_400m as (
with result as ( select
row_number() OVER () as id, 
AVG(acp_scl)::real as acp_scl, 
AVG(acp_ecn)::real as acp_ecn, 
AVG(acp_nvr)::real as acp_nvr, 
AVG(acp_scr)::real as acp_scr,
AVG(acp_prx)::real as acp_prx,
AVG(acp_csl)::real as acp_csl,
 sdis.indice_emv_pip.arr_vll,
sdis.indice_emv_hex_400m.geom
FROM sdis.indice_emv_hex_400m
LEFT JOIN sdis.indice_emv_pip ON st_intersects(sdis.indice_emv_hex_400m.geom,sdis.indice_emv_pip.geom)
GROUP BY sdis.indice_emv_hex_400m.geom, sdis.indice_emv_pip.arr_vll
 ), minmax as (
select 
MIN(a.acp_scl)::real as acp_scl_min, 
MIN(a.acp_ecn)::real as acp_ecn_min, 
MIN(a.acp_nvr)::real as acp_nvr_min, 
MIN(a.acp_scr)::real as acp_scr_min, 
MIN(a.acp_prx)::real as acp_prx_min,
MIN(a.acp_csl)::real as acp_csl_min,
MAX(a.acp_scl)::real as acp_scl_max, 
MAX(a.acp_ecn)::real as acp_ecn_max, 
MAX(a.acp_nvr)::real as acp_nvr_max, 
MAX(a.acp_scr)::real as acp_scr_max, 
MAX(a.acp_prx)::real as acp_prx_max,
MAX(a.acp_csl)::real as acp_csl_max
from result a
),
layer  as (
select a.*, b.* from
result a, minmax b
)
 select * from layer
);
-------------------------
create table sdis.h3_800m as (
with result as ( select
row_number() OVER () as id, 
AVG(acp_scl)::real as acp_scl, 
AVG(acp_ecn)::real as acp_ecn, 
AVG(acp_nvr)::real as acp_nvr, 
AVG(acp_scr)::real as acp_scr,
AVG(acp_prx)::real as acp_prx,
AVG(acp_csl)::real as acp_csl,
 sdis.indice_emv_pip.arr_vll,
sdis.indice_emv_hex_800m.geom
FROM sdis.indice_emv_hex_800m
LEFT JOIN sdis.indice_emv_pip ON st_intersects(sdis.indice_emv_hex_800m.geom,sdis.indice_emv_pip.geom)
GROUP BY sdis.indice_emv_hex_800m.geom, sdis.indice_emv_pip.arr_vll
 ), minmax as (
select 
MIN(a.acp_scl)::real as acp_scl_min, 
MIN(a.acp_ecn)::real as acp_ecn_min, 
MIN(a.acp_nvr)::real as acp_nvr_min, 
MIN(a.acp_scr)::real as acp_scr_min, 
MIN(a.acp_prx)::real as acp_prx_min,
MIN(a.acp_csl)::real as acp_csl_min,
MAX(a.acp_scl)::real as acp_scl_max, 
MAX(a.acp_ecn)::real as acp_ecn_max, 
MAX(a.acp_nvr)::real as acp_nvr_max, 
MAX(a.acp_scr)::real as acp_scr_max, 
MAX(a.acp_prx)::real as acp_prx_max,
MAX(a.acp_csl)::real as acp_csl_max
from result a
),
layer  as (
select a.*, b.* from
result a, minmax b
)
 select * from layer
);