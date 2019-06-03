# Container Fun: The Ins and Outs of Containers!

## Learning Goals

- Know How to Create, Stop, and Remove Containers
- Know How to Create Docker Networks
- Know how to Persist Data in Docker with Volumes and Bind Mounts
- Know how to Create Containers with Network and Environment Variables
- Knowledge of how to Pull Down and Utilize Different Images in your Container

## Overview

For the project today we are going to be getting really comfortable with running multiple containers at once and utilizing all the different variables that containers allow us access to. In the next few days you'll be using a lot of new services you haven't worked with before. We want to to make you get accustomed with one of Docker's main advantages: the ability to use all kinds of different services with minimal setup. If you are curious about any particular image you encounter in the next few days we recommend checking out the image's [`DockerHub`][dockerhub] page. Now, let's get started!

[dockerhub]: https://hub.docker.com/

## Phase 0: Let's Run Some Containers

For the first phase of this project we are just going to get comfortable running and monitoring multiple containers at once. For this project you'll be writing **long** container commands. We recommend have a text file open for formulating your container commands before you input them into the terminal.

We'll start by creating three containers. For each of the following containers make sure you are running them detached using [`--detach`][detach] or `-d` and naming each of them with `--name`. Name each container with the image it is running (it's easier to keep track that way). **Remember:** containers cannot listen on the same local ports!

1. **Run one container with the `nginx` image**
    - The `Nginx` image provides an open source and easy to use proxy server.
   - Have this container listening on `80:80`
2. **Run one container with the `httpd (apache)` image**
    - The `httpd` is an image that provides a popular HTTP server.
   - This image has an exposed port available within the image, and you can find it yourself in the image's Dockerfile
     - Start by looking at the [httpd][httpd] image on Docker Hub. There you will find and click a link to the Dockerfile for the latest supported version of this image (which will be tagged `latest`)
     - Once you've followed the link you will be viewing the Dockerfile, but what you are specifically looking in this file is the command [`EXPOSE`][expose]. This is where you will find the port that `httpd` is listening for internally.
     - Once you've found the port `httpd` exposes internally set up your container to run using the `-p` flag with a localhost port on the left and the exposed `httpd` internal port on the right.
3. Run one container with the `mysql` image.
   - Have this container publishing the ports for `3306:3306`
   * One of the common environmental flag arguments passed to images of databases is the flag to set a password.
     - For this exercise you'll use the `--environment` or `-e` flag and pass in the password you'd like `mysql` to use when it sets itself up `MYSQL_ROOT_PASSWORD=<your-password>`.

You can inspect your new mysql container to make sure your password was configured properly by using `docker container inspect mysql` and seeing the password you set under the "Env" key.

The `nginx` and `httpd` images are built so that if you travel to the port you exposed on your local machine you'll be able to see a response.
Check that your `nginx` container is running properly by doing either of the following:

1. Running the [`curl`][curl] command by using the command: `curl localhost:80` in your terminal
2. using your browser to navigate to `http://localhost:80`

Do the same for `httpd` on whatever local port you chose to expose. You should see a message from both of those ports and therefore you'll know your containers are running!

When you run `docker container ls -a` you should see something like this:

```ssh
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                               NAMES
0edb7e43d044        mysql               "docker-entrypoint.s…"   5 seconds ago        Up 4 seconds        0.0.0.0:3306->3306/tcp, 33060/tcp   mysql
d558d946c6a0        httpd               "httpd-foreground"       About a minute ago   Up About a minute   0.0.0.0:8080->80/tcp                httpd
4b76779e1da6        nginx               "nginx -g 'daemon of…"   About a minute ago   Up About a minute   0.0.0.0:80->80/tcp                  nginx
```

### Time to Clean Up

Nice job! Now let's clean all those containers up with `docker container stop` and `docker container rm` (both can accept multiple container names or container `ID`'s)
Use `docker container ls -a` to ensure all your containers have been stopped and removed.

Amazing! Now let's see a little more of what containers can do!

[httpd]: https://hub.docker.com/_/httpd
[expose]: https://we-are.bookmyshow.com/understanding-expose-in-dockerfile-266938b6a33d
[curl]: https://curl.haxx.se/

## Phase 1: The Shell Within

Looking at a container from the outside can be interesting but by now you must be wondering if its possible to see what is happening **_inside_** a container? This is totally possible using the `Docker CLI`(Command Line Interface).

To enter a container you'll write something like the following:

```bash
docker container run -it <IMAGENAME> <ARG>
```

The `-it` is actually two separate flags you are adding to the `docker container run` command:

- `-t` - simulates a terminal (like what SSH does)
- `-i` - keeps a session open to receive terminal input
- the `<ARG>` part of the command is where we can pass an argument for what we'd like this container to do

### Phase A: Interacting with the Shell

The `nginx` image comes with `bash` as part of the image. Meaning that if you start a container using `nginx` as the image and hand it the argument of `bash` to a shell inside the container. Run the following command in your terminal to enter the container:

`docker container run -it --name web nginx bash`

Bam, you are inside a container! 🙌 You'll see something like this prompt:

```
root@da9a8ab14300:/#
```

This doesn't mean you are the root of your OS, but rather at the root of the container. You'll see that you can `ls` and do many of the things you could do within a shell normally like update configuration files or download packages from the internet.

To exit this shell (and container) you can use the `exit` command. This will stop your container because your **containers will only run as long as the command that it ran on startup runs**. To get around this you can use the `docker container exec` command to start a container that will persist past when the startup command has finished.

You can see your stopped container still exists by running `docker container ls -a`.

You can restart the container: `docker container start web`, which will restart your container in the background, and then run: `docker container exec -it web bash`. Okay you are back in bash now, try to `exit` again. Now check our the running containers by using `docker container ls` and you'll see your `web` container still running! The `exec` command is what allowed you to exit the container's `bash` command while keeping the container running.

### Phase B: Who-buntu? U-buntu!

Now let's try using a shell to interact with a container. Create a new container named `ubuntu` using `ubuntu` as the image, and this time let's try installing something. Once you have created your container and are in the `bash` shell:

1. update the built-in package manager for ubuntu using the command `apt-get update`
2. then download the package `curl` by running: `apt-get install -y curl`
3. Make sure `curl` works by testing the following: `curl parrot.live`
4. Exit the shell and make sure it is no longer running by using the command `docker container ls`

Now at this point if you started up that container you were just interacting with it would still have `curl` installed. But what would happen if you started another container using the `ubuntu` image?

Try running:
`docker container run -it --name notliketheother ubuntu bash`

What happens if you try to `curl` something from this container? This `notliketheother` container doesn't have `curl` installed! So though there are two containers running the same image you can alter the image in one container without effecting the other.

💡**Aside**: Using the Ubuntu image vs. the Whole Ubuntu OS? If you have Linux experience, or are currently running Docker through a Linux distribution, you might be asking what happens when you run a Ubuntu container? How is it different from the Ubuntu OS already running on your computer? If you run the `docker image ls` command you can see that the "distribution based images" like Ubuntu, Debian, CentOS, Alpine, etc. are all **very** small, at most a few hundred MB. These images are not full OS's but just the base utilities that you would expect if you were running that full OS. Mostly they are just used as the image you are building `FROM` in a Dockerfile. We'll take more about Dockerfiles soon. What is important to know is that these "distribution based images" are used commonly so that you can use the built in package managers (`apt`, `yum`, or `apk`) and get the same package versions you'd expect if you were using the full OS.

## Phase 2: Quote Generator

So now that we know you can run a shell within a Docker container let's have some fun with it. Here is a simple script that will generate a quote, try running it in your terminal. (If you run into an error for `wget missing` you will have to do a quick `brew install wget`).

```ssh
while :
do
    wget -qO- http://quotesondesign.com/wp-json/posts
    printf
    sleep 5
done
```

Okay so now that we know that a docker container can run a shell within it, stands to reason we could also run a shell script.

Let's get to it:

1. Run a container based off of the [`alpine`][alpine] image
    - The `alpine` image is a Linux distribution that is very popular amoung Docker images because it is only 5 MB in size.
2. Name the container something indicative like "quotes"
3. Run the container in [detached][detach] mode
4. Alpine's shell is located in the `/bin/sh` folder
   - You’ll need to compact the script into a one-liner using the `-c` flag and using semicolons to denote line breaks
   - The command you'll hand to the alpine image will look like this:

```ssh
/bin/sh -c "while :; do wget -qO- http://quotesondesign.com/wp-json/posts; printf '/n'; sleep 5; done"
```

Once you've successfully run your container it'll be happily chugging along in the background. But, in the background you won't be able to see the output of that container. Let's utilize the `docker container inspect <containernameORcontainerID>`. This command will allow you to see what that container is running. Check your logs a few more times and you'll see your script doing it's thing!

Nice! Let's make sure we clean up by using `docker container stop` and `docker container rm` to remove the quote generating container.

[alpine]: https://hub.docker.com/_/alpine
[detach]: https://medium.freecodecamp.org/dockers-detached-mode-for-beginners-c53095193ee9

## Phase 3: Networks

## DNS Round Robin Test

Let's utilize Docker containers and networks to create a small [Round-robin DNS][rr-dns]. Meaning that we want to have multiple containers on one network that can all respond to the same DNS address.

Start off by creating a new virtual Docker network. Check out the `docker network ls` command and make sure you see your new network listed. It should have the default [`bridge`][bridge] driver. Before creating the next two containers you'll want to research the [`--net-alias`][alias] flag to make sure both containers will respond to the same alias.

Next we'll be using two containers running the `elasticsearch` image. The  `elasticsearch` image provides a RESTful search engine that exposes port 9200 by default. The `elasticsearch` image is popular because of how easy it is to setup and use. The two things you'll need to know about the  `elasticsearch` image for this exercise are:

1. On container bootup the `elasticsearch` image will randomly assign itself a new name
2. When you `curl` a container running the  `elasticsearch` image it will return information about the container- including the randomized name it previously created. 


Now create two `detached` (`-d`) containers on the new network you created. Both containers will run the `elasticsearch:2` image and use `--net-alias`. Inspect one of your new containers using `docker container inspect <containernameORid>`. Under the "Networks" key you can see all the information for the network this container is currently on. You should see the name of your created network here!

Now let's make sure your containers are setup properly.

Create another container:

1. on the same network
1. with the `alpine` image with the [`nslookup`][nslookup] command
1. finish this line by ending with the name of your network alias.

The `alpine nslookup` command will return any IPs it finds on the network alias, and the name of the network. My network name in the below example is 'funtime', and my network alias is 'party':

```ssh
Name:      party
Address 1: 172.21.0.2 party.funtime
Address 2: 172.21.0.3 party.funtime
```

Finally run one more container- and this one will be simple. We want to make sure our two containers are responding to the same alias. To do this, we'll `curl` the port that both of the two `elasticsearch` containers are on. So our two `elasticsearch` containers expose the port 9200 but only **within** the network. Outside of the network we **can't** access these containers. 

So we'll create one more container to interact with our twin `elasticsearch` containers. Run a new container off the network you created with the `centos` (another Linux distribution) image and the command to `curl -s <network alias name>:9200`. Restart this last container a couple of times and you will see JSON being returned from each `elasticsearch` container. Each `elasticsearch` container will have a randomly generated "name" so as you `curl` one then the other you will see the "name" change as each container responds.

Just like that you have a small load balancer! Round-robin complete!

[rr-dns]: https://en.wikipedia.org/wiki/Round-robin_DNS
[alias]: https://docs.docker.com/v17.12/edge/engine/reference/commandline/run/
[bridge]: https://docs.docker.com/network/bridge/
[nslookup]: http://www.kloth.net/services/nslookup.php

## Phase 4: Persistent Data in Docker

As I’ve said before, Docker containers are not supposed to maintain any state. But what if we need state? In fact, some processes are inherently stateful, like a database. For example, a database needs to maintain all the data stored inside of it, as that’s a purpose of the database. If we store a database and it's data inside a container, when it’s is gone, so is the data. We are facing the problem of not having persistent data. Thank goodness Docker has a solution ready.

### Part A: Bind Mounts

Bind mounts allow you to take a directory or individual file that exists on your machine (from herein called the Host, or Docker Host) and access that directory or file inside the running container. Any changes you make to the directory contents, or individual file will cause the file(s) to change on the Host machine.

Start by running a fun named, detached, container based off the `nginx` image.

```ssh
$ docker container run -d --name DogsRGood nginx
```

Cool now while that's running that container in the background let's enter the shell for nginx by utilizing the `-it` flag and the`exec` command you learned earlier along with the `bash` command. Now that you are in your container do a quick `ls` and look around your file system. Looks pretty nice in here...be a shame if someone made a funny named directory. Too bad that's exactly what we are going to do!

Exit out of the container and make a new directory on your local computer. Put at least one file in the directory you created, and add some text to that file. I made a directory named `rad` and a simple text file within it.

```ssh
$ mkdir rad
$ touch rad/randomrad.txt
$ echo "hello world" >> rad/randomrad.txt
$ cat rad/randomrad.txt
hello world
```

Now let's mount this directory inside Docker, use a detached container with the `nginx` image, and look into the [bind mount][bind-m] docs to see examples of how to format your command. Use the `--mount` command for explicitly. You'll probably have a long command to enter, and with docker you can do multi-line commands like so:

```ssh
docker container run \
    multiple lines can be done with slashes \
    just like \
    this
```

Now go bind mount that volume (use the `--mount` command with a `type`, `source`, and `target`). Make sure your target path is **absolute** from your root. You got this! Now to test that it worked you can enter the new detached container you created using the `exec` command, the `-it` flag, and then hand it the command of `bash` to be executed.

```ssh
root@d46d99c3a840:/# ls
bin  boot  dev	etc  home  lib	lib64  media  mnt  opt	proc  rad  root  run  sbin  srv  sys  tmp  usr	var
root@d46d99c3a840:/# cd rad
root@d46d99c3a840:/rad# ls
randomrad.txt
root@d46d99c3a840:/rad# cat randomrad.txt
hello world
```

Now let's change the file in the container, and then exit the container.

```ssh
root@d46d99c3a840:/rad# echo "hello localhost" >> randomrad.txt
root@d46d99c3a840:/rad# exit
```

What happens when you look at that file on your localhost? It's changed! Same thing happens if we remove the file:

```ssh
root@d46d99c3a840:/rad# rm rad/randomrad.txt
root@d46d99c3a840:/rad# exit
~ ls -a rad
.  ..
```

So bind mounts can be helpful in local development if you are constantly changing a file - but as we just saw they are way more security prone because any change on your localhost will affect the data in your container! This is why you'll usually want to be using a `docker volume`.

### Part B: Docker Volumes

Volumes have several advantages over bind mounts, here is a quick list as a reminder before you get started working with them:

1. Volumes are easier to back up or migrate than bind mounts.
1. You can manage volumes using Docker CLI commands or the Docker API.
1. Volumes work on both Linux and Windows containers.
1. Volumes can be more safely shared among multiple containers.
1. Volume drivers allow you to store volumes on remote hosts or cloud providers, to encrypt the contents of volumes, or to add other functionality.
1. A new volume’s contents can be pre-populated by a container.

As we've gone over before- you are never supposed to change a container, just deploy and redeploy. For this next part of the project we'll be emulating a real life situation. What if you were working on a project with a Postgres database and a newer patch for that image came out with a security fix. You definitely want that new patch - but you also don't want to lose all your database data. So we'll utilize named volumes to carry the data from one container to another one.

In short, we'll be updating a container from one version of Postgres to a newer patched version while maintaining the data in the database. Visit the Postgres image on [Docker Hub][dh-postgres] and find any of the `9.6` versions of the image (**Hint**: you may have to look under the Tags tab.). There you'll find the `Dockerfile` for this image but what you are interested is the `VOLUME` command in the `Dockerfile`. The `VOLUME` command will tell you where this image keeps it's data - and we'll utilize that path in order to save that data.

Create a detached container running the `9.6.1` version of the Postgres image, with a [named volume][name-volume] called `psql-data` pointing at the data inside the Postgres volume. Check the logs for this container and make sure the database has finished starting up, you should see this message:

```ssh
PostgreSQL init process complete; ready for start up.
```

Make sure a volume with the name you specified was created by using `docker volume ls`. Inspect the volume you created `docker volume inspect psql-data`. Now we'll put some data into the volume as a test to make sure it'll properly transfer between the two containers. Enter the Postgres container with the following command:
`docker container exec -it <YOUCONTAINERID> psql -U postgres`. Then once you are in postgres post the following in order to create a table:

```sql
    CREATE TABLE cats
    (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    );

    -- cat seeding
    INSERT INTO
    cats (name)
    VALUES
    ('Jet');
```

Test that the table worked correctly with a simple query to select all the information from the `cats` table. Awesome, now exit the container with `\q`, and then stop the container. Look at your volumes again `docker volume ls`. Your `psql-data` volume is still there even when your container stopped!

Now create a new detached container with **the same named volume as before**, and a newer version of Postgres - `9.6.2`. Here's the final test! Check inside your new container using `docker container exec -it <YOURCONTAINERID> psql -U postgres`. Is the table you created earlier still there? If yes, then success! You upgraded a container while persisting the data!

A quick note - this will only work for patch versions, most SQL databases require manual commands to upgrade to major versions, meaning it's a DB limitation not a container one.

Amazing Job today! You've worked with different containers and their networks, persisted data through bind mounts and volumes, and gotten a lot more comfortable with container commands! Make sure you clean up any remaining containers by using the `docker container rm -f` command, as well as getting rid of any unused volumes with `docker volume prune`.

[bind-m]: https://docs.docker.com/storage/bind-mounts/
[name-volume]: https://success.docker.com/article/different-types-of-volumes
[dh-postgres]: https://hub.docker.com/_/postgres

## Bonus Health Checks:

Go back and prove your devotion to good testing by re-running all your containers using Container [Health Checks][health]!

[health]: https://docs.docker.com/engine/reference/run/#healthcheck
