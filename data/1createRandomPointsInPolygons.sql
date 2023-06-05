CREATE TABLE sdis.indice_emv_pip AS SELECT 
adidu,
arr_vll,
type,
pop2021,
lgp2021,
nb2021_,
mono_pr,
immrc_p,
atchmn_,
snsdpl_,
pr_mn_b,
pr_mn_s,
p__a_ap,
pr_lq60,
pr_ncnp,
pr_n300,
pr_lgch,
mfts_pn
cllsns_,
crms_pn,
nb_cm___,
nb_r___,
nb_ph__,
nb_cl___,
nb_p_tc,
n____30,
n______,
nb_q___,
spr____,
acp_scl,
acp_ecn,
acp_nvr,
acp_scr,
acp_prx,
acp_csl,
idugd,
supterr,
pridu,
ST_SetSRID(ST_GeneratePoints(geom, ie."pop2021"::int4),3857)::geometry as geom from sdis.indice_emv ie
;

ALTER TABLE sdis.indice_emv_pip
  ALTER COLUMN geom TYPE geometry(MULTIPOINT, 3857)
    USING ST_SetSRID(geom,3857)
;
    
CREATE INDEX pip_geom_idx ON sdis.indice_emv_pip USING GIST (geom)
;