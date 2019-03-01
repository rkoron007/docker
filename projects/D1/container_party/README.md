
## Learning Goals
- Know How to Create, Stop, and Remove Containers
- Know How to Create Networks
- Know how to Create Containers with Network and Environment Variables
- Knowledge of how to Pull Down and Utilize Different Images in your Containers
- Know how to Create Custom Images
- Building a Dockerfile in Order to Create an Image

## Phase 0: The Shell Within

Looking at a container from the outside can be interesting but by now you must be wondering if its possible to see what is happening ***inside*** a container? This is totally possible using the `Docker CLI`(Command Line Interface).  

To enter a container you'll write something like the following:

```bash
docker container run -it <IMAGENAME> <ARG>
```

The `-it`  is actually two separate flags you are adding to docker:
* `-t` - simulates a terminal (like what SSH does`)
* `-i` - keeps a session open to receive terminal input
* the `<ARG>` part of the command is where we can pass an argument for what we'd like this container to do

The `nginx` image comes with `bash` as part of the image. Meaning that if you start a container using `nginx` as the image and hand it the argument of `bash` like this:

`docker container run -it --name web nginx bash` 

Bam, you are inside a container! 🙌  You'll see something like this prompt:

```
root@da9a8ab14300:/# 
```
This doesn't mean you are the root of your OS, but rather at the root of the container. You'll see that you can `ls` and do many of the things you could do with a shell normally like update configuration files or download package from the internet.  To exit this container you can use the `exit` command. This will stop your container because your **containers will only run as long as the command that it ran on startup runs**. To get around this you can use the `docker container exec` command to start a container that will persist past when the first command has run. 

Meaning that you can restart the container: `docker container start web` and then run: `docker container exec -it web bash` which will allow you to exit the container's `bash` command while keeping the container running. 

Now let's try using a shell to interact with a container. Create a new container named `ubuntu` using `ubuntu` as the image, and this time let's try installing something. Once you have created your container and are in the `bash` shell:

1. update the built-in package manager for ubuntu using the command `apt-get update`
2. then download the package `curl` by running: `apt-get install -y curl`
3. Make sure `curl` works by testing the following: `curl parrot.live`
4. Exit the shell and make sure it is no longer running by using the command `docker container ls`

Now at this point if you started up that container you were just interacting with it would still have `curl` installed. But what would happen if you started another container using the `ubuntu` image?

Try running:
`docker container run -it --name notliketheother ubuntu bash`

What happens if you try to `curl` something from this container? This `notliketheother` container doesn't have `curl` installed! So though the two containers running the same image you can alter the image in one container without effecting the other. 


💡**Aside**: Using the Ubuntu image vs. the Whole Ubuntu OS? If you have Linux experience, or are currently running Docker through a Linux distribution you might be asking what happens when you run a Ubuntu container? How is it different from the Ubuntu OS already running on your computer? You'll notice that the "distribution based images" like Ubuntu, Debian, CentOS, Alpine, etc. are all **very** small, at most a few hundred MB. These images are not full OS's but just the base utilities that you would expect if you were running that full OS. Mostly they are just used as the image to be used when building `FROM` a Dockerfile. These images are used commonly so that you can use the built in package managers (`apt` or `yum`) and get the same package versions you'd expect if using the full OS.


## Phase 1: Networks

## Assignment: DNS Round Robin Test
Let's try utilizing Docker containers and networks to create a small [Round-robin DNS][rr-dns]. Meaning that we want to have multiple containers on one network that can all respond to the same DNS address. Start off by creating a new virtual network. Before creating the next two containers you'll want to research the [`--net-alias`][alias] flag to make sure both containers will respond to the same alias.

Now create two containers on that new network with the `elasticsearch:2` image and your `--net-alias`. Once done create another container with the same network and the  `alpine nslookup` image and finally ending with the name of your network alias. Finally run one more container- and this one will ve simple so we can `curl` the port that both of the `elasricsearch` containers have.  Run this net network on the same network and the image `centos curl -s <ALIASNAME>:9200`. Run this last container a couple of times and you will see JSON being returned from each `elasticsearch` container. Each `elasticsearch` container will have a randomly generated "name" so as you `curl` one then the other you will see the "name" change.

Good job you made a small load balancer!


[rr-dns]: https://en.wikipedia.org/wiki/Round-robin_DNS
[alias]: https://docs.docker.com/v17.12/edge/engine/reference/commandline/run/

## Phase 2: Persistent Data in Docker


### Part A: Volumes


### Part B: Bind Mounts



## Phase 3: Voting App



## Phase 4: Creating Images

## Creating a Dockerfile

As you start developing with Docker you'll find that that most of the time basic docker images won't satisfy your custom or complex image needs. That's where a Dockerfile becomes essential. A Dockerfile is a text file that defines a Docker image. You’ll use a Dockerfile to create your own custom Docker image, in other words to define your custom environment to be used in a Docker container. Being able to create and customize a Dockerfile is an absolutely essential part of working with Docker.



## Create Multiple Docker files getting progressively harder. 