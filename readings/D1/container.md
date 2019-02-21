# Containers


## Overview
The smallest definition of a container is that it is an instance of an image running as a process on your machine. 

## Images vs. Containers
An image is the application we want to run. Example of familiar applications we'd want to run in a container are [Node][node], [Ruby][ruby] or [Postgres][postgres-docker]. We'll be talking a lot more about images later but if you'd like to peruse some for now feel free to visit the image hosting "registry" [DockerHub][dockerhub]. 

[postgres-docker]: https://hub.docker.com/_/postgres
[ruby]: https://hub.docker.com/_/ruby
[node]: https://hub.docker.com/_/node
[dockerhub]: https://hub.docker.com/

## Running a Container

```ssh
docker container run -d --port 8080:80 --name web nginx
```

Let's break this command down into it's separate parts. 
1. `docker container run` - is the command telling docker you want to start up a new container using the following options.
1. `-d` - this flag means starting up the container in `detached` mode. Containers started in detached mode exit when the root process used to run the container exits.
1. `--port 8080:80` - this is letting docker know that you want expose a port on your local machine and that any traffic on that port should route to the container IP. 
  - The internal host IP is on the left: `8080`  
  - The ip for the container is on the right: `80`
  - With this configuration you can go to `http://localhost:8080` and see your container running!
1. `--name web` - the name flag allows you to directly name a container
1. `nginx` - the final part of this command is the image we want to use for running this container. The [Nginx][nginx] image is a very popular open source high-performance HTTP server.  


[nginx]: https://hub.docker.com/_/nginx

## What Happens When you Start a Container
When a Docker container starts up several things happen. Using our last example from above we are going to break down each of those processes.

```ssh
docker container run -d --port 8080:80 --name web nginx
```

The container start up does the following: 
1. Docker looks for the image locally (in this case `nginx`) in your image cache
2. If it's not found locally then Docker looks into the remote image repository (which defaults to Docker Hub)
3. Docker then downloads the latest version of the image (`nginx:latest` by default)
4. A new container is created based on that image and prepares to
start
5. Docker gives the container the  virtual IP on a private network inside of the Docker Engine
6. Docker opens up port 8080 on localhost and forwards to port 80 in the container
7. Starts the container by using the CMD in the image's Dockerfile

## Additional Resources:
- [Docker Quick Start](https://medium.freecodecamp.org/docker-quick-start-video-tutorials-1dfc575522a0)