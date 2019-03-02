# Persistent Data in Docker


I'll start by reiterating, Containers are Ephemeral and once a container is removed, it is gone. Poof, forever! A Container should never change, it should just be stopped and redeployed. There is a problem with that though: what about data we might need from a container? Like what if you need to share data across multiple containers? Or store a container's data on a remote host rather than locally?

In other words we want **persistent data**, data that will be generated and not tied to the container life cycle. Docker has two options for containers to store files in the host machine, so that the files are persisted even after the container stops: volumes, and bind mounts. 



## Volumes

To utilize a volume you add a the `-v` flag to the `docker container run` flag. Which would look something like this:
```ssh
    docker run -v /path/in/container
```

Running the volume command will bypass the Union File System and stores your data in an alternate location on your host. 
• Includes it's own management commands under docker volume
• Connect to none, one, or multiple containers at once
• Not subject to commit, save, or export commands
• By default they only have a unique ID, but you can assign name
• Then it's a "named volume"

#### Named Volume
By default when you create a volume it will be identified by it's unique ID. You can however assign a name, making the the volume a "named volume".
