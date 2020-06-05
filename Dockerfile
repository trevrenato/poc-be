# Dockerfile
FROM postgres:12

RUN mkdir -p /tmp/psql_data/
COPY database/* /tmp/psql_data/
COPY scripts/init_docker_postgres.sh /docker-entrypoint-initdb.d/