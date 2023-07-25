ALTER TABLE sdis.indice_emv_hex_200m_result
ADD COLUMN arr_ville TEXT;

UPDATE sdis.indice_emv_hex_200m_result
SET arr_ville = 
    CASE 
        WHEN RANDOM() < 0.25 THEN 'Anjou'
        WHEN RANDOM() >= 0.25 AND RANDOM() < 0.5 THEN 'Lachine'
        WHEN RANDOM() >= 0.5 AND RANDOM() < 0.75 THEN 'LaSalle'
        ELSE 'Ville-Marie'
    END;