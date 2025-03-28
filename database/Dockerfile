# For LOCAL development, not for render

FROM postgres:17-alpine

# Copy initialization scripts
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432