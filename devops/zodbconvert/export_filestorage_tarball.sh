#!/bin/bash
# import pgdump file:
# docker exec -i zodbconvert-db-1 pg_restore -U zodbconvert -d zodbconvert --clean --no-owner -v < $1

rm -rf ./data/filestorage ./data-blobstorage
mkdir -p ./data/filestorage ./data/blobstorage
./bin/zodbconvert ./from-relstorage.cfg
cd data
tar cfz ploneorg_devdata.tar.gz  filestorage blobstorage
mv ploneorg_devdatatar.gz ..
cd ..
