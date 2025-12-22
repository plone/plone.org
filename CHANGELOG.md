## 1.0.21 (unreleased)


- Update to Relstorage 4.2.1
- Simplify and make mxdev config explicit
- Add collective.casestudy to mxdev, pin 1.0.0b1 for testing/production.
- Add zodbpack utility container.
- Add maintenance scripts. 
- Add docs to use local filestorage, add make install for backend.
- Deployment fixes for frontend, use newer linux base image for frontend.
- Fix several frontend jsx template issues and warnings.
- Updated Volto to 16.34.1
- Create a `funding.json` file. See https://github.com/plone/plone.org/issues/222. [stevepiercy]


## 1.0.20 (2025-06-25)

- Remove unused blocks: author, breadcrumbs, image_columns, linked_items, pagemetadata, text, text4. [davisagli]


## 1.0.19 (2025-04-20)

- Also add DB_PORT in live stack file.  [fredvd]
- Update stack config version. [fredvd]


## 1.0.18 (2025-04-19)

- Update Database connection live & redeploy GHA workflows. [fredvd]

- Update to Plone 6.0.15. [davisagli]

- Update Database connection CI parameters testing. [fredvd]


## 1.0.17 (2024-12-10)


- Add link to newsletter subscribe to footer. [Adityaadpandey]

- Pin cookiecutter-zope-instance version in backend/Makefile. [fredvd]

- Update instance(-filstorage).yaml to remove deprecated load_zcml. [fredvd]

- Test backend/requirements-docker.txt updating relstorage/psycopg2 versions. [fredvd]

- Update to Plone 6.0.10.1. Sync requirements-bootstrap.txt[fredvd]

- Add collective.revisionmanager 1.2.2. [fredvd]

- Add volto-fullcalendar-block [fredvd]

- Add recurrence index to catalog.xml [fredvd]


## 1.0.16 (2024-02-23)

- Rereleased to get a tagged version deployed on docker swarm


## 1.0.15 (2024-02-23)

- Use relstorage 4.0.0 and psycopg2 2.9.9. [fredvd]

- Use Volto 16.30.3. [frevd]]

- Fix copying contentdb from live to testing where the INTERNAL_RAZZLE_API_PATH is different so it doesn't detect internal url's correctly. [sneridagh]

- Fix for plone.org issues 73 and 110 [miropaananen]

- Use mxdev 3.1.0 and pip 23.3.2 by overriding them in mx.ini. [fredvd]

- List and pin backend bootstrap packages in backend/requirements-bootstrap.txt and install them in the 'bin/pip' Makefile target while passing in the full project constraints. [fredvd]

- Add zodbconvert example and instructions in devops/zodbconvert to create filestorage version of the content database from a locally running postgresql server. [fredvd]

- Add alternative filestorage based configuration profile for the backend with build-dev-fs (and config-fs) targets in backend/Makefile. [fredvd]

- Update docker-compose example with latest postgresql 14 and local bind mount for the postgesql data. [fredvd]

- Update to Volto 16.30.1. [fredvd]

- Update to Plone backend 6.0.9 [fredvd]

- Update to Volto 16.25.0 [davisagli]


## 1.0.13 (2023-10-09)

---

- Add randomnmess to sponsors block variaion listing [pbauer]

  1.0.12.dev0 (2023-09-18)

---

- Update GHA workflow actions to latest versions [fredvd]

- Update to Volto 16.24.0 [fredvd]

- Update to Plone backend 6.0.6 [fredvd]

- Update to Plone 6.0.3 [fredvd]

- Update to Volto 16.19.0 [fredvd]

- Add github_username and portrait fields to user schema (Closed #125)

  1.0.3 (2023-03-23)

---

- Update footer links (Closed #39) [fredvd]

  1.0.2 (2023-03-21)

---

- Fix workflow for tag deploy [fredvd]

  1.0.1 (2023-03-21)

---

- Test first tag live deployment. [fredvd]

- Update to Plone 6.0.2 [fredvd]

  1.0 (2022-10-140

---

- Initial version [plone]
