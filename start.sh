sudo docker compose run --rm ogr ogr2ogr -f PostgreSQL -lco GEOMETRY_NAME=geom -lco FID=gid -lco SPATIAL_INDEX=GIST -nln sdis.da_geom -nlt PROMOTE_TO_MULTI -t_srs EPSG:3857 -overwrite PG:"dbname='sdis' host='172.18.0.3' port='5432' user='admin_geo' password='password'"  ./data/indice_emv.shp \
&&
sudo docker compose run --rm ogr ogr2ogr -f PostgreSQL -lco GEOMETRY_NAME=geom -lco FID=gid -lco SPATIAL_INDEX=GIST -nln sdis.da_data -overwrite -oo AUTODETECT_TYPE=YES PG:"dbname='sdis' host='172.18.0.3' port='5432' user='admin_geo' password='password'"  ./data/Indice-equite-milieux-vie_20230731.csv  \
&&
sudo docker compose run --rm ogr ogr2ogr -f PostgreSQL -lco GEOMETRY_NAME=geom -lco FID=gid -lco SPATIAL_INDEX=GIST -nln sdis.ilots -nlt PROMOTE_TO_MULTI -t_srs EPSG:3857 -overwrite PG:"dbname='sdis' host='172.18.0.3' port='5432' user='admin_geo' password='password'"  ./data/Pop_Log_IlotAgglo_2021.shp \
&&
sudo docker compose run --rm ogr ogr2ogr -s_srs EPSG:4326 -t_srs EPSG:3857 -f PostgreSQL -lco GEOMETRY_NAME=geom -lco FID=gid -lco SPATIAL_INDEX=GIST -nln sdis.arrondissements -overwrite PG:"dbname='sdis' host='172.18.0.3' port='5432' user='admin_geo' password='password'"  ./data/arrondissements.geojson  \
&&
sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.3' port='5432' user='admin_geo' password='password'" -sql @./etl/1-createGridAgainstPolygons.sql \
&&
sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.3' port='5432' user='admin_geo' password='password'" -sql @./etl/2-createIlotsResults.sql \
&&
sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.3' port='5432' user='admin_geo' password='password'" -sql @./etl/3-joinDataToGrid.sql \
&&
sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.3' port='5432' user='admin_geo' password='password'" -sql @./etl/4-createResults.sql \
&&
sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.3' port='5432' user='admin_geo' password='password'" -sql @./etl/5-shpJoinCsvData.sql