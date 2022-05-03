# plone.org

## Quick start

### Requirements

- Python 3.8
- Node 16 / yarn
- Docker

### Install

```shell
git clone git@github.com:plone/plone.org.git
cd plone.org
make install
make create-site
```

### Start

Start the Backend (http://localhost:8080/)

```shell
make start-backend
```

Start the Frontend (http://localhost:3000/)

```shell
make start-frontend
```

## Build docker images and run it locally

```shell
make run-docker-local
```

## Structure

This monorepo is composed by two distinct codebases: backend and frontend.

- **backend**: Backend (API) Plone installation using pip (not buildout). Includes a policy package named ploneorg.core
- **frontend**: React (Volto) package named ploneorg
