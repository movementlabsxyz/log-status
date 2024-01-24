FROM postgres:latest
COPY init-db.sql /docker-entrypoint-initdb.d/init-db.sql
CMD ["psql", "-f", "/docker-entrypoint-initdb.d/init-db.sql"]
