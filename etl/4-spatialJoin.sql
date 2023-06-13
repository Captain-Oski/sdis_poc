ALTER TABLE sdis.indice_emv_hex_1000m_acp_avg ADD column arr_vll text;

UPDATE sdis.indice_emv_hex_1000m_acp_avg SET arr_vll =
  iep.arr_vll 
FROM sdis.indice_emv_hex_1000m_acp_avg a 
JOIN sdis.indice_emv_pip iep
ON st_intersects(a.geom,iep.geom)


