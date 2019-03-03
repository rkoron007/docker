# Persistent Data in Docker


I'll start by reiterating, Containers are Ephemeral and once a container is removed, it is gone. Poof, forever! A Container should never change, it should just be stopped and redeployed. There is a problem with that though: what about data we might need from a container? What if you need to share data across multiple containers? Or store a container's data on a remote host rather than locally?

In other words we want [**persistent data**][pd], data that will be generated and not tied to the container life cycle. Docker has two options for containers to store files in the host machine, so that the files are persisted even after the container stops: [volumes][volumes], and [bind mounts][bind-mounts]. 

Here is a brief summary of the two concepts with more detailed information below:
1. Bind Mounts - Can be stored anywhere on the container host and mounted on the running container. Can exist anywhere in the host filesystem.
2. Volumes - The Host filesystem stores volumes but they are complete managed by Docker in `C:\ProgramData\docker\volumes`

No matter which type of mount you choose to use, the data looks the same from within the container. 

![Mounts](https://assets.aaonline.io/Docker/types-of-mounts.png)

[bind-mounts]: https://docs.docker.com/storage/bind-mounts/
[volumes]: https://docs.docker.com/storage/volumes/
[pd]: https://docs.docker.com/storage/

## Volumes
Volumes are stored in a part of the host filesystem which is managed by Docker (`/var/lib/docker/volumes/` on Linux). Volumes are the best way to persist data in Docker. Non-Docker processes should not touch these files. 

You can create a volume explicitly using `docker volume create`, or Docker can create a volume for you when you add a the `-v` flag to the `docker container run` command. Which would look something like this:

```ssh
    docker run -v /path/in/container
```

When you create a volume, it is stored within a directory on the Docker host. When you mount a volume into a container, the directory can then be accessed by the container. This is similar to the way that bind mounts work, except that volumes are managed by Docker and are isolated from the host machine.

A volume can also be mounted into multiple containers simultaneously. When no running container is using a volume, the volume is still available to Docker. You can remove any unused volumes using `docker volume prune`.

Volumes also support the use of drivers, which allow you to store your data on remote hosts or cloud providers, among other exciting possibilities.


**Named Volume**: By default when you create a volume it will be identified by it's unique ID. You can however assign a name, making the the volume a "named volume".

#### Volume Summary
Running the `volume` command will bypass the Union File System and stores your data in an alternate location on your host. 
* The volume includes it's own management commands under `docker volume`
* Connect to none, one, or multiple containers at once
* Not subject to commit, save, or export commands
* By default they only have a unique ID, but you can assign name

## Bind Mounts
Bind mounts may be stored anywhere on the host system. When you use a bind mount, a file or directory on the host machine is mounted and mapped into a container. The file or directory is referenced by its full or relative path on the host machine.  Meaning that you'll basically have two different references pointing to the same file in memory. Your Non-Docker processes on the Docker host or a Docker container can modify a bind mounted file at any time. You can’t use Docker CLI commands to directly manage bind mounts.

To start a Docker container with a bind mount would look something like this:

```sh
docker run -d \
  --name devtest \
  --mount type=bind,source="$(pwd)"/target,target=/app \
  nginx:latest
```

Bind mounts perform well, but there are security reasons why they are not used as often as volumes. Processes within a container where a bind mount is located can change a host's filesystem directly. Meaning that a process within a docker container could create, modify, or delete important system files or directories on the host computer. As you can probably imagine that can lead to some serious security concerns. In general, you should use `volumes` where possible.

#### Bind Mount Summary
Bind Mounts can be stored anywhere on the container host and mounted on a running container:

* Basically just two paths (one in your container, and one on you host) will be pointing to the same file(s)
* Again, skips UFS, and host files overwrite any in the container
* Can't use a Bind Mount in a Dockerfile, must be mounted at container run


