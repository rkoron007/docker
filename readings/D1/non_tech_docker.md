# Non Technical Overview of Docker

## What is Docker?

Docker is an open-source project designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one pretty package. Meaning it’s not about your app. It’s **not** about what is inside your app to a large extent. Its about packaging, shipping and delivering your app in a standard way.

Not long ago, containers as a technology were only available at tech giants such as Google, but nowadays containers are widely available and used at companies small and large. Major tech corporations down to small start ups use containers to simplify development, testing, deployment, and operation of their software. 

## Docker History
![Whale](https://i2.wp.com/blog.docker.com/wp-content/uploads/2013/06/Docker-logo-011.png?resize=300%2C232&ssl=1)

`This is it. Containers are the next once-in-a-decade shift in infrastructure and process that will make or break you` - Bret Fisher (A Docker Captain)

Docker was founded in 2010 by Solomon Hykes and at that time it was called dotCloud, Inc. DotCloud, Inc was originally built to run as a PaaS (Platform as a Service) type of business, similar to Heroku. Docker built partnerships with technology giants including Microsoft and Google and in Cluster HQ’s Container Market Adoption Survey 2016 94% of the respondents said that they use Docker. Based on previously available open source technologies Docker created a standard way to deploy Linux applications into containers which then can run in different environments. 

Everyone has seen the adorable whale logo, named Moby Dock, representing Docker - but Docker's official mascot is actually[Gordon the Turtle](https://twitter.com/gordontheturtle?lang=en). 

## Docker Community Edition vs. Enterprise Edition

To host containers in development environments and provide additional developer tools, Docker ships Docker Community Edition (CE) for Windows or for macOS. These products install the necessary Virtual Machine (the Docker host) to host the containers. Docker also makes available Docker Enterprise Edition (EE), which is designed for enterprise development and is used by IT teams who build, ship, and run large business-critical applications in production.


## Concepts

### Docker Containers
![docker-container](https://assets.aaonline.io/Docker/Container.png)

From the Docker website:
`A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.  A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.` 

To put it simply, a container is like a virtual machine but without a Kernel. A container can be compared to a process on your computer. A Container uses the Kernal of the Host operating system. Containers have their own allocated filesystem and IP. Libraries, binaries, services are installed inside a container, however, all the system calls and Kernel functionality comes from the underlying host OS. Containers are **super** lightweight. The Boot up and redeploying of containers happens in seconds, because they don’t need to start up the Kernel every time.

### Docker Linux Containers
Docker image containers can run natively on Linux and Windows. However, Windows images can run only on Windows hosts and Linux images can run on Linux hosts and Windows hosts (using a Hyper-V Linux VM, so far), where host means a server or a VM. Linux containers are still the default for most companies, and we will be using Linux container for this course. 


## Docker Engine (Build System)

![docker-engine](https://assets.aaonline.io/Docker/docker_engine.png)

Docker Engine is the technology that is often represented as the Docker we know- it’s the “brain of docker”. The Docker Engine is a lightweight and powerful open source containerization technology. The Docker engine is responsible for running processes in isolated environments. 
It consists of the core applications that run Containers and a [Restful HTTP API](https://docs.docker.com/engine/api/v1.24/) that allows an interface such as the Docker CLI/terminal tool to interact with the Engine.  The Docker CLI uses the Docker REST API to control or interact with the Docker [daemon][dockerd] through scripting or direct CLI commands. The [daemon][dockerd] creates and manages Docker objects, such as `images`, `containers`, `networks`, and `volumes`.

[dockerd]: https://docs.docker.com/engine/reference/commandline/dockerd/

## DockerHub
[Docker Hub][dh] is a docker image registry provided by Docker itself. It enables users to push images to their repository, make them public or private, and pull different images, all using the docker CLI.

[dh]: https://hub.docker.com/

## Dockerfile (Build System)
One of the basic building blocks of Docker is the definition on what this container and its image contain and the instructions to create the sharable environment that we want. This is represented in what we call a Dockerfile, which is a text file with a set of instructions that can be built to represent a Docker image.


## Docker Compose
Compose is a tool for defining and running multi-container Docker applications. It allows you to easily manage multiple containers dependent on each other within one docker host via the `docker-compose` CLI. You use a `YAML` file to configure all the containers. With one command you can start all containers in the correct order and properly set up networking between them. 

## Docker Machine
Docker Machine is a tool that lets you install a Docker Engine on virtual hosts, and manage the hosts with `docker-machine `commands. You can use Machine to create Docker hosts on your local Mac or Windows machine, on a company network, or on cloud providers like Azure, AWS, or Digital Ocean.

## Docker Swarm
Docker swarm is another orchestration tool aimed to manage a cluster of docker hosts. While docker-compose managers multiple Docker containers within one docker host, docker swarm manages multiple docker hosts managing multiple Docker containers.  Swarm mode is built in docker engine and is managed through the Docker client.