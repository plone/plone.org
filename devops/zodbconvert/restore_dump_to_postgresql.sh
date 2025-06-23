#!/bin/bash
docker exec -i zodbconvert-db-1 pg_restore -U zodbconvert -d zodbconvert --clean --no-owner -v < $1
