# Let's Get Started with Docker!

## Running your first containers

Now that you are taking your first steps towards becoming a Docker master we'll start with the always traditional "HelloWorld".

Before starting, ensure that Docker is installed correctly and is ready to accept your commands. Type the following command in a new Terminal window:

```
$ docker -v
```

If you get a version number and no error you are good to go! We'll start off by running a container based off the [`alpine`][alpine] image.  Alpine is a small distribution of Linux, that we'll be talking about more in the future but for now but we'll be using it for simple `echo` command.

Use the `docker container run` command, with the `alpine` image, and the command to `echo "Hello World"`.

When you run the above command for the first time, you should see an output in your Terminal window similar to this:

```ssh
Unable to find image 'alpine:latest' locally
 
latest: Pulling from library/alpine
 
2fdfe1cd78c2: Pull complete
 
Digest: sha256:ccba511b...
 
Status: Downloaded newer image for alpine:latest
 
Hello World
```

That was easy! Let's try it again run - `docker container run alpine echo "Hello World"`. You'll see this time there is nothing but "Hello World" returned this time. That's because the image for `alpine` has already downloaded. You can see it using the `docker image ls` command. 

```ssh
REPOSITORY                              TAG                 IMAGE ID            CREATED             SIZE
alpine                                  latest              caf27325b298        4 weeks ago         5.53MB
```

Now take a look at `docker container ls` and you shouldn't see you containers running. However if you look at `docker container ls -a` you'll see:

```ssh
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                         PORTS                NAMES
8924d558c494        alpine              "echo 'Hello World'"     3 minutes ago       Exited (0) 3 minutes ago              optimistic_chandrasekhar
```

The `exited` status means this container is no longer running. It's always a good idea to clean up containers you don't intend to use again. We can do that using `docker container rm <imageidORimagename>`. Once you've cleaned up that container make sure it's done by checking `docker container ls -a`.

### Running a Process Inside a Container
Nice! Let's try doing something a little more involved with our next container. This time we'll use another Linux distribution,  `centos`, because it has `ping` built into the image.

So you'll run a container based off the `centos` image, we'll have it ping 5 times, so after the centos image add the command you'd like it to run  `ping -c 5 127.0.0.1`. It should ping right before your eyes before stopping:

```ssh
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.168 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.110 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.110 ms
64 bytes from 127.0.0.1: icmp_seq=4 ttl=64 time=0.102 ms
64 bytes from 127.0.0.1: icmp_seq=5 ttl=64 time=0.102 ms

--- 127.0.0.1 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4130ms
rtt min/avg/max/mdev = 0.102/0.118/0.168/0.026 ms
```

Now make sure to clean up your container using `docker container rm` and make sure they are gone using `docker container ls -a`.

You've set up your first containers and ran them with a command. Congrats on booting up your first containers - you are on your way to becoming a part of the Docker community!

[alpine]: https://en.wikipedia.org/wiki/Alpine_Linux
[centos]: https://en.wikipedia.org/wiki/CentOS