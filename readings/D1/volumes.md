## Docker Volumes

I'll start by reiterating, Containers are Ephemeral and once a container is removed, it is gone. Poof, forever!
Let's talk about one of the solutions for how to persist data after a container has been removed. A **Docker Volume** is a way we can manage data in a container. 


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