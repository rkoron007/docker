## Docker Compose
Now that we have started publishing images to Docker Hub, let’s put them to good use. By this point you are probably tired of setting up individual Docker Containers and images. Imagine a world where you could boot up and tear down multiple containers with a single command. May I introduce you to the magic that is Docker-Compose. 

Docker-Compose is a Python-based tool which according to Docker is, 'a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.' With a single `YAML` file and a simple CLI you can use compose to set up all the networking, volumes, and containers you need to run an entire app. 


Docker Compose is excellent in running in automated testing and development environments. As a developer you'll be interacting with Docker Compose in order to speed up your development cycle. Docker Compose could also suitable for production...if you’re deploying to a single host. There is a reason Docker says, "Compose is great for development, testing, and staging environments". Docker Compose wasn't designed to be a production-grade tool. You can however use Compose with Docker Swarm if you are interested in using Compose in a production environment. We won't be covering Docker Swarm in this course but feel free to read up here if you are [interested][swarm].

If you installed Docker on either a Mac or Windows you should automatically have Docker Compose installed. If you are on a Linux machine check [here][dc-install] for installation instructions.

[dc-install]: https://github.com/docker/compose/releases
[swarm]: https://docs.docker.com/compose/swarm/

## Compose Features
The most important features of Docker Compose are:

1. Ability to Deploy Multiple Container Easily
2. Docker Compose automatically configures a single network for your app.
    - Each container for a service joins that network and is reachable by all the other containers on that network.
3. Preserve volume data when containers are created.
        -  When `docker-compose up` runs, if it finds any containers from previous runs, it copies the volumes from the old container to the new container it is creating. 
4. Only recreate containers that have changed.
        - Compose caches the configuration used to create a container. When you restart a service that and nothing has changed, Compose re-uses the existing containers.
5. Compose allows you to use [variables][compose-var] in the Compose file.

[compose-var]: https://docs.docker.com/compose/compose-file/#variable-substitution

## Docker Compose Composition:
When we say "Docker Compose" we are really referring to two things:

1. A YAML formatted file - describing what is needed in terms of containers, networks, and volumes. This file is usually named `docker-compose.yml`.
2. A CLI tool (`docker-compose`) which is primarily used for local development and testing which relies on the YAML file.

The first line of a `docker-compose.yml` file is the version of Compose you want to use. Docker Compose has gone through several iterations and there are a couple of available versions for your to use. We generally recommend using **at least** version 2 for your files. Though for certain features you many need to upgrade to a different your version. See a list of Docker Compose versions and features [here][c-version].

Using Compose is basically a three-step process:

1. Define your app’s environment with a Dockerfile so it can be reproduced anywhere.
1. Define the services that make up your app in docker-compose.yml so they can be run together in an isolated environment.
1. Run `docker-compose up` and Compose starts and runs your entire app.

Below is a breakdown of the general way your file should be formatted:

```yml
version: '3.1'  # If no version is specified then version 1.0 is assumed. Recommend version 2 at the minimum

services:  # Will start up containers. Is the same as using docker container run.
  servicename: # A Friendly name (postgres, node, etc.). This is also DNS name inside your network
    image:
    command: # Optional, will replace the default CMD specified by the image
    environment: # Optional, same as -e in docker run
    volumes: # Optional, same as -v in docker run
  psql: # servicename2

volumes: # Optional, same as docker volume create

networks: # Optional, same as docker network create
```

Check out [this][yaml] resource if you need reminder about YAML formatting.

### Services
When we are talking about Docker Compose `services` refers to running multiple containers. Docker needed another term to differentiate the running of multiple containers. 

[yaml]:https://yaml.org/refcard.html
[c-version]:https://docs.docker.com/compose/compose-file/compose-versioning/



