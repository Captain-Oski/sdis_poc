DROP TABLE IF EXISTS sdis.sdis_results;

CREATE TABLE sdis.sdis_results AS ( 
SELECT 
    id,
    nom,
    pop2021,
    acp_sociale,
    acp_econo,
    acp_enviro,
    acp_securite,
    acp_proximite,
    acp_cultsportloisir,
    acp_sociale + acp_econo + acp_enviro + acp_securite + acp_proximite + acp_cultsportloisir AS indice_emv,
    geom
FROM (
    SELECT 
        id,
        nom,
        pop2021,
        CASE WHEN NTILE(5) OVER (ORDER BY acp_sociale) IN (4, 5) THEN 1 ELSE 0 END AS acp_sociale,
        CASE WHEN NTILE(5) OVER (ORDER BY acp_econo) IN (4, 5) THEN 1 ELSE 0 END AS acp_econo,
        CASE WHEN NTILE(5) OVER (ORDER BY acp_enviro) IN (4, 5) THEN 1 ELSE 0 END AS acp_enviro,
        CASE WHEN NTILE(5) OVER (ORDER BY acp_securite) IN (4, 5) THEN 1 ELSE 0 END AS acp_securite,
        CASE WHEN NTILE(5) OVER (ORDER BY acp_proximite) IN (4, 5) THEN 1 ELSE 0 END AS acp_proximite,
        CASE WHEN NTILE(5) OVER (ORDER BY acp_cultsportloisir) IN (4, 5) THEN 1 ELSE 0 END AS acp_cultsportloisir,
        geom
    FROM sdis.indice_emv_hex_200m_result
) AS subquery
);

ALTER TABLE sdis.sdis_results
  ALTER COLUMN geom TYPE geometry(POLYGON, 3857)
    USING ST_SetSRID(geom,3857);
    
CREATE INDEX sdis_results_geom_idx ON sdis.sdis_results  USING GIST (geom);