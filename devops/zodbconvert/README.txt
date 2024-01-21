Convert postgresql to filestorage
=================================

In test and production the plone.org website stores the content data in a
Postgresql database using the relstorage driver. If you want to create
a local filestorage copy of the data to use for local development, you
can use the zodbconvert utility.

First make sure you are running a local postgresql server with the Plone
content database. The zodbconvert config file assume you use the (datbase)
settings as configured in the docker-compose.yml in the project root. This
compose file starts a local postgresql container on 127.0.0.1:5432 with
ploneorg/ploneorg/ploneorg as the database/role/password . 

zodbconvert writes the data to the ./data directory in the project root,
inside ./data/filestorage and ./data/blobs .  

Now run zodbconvert from the project root: 

> ./backend/bin/zodbconvert ./devops/zodbconvert/relstorage.cfg

This can take 5-15 minutes, depending on your machine specs. 

