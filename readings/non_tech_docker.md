# Non Technical Overview of Docker

## What is Docker?

Docker is an open-source project designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out in one pretty package. Meaning, it’s **not** about what is inside your app to a large extent. It's about packaging, shipping and delivering your app in a standard way.

Not long ago, containers as a technology were only available at tech giants such as Google, but nowadays containers are widely available and used at companies small and large. Major tech corporations down to small start ups use containers to simplify development, testing, deployment, and operation of their software.

## Docker History

![Whale](https://i2.wp.com/blog.docker.com/wp-content/uploads/2013/06/Docker-logo-011.png?resize=300%2C232&ssl=1)

`This is it. Containers are the next once-in-a-decade shift in infrastructure and process that will make or break you` - Bret Fisher (A Docker Captain)

Docker was founded in 2010 by Solomon Hykes and at that time it was called dotCloud, Inc. DotCloud, Inc was originally built to run as a PaaS (Platform as a Service) type of business, similar to Heroku. Docker built partnerships with technology giants including Microsoft and Google. In Cluster HQ’s, Container Market Adoption Survey, 94% of the respondents said that they use Docker. Based on previously available open source technologies Docker created a standard way to deploy Linux applications into containers which then can run in different environments.

Everyone has seen the adorable whale logo, named Moby Dock, representing Docker - but Docker's official mascot is actually [Gordon the Turtle](https://twitter.com/gordontheturtle?lang=en).

## Docker Community Edition vs. Enterprise Edition

To host containers in development environments and provide additional developer tools, Docker ships Docker Community Edition (CE) for Windows or for macOS. These products install the necessary Virtual Machine (the Docker host) to host containers. Docker also makes available the Docker Enterprise Edition (EE), which is designed for enterprise development and is used by IT teams who build, ship, and run large business-critical applications in production.

## Concepts

### Docker Containers

![docker-container](https://assets.aaonline.io/Docker/Container.png)

From the Docker website:
`A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another. A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.`

A container can be compared to a process on your computer. A Container uses the Kernel of the Host operating system. Containers have their own allocated file system and IP. Libraries, binaries and services are installed inside a container, however, all the system calls and Kernel functionality comes from the underlying host OS. To put it simply, a container is kind of like a application for your phone with app-scoped resources. Containers are **super** lightweight. The boot up and redeploying of containers happens in seconds, because they don’t need to start up the Kernel every time.

### Docker Linux Containers

Docker image containers can run natively on Linux and Windows. However, Windows images can run only on Windows hosts and Linux images can run on Linux hosts and Windows hosts (using a Hyper-V Linux VM, so far), where host means a server or a VM. Linux containers are still the default for the majority of companies, and we will be using Linux container for this course.

## Docker Engine (Build System)

![docker-engine](https://assets.aaonline.io/Docker/docker_engine.png)

Docker Engine is the technology that is often represented as the Docker we know- it’s the “brain of docker”. The Docker Engine is a lightweight and powerful open source containerization technology. The Docker engine is responsible for running processes in isolated environments.
It consists of the core applications that run Containers and a [Restful HTTP API](https://docs.docker.com/engine/api/v1.24/) that allows an interface such as the Docker CLI/terminal tool to interact with the Engine. The Docker CLI uses the Docker REST API to control or interact with the Docker [daemon][dockerd] through scripting or direct CLI commands. The [daemon][dockerd] creates and manages Docker objects, such as `images`, `containers`, `networks`, and `volumes`.

[dockerd]: https://docs.docker.com/engine/reference/commandline/dockerd/

## Docker Hub

[Docker Hub][dh] is a docker image registry provided by Docker itself. It enables users to push images to their own repository, make them public or private, and push and pull different images, all using the docker CLI.

[dh]: https://hub.docker.com/

## Dockerfile (Build System)

As we've learned the building blocks of Docker are containers. Yet, every container is built upon an `image`. An `image` is a collection of dependencies that an app needs to run and `images` are built by a Dockerfile. A Dockerfile will install dependencies, create data stores, and ensure that the development environment is configured correctly. The Build System is used to convert a Dockerfile into an image.

## Docker Compose

Compose is a tool for defining and running multi-container Docker applications. It allows you to easily manage multiple containers dependent on each other within one docker host via the `docker-compose` CLI. You use a `YAML` file to configure all the containers needed and the interactions necessary between those containers. With one command you can start multiple containers in the correct order and properly set up networking between them.

## Docker Machine

Docker Machine is a tool that lets you install a Docker Engine on virtual hosts, and manage the hosts with `docker-machine`commands. You can use Machine to create Docker hosts on your local Mac or Windows machine, on a company network, or on cloud providers like Azure, AWS, or Digital Ocean.

## Docker Swarm

Docker Swarm is an orchestration tool used to manage a cluster of docker hosts. While `docker-compose` managers multiple Docker containers within one docker host, `docker swarm` manages multiple docker hosts managing multiple Docker containers. Swarm mode is built into the docker engine and is managed through the Docker client. Swarm is still relatively new and still lacks some fundamental features that would make it useful for orchestration in production. Instead, [Kubernetes][kuber] is currently one of the the most popular tools for orchestration in production.

[kuber]: https://kubernetes.io/
