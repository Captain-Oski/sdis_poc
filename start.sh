# sudo docker compose run --rm ogr ogr2ogr -f PostgreSQL -lco GEOMETRY_NAME=geom -lco FID=gid -lco SPATIAL_INDEX=GIST -nln sdis.indice_emv -nlt PROMOTE_TO_MULTI -t_srs EPSG:3857-overwrite PG:"dbname='sdis' host='172.18.0.2' port='5432' user='admin_geo' password='password'"  ./data/indice_emv.shp \
# &&
sudo docker compose run --rm ogr ogr2ogr -f PostgreSQL -nln sdis.indice_emv_data -overwrite -oo AUTODETECT_TYPE=YES PG:"dbname='sdis' host='172.24.0.4' port='5432' user='admin_geo' password='password'"  ./data/indice_emv_data.csv  \
&&
sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.24.0.4' port='5432' user='admin_geo' password='password'" -sql @./etl/0-adidu-join-data.sql
# \
# &&
# sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.2' port='5432' user='admin_geo' password='password'" -sql @./etl/1-createRandomPointsInPolygons.sql \
# &&
# sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.2' port='5432' user='admin_geo' password='password'" -sql @./etl/2-createGridAgainstPolygons.sql \
# &&
# sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.2' port='5432' user='admin_geo' password='password'" -sql @./etl/3-createResults.sql \
# &&
# sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.4' port='5432' user='admin_geo' password='password'" -sql @./etl/4-createViews.sql \
# &&
# sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.4' port='5432' user='admin_geo' password='password'" -sql @./etl/5-index.sql