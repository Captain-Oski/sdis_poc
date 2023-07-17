CREATE INDEX indice_h3_200m_geom_idx ON sdis.h3_200m  USING GIST (geom);
CREATE INDEX indice_h3_400m_geom_idx ON sdis.h3_400m  USING GIST (geom);
CREATE INDEX indice_h3_800m_geom_idx ON sdis.h3_800m  USING GIST (geom);