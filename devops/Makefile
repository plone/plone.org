### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-xeu -o pipefail -O inherit_errexit -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

ifndef DEPLOY_ENV
$(error DEPLOY_ENV is not set)
endif

ifndef DEPLOY_USER
$(error DEPLOY_USER is not set)
endif

ifndef DEPLOY_SCALES
	DEPLOY_SCALES=2
endif

ifeq ($(DEPLOY_ENV), local)
	HOST=`python key_from_inventory.py ansible_host`
	PRIVATE_KEY_FILE=`python key_from_inventory.py ansible_ssh_private_key_file`
	CONTEXT=ploneorg_local
	CONTEXT_HOST=ssh://$(DEPLOY_USER)@$(HOST):$(DEPLOY_PORT)

else ifeq ($(DEPLOY_ENV), prod)
	HOST=$(DEPLOY_HOST)
	PRIVATE_KEY_FILE=$(DEPLOY_KEY)
	CONTEXT=ploneorg_prod
	CONTEXT_HOST=ssh://$(DEPLOY_USER)@$(HOST):$(DEPLOY_PORT)
else
$(error DEPLOY_ENV is not supported)
endif

DOCKER=docker
DOCKER_CONTEXT=${DOCKER} --context ${CONTEXT}
DOMAINS=beta.plone.org traefik-beta.plone.org

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: clean
clean: ## remove all build, test, coverage and Python artifacts
	rm -Rf bin lib lib64 include pyvenv.cfg .docker

bin/pip:
	@echo "$(GREEN)==> Setup Virtual Env$(RESET)"
	python3 -m venv .
	bin/pip install -U pip

bin/ansible: bin/pip
	@echo "$(GREEN)==> Setup Ansible $(RESET)"
	bin/pip install -r requirements/python.txt --upgrade
	bin/ansible-galaxy install -r requirements/ansible.yml --force

.PHONY: setup
setup: bin/ansible ## Create VirtualEnv and install Ansible via Pip

.PHONY: docker-login
docker-login: .docker/config.json  ## Login with Docker
	@echo "$(GREEN)==> Docker login $(RESET)"
	${DOCKER} login

.PHONY: docker-setup
docker-setup: .docker ## Setup docker context
	if `docker context ls --format '{{.Name}}'|grep -wq ${CONTEXT}`
	then
		rm -r .docker;
	fi
	${DOCKER} context create ${CONTEXT} --description "Plone.org Site deployment" --docker "host=${CONTEXT_HOST}"

.PHONY: destroy
destroy: ## Destroy Vagrant box
ifeq ($(DEPLOY_ENV), local)
	@echo "$(GREEN)==> Destroy Vagrant box $(RESET)"
	vagrant destroy;
	ssh-keygen -f ~/.ssh/known_hosts -R "[$(HOST)]:$(DEPLOY_PORT)";
	sudo sed -i "s/.*${DOMAINS}.*//" /etc/hosts;
else
	@echo "$(GREEN)==> No destroy for ${DEPLOY_ENV} available $(RESET)";
endif

.PHONY: provision
provision: bin/ansible ## Provision Vagrant box
ifeq ($(DEPLOY_ENV), local)
	@echo "$(GREEN)==> Provision Vagrant box $(RESET)"; \
	vagrant up;
	ssh-keyscan -p $(DEPLOY_PORT) -H $(HOST) >> ~/.ssh/known_hosts;
	HOST=`python key_from_inventory.py ansible_host`;
	if grep -FxQ "${DOMAINS}" /etc/hosts
	then
		sudo sed -i "s/.*${DOMAINS}$/${HOST} ${DOMAINS}/g" /etc/hosts;
	else
		echo "${HOST} ${DOMAINS}" | sudo tee -a /etc/hosts;
	fi
else
	echo "$(GREEN)==> No provisioning for ${DEPLOY_ENV} available $(RESET)";
endif

.PHONY: run-playbook
run-playbook: bin/ansible ## Run playbook
	@echo "$(GREEN)==> Apply playbook in $(DEPLOY_ENV) $(RESET)"
ifeq ($(DEPLOY_ENV), local)
	./bin/ansible-playbook -i .vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory playbook-setup.yml
else
	./bin/ansible-playbook playbook-setup.yml --limit ${CONTEXT}
endif

.PHONY: deploy
deploy: docker-setup stacks/beta.plone.org.yml ## Deploy stacks: Plone
	@echo "$(GREEN)==> Deploy Stack in $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CONTEXT} stack deploy -c stacks/beta.plone.org.yml plone

.PHONY: create-site
create-site: docker-setup ## Create Plone Site
	@echo "$(GREEN)==> Create Plone Site in backend for $(DEPLOY_ENV) $(RESET)";
	${DOCKER_CONTEXT} exec `${DOCKER_CONTEXT} ps -f 'name=plone_backend.1' -q --no-trunc` /app/docker-entrypoint.sh create-site;

.PHONY: status
status: docker-setup ## Check status of stack
	@echo "$(GREEN)==> Stack status in $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CONTEXT} stack ps -f "desired-state=running" plone

.PHONY: logs-webserver
logs-webserver: ## Display webserver logs
	@echo "$(GREEN)==> Logs for webserver in $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CONTEXT} service logs plone_traefik

.PHONY: logs-varnish
logs-varnish: ## Display varnish logs
	@echo "$(GREEN)==> Logs for varnish in $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CONTEXT} service logs plone_varnish

.PHONY: logs-frontend
logs-frontend: ## Display frontend logs
	@echo "$(GREEN)==> Logs for frontend in $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CONTEXT} service logs plone_frontend

.PHONY: logs-backend
logs-backend: ## Display backend logs
	@echo "$(GREEN)==> Logs for backend in $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CONTEXT} service logs plone_backend

.PHONY: scale-services
scale-services: ## Scale services
	@echo "$(GREEN)==> Scaling Frontend and Backend to $(DEPLOY_SCALES) in $(DEPLOY_ENV) $(RESET)"
	${DOCKER_CONTEXT} service scale plone_frontend=$(DEPLOY_SCALES) plone_backend=$(DEPLOY_SCALES)

.PHONY: all
all: ## Create new box, run ansible, deploy stack
ifeq ($(DEPLOY_ENV), local)
	$(MAKE) provision
else
	$(MAKE) run-playbook
endif
	$(MAKE) deploy
