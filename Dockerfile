# WORK IN PROGRESS

# Need to find the good image to run with
FROM postgis:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR \
    postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR-scripts \
    && rm -rf /var/lib/apt/lists/* \
# Attempt to install h3 through pgnx 
# Failing for now
# TODO : try a specific image of postgres+postgis to install pip, cmake 3.20++ and pgnx
    # apt install install pip -y &&  \
    # install cmake -y &&  \
    # install pgxnclient &&  \
    # pgnx install h3 &&  \
    # pgnx load h3
RUN mkdir -p /docker-entrypoint-initdb.d

COPY ./initdb-postgis.sh /docker-entrypoint-initdb.d/postgis.sh
RUN chmod +x /docker-entrypoint-initdb.d/postgis.sh