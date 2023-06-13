------------------------------------------------------------------
------------------------REFERENCE 200m----------------------------
------------------------------------------------------------------

create table sdis.indice_emv_hex_100m_acp_avg as select 
AVG(acp_scl)::real as acp_scl, 
AVG(acp_ecn)::real as acp_ecn, 
AVG(acp_nvr)::real as acp_nvr, 
AVG(acp_scr)::real as acp_scr, 
AVG(acp_prx)::real as acp_prx,
AVG(acp_csl)::real as acp_csl,
sdis.indice_emv_pip.adidu,
sdis.indice_emv_pip.arr_vll,
sdis.indice_emv_hex_100m.geom
FROM sdis.indice_emv_hex_100m
LEFT JOIN sdis.indice_emv_pip ON st_intersects(sdis.indice_emv_hex_100m.geom,sdis.indice_emv_pip.geom)
GROUP BY sdis.indice_emv_hex_100m.geom;

ALTER TABLE sdis.indice_emv_hex_100m_acp_avg
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX indice_emv_hex_100m_acp_avg_geom_idx ON sdis.indice_emv_hex_100m_acp_avg  USING GIST (geom);


------------------------------------------------------------------
------------------------REFERENCE 200m----------------------------
------------------------------------------------------------------

create table sdis.indice_emv_hex_200m_acp_avg as select 
AVG(acp_scl)::real as acp_scl, 
AVG(acp_ecn)::real as acp_ecn, 
AVG(acp_nvr)::real as acp_nvr, 
AVG(acp_scr)::real as acp_scr, 
AVG(acp_prx)::real as acp_prx,
AVG(acp_csl)::real as acp_csl,
sdis.indice_emv_pip.adidu,
sdis.indice_emv_pip.arr_vll,
sdis.indice_emv_hex_200m.geom
FROM sdis.indice_emv_hex_200m
LEFT JOIN sdis.indice_emv_pip ON st_intersects(sdis.indice_emv_hex_200m.geom,sdis.indice_emv_pip.geom)
GROUP BY sdis.indice_emv_hex_200m.geom;

ALTER TABLE sdis.indice_emv_hex_200m_acp_avg
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX indice_emv_hex_200m_acp_avg_geom_idx ON sdis.indice_emv_hex_200m_acp_avg  USING GIST (geom);


------------------------------------------------------------------
------------------------REFERENCE 400m----------------------------
------------------------------------------------------------------

create table sdis.indice_emv_hex_400m_acp_avg as select 
AVG(acp_scl)::real as acp_scl, 
AVG(acp_ecn)::real as acp_ecn, 
AVG(acp_nvr)::real as acp_nvr, 
AVG(acp_scr)::real as acp_scr, 
AVG(acp_prx)::real as acp_prx,
AVG(acp_csl)::real as acp_csl,
sdis.indice_emv_pip.adidu,
sdis.indice_emv_pip.arr_vll,
sdis.indice_emv_hex_400m.geom
FROM sdis.indice_emv_hex_400m
LEFT JOIN sdis.indice_emv_pip ON st_intersects(sdis.indice_emv_hex_400m.geom,sdis.indice_emv_pip.geom)
GROUP BY sdis.indice_emv_hex_400m.geom;

ALTER TABLE sdis.indice_emv_hex_400m_acp_avg
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX indice_emv_hex_400m_acp_avg_geom_idx ON sdis.indice_emv_hex_400m_acp_avg  USING GIST (geom);

------------------------------------------------------------------
------------------------REFERENCE  800m---------------------------
------------------------------------------------------------------

create table sdis.indice_emv_hex_800m_acp_avg as select 
AVG(acp_scl)::real as acp_scl, 
AVG(acp_ecn)::real as acp_ecn, 
AVG(acp_nvr)::real as acp_nvr, 
AVG(acp_scr)::real as acp_scr, 
AVG(acp_prx)::real as acp_prx,
AVG(acp_csl)::real as acp_csl,
sdis.indice_emv_pip.adidu,
sdis.indice_emv_pip.arr_vll,
sdis.indice_emv_hex_800m.geom
FROM sdis.indice_emv_hex_800m
LEFT JOIN sdis.indice_emv_pip ON st_intersects(sdis.indice_emv_hex_800m.geom,sdis.indice_emv_pip.geom)
GROUP BY sdis.indice_emv_hex_800m.geom;

ALTER TABLE sdis.indice_emv_hex_800m_acp_avg
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX indice_emv_hex_800m_acp_avg_geom_idx ON sdis.indice_emv_hex_800m_acp_avg  USING GIST (geom);

------------------------------------------------------------------
------------------------REFERENCE 1000m---------------------------
------------------------------------------------------------------

create table sdis.indice_emv_hex_1000m_acp_avg as select 
AVG(acp_scl)::real as acp_scl, 
AVG(acp_ecn)::real as acp_ecn, 
AVG(acp_nvr)::real as acp_nvr, 
AVG(acp_scr)::real as acp_scr,
AVG(acp_prx)::real as acp_prx,
AVG(acp_csl)::real as acp_csl,
-- sdis.indice_emv_pip.adidu,
-- sdis.indice_emv_pip.arr_vll,
sdis.indice_emv_hex_1000m.geom
FROM sdis.indice_emv_hex_1000m
LEFT JOIN sdis.indice_emv_pip ON st_intersects(sdis.indice_emv_hex_1000m.geom,sdis.indice_emv_pip.geom)
GROUP BY sdis.indice_emv_hex_1000m.geom;

ALTER TABLE sdis.indice_emv_hex_1000m_acp_avg
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX indice_emv_hex_1000m_acp_avg_geom_idx ON sdis.indice_emv_hex_1000m_acp_avg  USING GIST (geom);