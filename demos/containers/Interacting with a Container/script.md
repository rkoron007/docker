## Intro to Containers:

First check the Docker Version:
`docker version`

Talk about how `docker run` and `docker container run` are the same command.

## Main Concepts:
1. An Image is the application we want to run 
2.  A Container is an instance of that image running as a process
3. You can have many containers running off the same image 

## Run a Server
Use `docker container run --publish 80:80 nginx`. Check out locahost. Then cancel the container
`docker container run --publish 80:80 --detach nginx`

## What happens in 'docker container run'
1. Looks for that image locally in image cache, doesn't find
anything
2. Then looks in remote image repository (defaults to Docker Hub)
3. Downloads the latest version (nginx:latest by default)
4. Creates new container based on that image and prepares to
start
5. Gives it a virtual IP on a private network inside docker engine
6. Opens up port 80 on host and forwards to port 80 in container
7. Starts container by using the CMD in the image Dockerfile

Use `docker container ls -a`

* Name a container
`docker container run --publish 80:80 --detach --name webhost nginx`

* Check the logs
`docker container logs webhost`

Check the stats:
`docker container stats`

Check the provesses:
`docker container top`

Use the help command: `docker container --help`.

Remove running containers `docker container rm`. Show the `docker container rm -f` to stop and remove a running container.


