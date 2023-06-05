# Poc SDIS - Dissemination Area analysis to point density to H3

## Lancer la stack complete
`sudo docker compose up -d`

## Charger les donnees

! Attention il faut mettre votre propre host 172.0.XX.XX !

`sudo docker compose run --rm ogr ogr2ogr -f PostgreSQL -lco GEOMETRY_NAME=geom -lco FID=gid -lco SPATIAL_INDEX=GIST -nln sdis.indice_emv -nlt PROMOTE_TO_MULTI -t_srs EPSG:3857-overwrite PG:"dbname='sdis' host='172.18.0.4' port='5432' user='admin_geo' password='password'"  ./data/indice_emv.shp`

`sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.4' port='5432' user='admin_geo' password='password'" -sql @./data/1createRandomPointsInPolygons.sql`

`sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.4' port='5432' user='admin_geo' password='password'" -sql @./data/2createGridAgainstPolygons.sql`

`sudo docker compose run --rm ogr ogrinfo PG:"dbname='sdis' host='172.18.0.4' port='5432' user='admin_geo' password='password'" -sql @./data/3createResults.sql`
