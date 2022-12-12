# Plone.org Site Devops

## Setup

### Environment configuration
#### For Local Deployment (Using Vagrant)

```shell
source .env_local
```
#### For Production

Create `.env_prod`, if it does not exist, setting all values defined in `.env_local` (including values for `DEPLOY_HOST` and `DEPLOY_KEY`), then:

```shell
source .env_prod
```

Also, add a `prod.yml` file to the `inventory` folder (with information about the production server), and a `plone-prod.yml` to the `host_vars` folder.

### Install Ansible

Install Python 3 virtual environment and Ansible

```shell
cd devops
make clean
make setup
```

### Configure SSH key

Edit the `group_vars/users.yml` file and replace the line **public_keys: []** with

```yaml
    public_keys:
      - '<your ssh public key>'

```

## Docker configuration

As the images used in this deployment are public, just make sure you already are logged in with Docker.

## Deploy

The shortcut is to run all steps at once with:

```shell
make all
```

This command provisions a new machine, if running in the local environment, run the playbook and then deploy the stack.

### Provision

Only valid for local deployments using Vagrant. This creates a new Vagrant box with the configuration according to the `Vagrantfile` and runs the Ansible playbook.

```shell
make provision
```

This adds two domain (`beta.plone.org`, `traefik-beta.plone.org`) entries to your `/etc/hosts` file, pointing to the current provisioned box.

### Run playbook
Set up the server, by installing base packages, creating `UFW` configuration, adding users, and preparing docker.
This action happens on local deployments while running provision, for the production it is its own step.

```shell
make run-playbook
```

### Deploy stack to the server

Run `docker stack` to deploy to the server

```shell
make deploy
```
Use this also when there is a new version of any of the images.

After deployment the following pages are available:

- `traefik-beta.plone.org` (web server configuration view, protected)
- `beta.plone.org` (main site)
- `beta.plone.org/ClassicUI` (direkt access to Classic UI, protected)
- `beta.plone.org/zmi` (direkt access to ZMI, protected)

For local deployment entries of the domains were already created in `/etc/hosts`.
For production public DNS needs configuration.

Once deployed, there is no Plone site installed.
This can be done by accessing the ZMI or by executing `make create-site`.

## Check Stack Status

```shell
make status
```

## Check Logs

|Tool|Command|
|-|-|
|webserver|`make logs-webserver`|
|frontend|`make logs-frontend`|
|backend|`make logs-backend`|

