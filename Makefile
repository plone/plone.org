### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

.PHONY: all
all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Migration Tools
BLOCKS_TOOL_IMAGE=plone/blocks-conversion-tool:0.3.1
BLOCKS_TOOL_NAME=blocks-conversion-tool
BLOCKS_TOOL_PORT=5000

.PHONY: conversion-tool
conversion-tool: ## Create conversion tool container
	docker ps -q -a -f name=$(BLOCKS_TOOL_NAME) || docker container create --name $(BLOCKS_TOOL_NAME) -p ${BLOCKS_TOOL_PORT}:5000 $(BLOCKS_TOOL_IMAGE)

.PHONY: start-conversion-tool
start-conversion-tool: conversion-tool ## Starts blocks conversion tool
	docker start $(BLOCKS_TOOL_NAME)

.PHONY: stop-conversion-tool
stop-conversion-tool: conversion-tool ## Stops blocks conversion tool
	docker stop $(BLOCKS_TOOL_NAME)

# Frontend
.PHONY: install-frontend
install-frontend:  ## Install React Frontend
	$(MAKE) -C "./frontend/" install

.PHONY: build-frontend
build-frontend:  ## Build React Frontend
	$(MAKE) -C "./frontend/" build

.PHONY: start-frontend
start-frontend:  ## Start React Frontend
	$(MAKE) -C "./frontend/" start

# Backend
.PHONY: build-backend
build-backend:  ## Create virtualenv and install Plone
	$(MAKE) -C "./backend/" prepare
	$(MAKE) -C "./backend/" install
	$(MAKE) -C "./backend/" instance

.PHONY: create-site
create-site:  build-backend ## Create a Plone site with default content
	$(MAKE) -C "./backend/" create-site

.PHONY: start-backend
start-backend: ## Start Plone Backend
	$(MAKE) -C "./backend/" run


# Frontend + Backend
.PHONY: install
install:  ## Install
	@echo "Install backend & Frontend"
	$(MAKE) build-backend
	$(MAKE) install-frontend

.PHONY: build
build:  ## Build
	@echo "Build"
	$(MAKE) build-backend
	$(MAKE) build-frontend

.PHONY: start
start:  ## Start
	@echo "Starting application"
	$(MAKE) start-backend
	$(MAKE) start-frontend

.PHONY: format
format:  ## Format codebase
	@echo "Build"
	$(MAKE) -C "./backend/" format
	$(MAKE) -C "./frontend/" format

# Docker

.PHONY: build-images
build-images:  ## Build docker images
	@echo "Build"
	$(MAKE) -C "./backend/" build-image
	$(MAKE) -C "./frontend/" build-image

.PHONY: run-docker-local
run-docker-local:  build-images ## Run local docker images
	@echo "$(GREEN)==> Start containers$(RESET)"
	@docker-compose -f dockerfiles/local.yml up -d
