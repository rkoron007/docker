## Creating a Dockerfile

As you start developing with Docker you'll find that most of the time basic docker images won't satisfy your custom or complex image needs. That's where a Dockerfile becomes essential. A Dockerfile is a text file that defines a Docker image. You’ll use a Dockerfile to create your own custom Docker image, in other words- to define your custom environment to be used in a Docker container. Being able to create and customize a Dockerfile is an essential part of working with Docker.

We'll be exploring more complex Dockerfiles later, but let's start off with something fun. We'll be creating a simple image for a Node server and running it with a Docker container. Create a new file simply named `Dockerfile`. Yep that's it, no extension. In this file, as in all Dockerfiles, the first thing you will write is the `FROM` command. The argument that you'll hand to this command is an image and the version of that image. We'll be using node for our purposes(you can find your node version by using `node --version`). It is **always** a good idea to make sure that whatever image version you plan to use matches the version you are using in development. Again, we'll be using Node so check out the [node][dh-node] image on Docker Hub and find the version that corresponds to your own. Once you've found it use the `alpine` tagged version of the image and hand it to your Dockerfile.

Which should look something like this:

```docker
FROM node:11.0.0-alpine
```
Now make sure you are in the same directory as the Dockerfile and you can run the command `docker build .`. This will build a new image based on the Dockerfile you just wrote. Check it out using `docker image ls`.

```ssh
REPOSITORY                            TAG                 IMAGE ID            CREATED             SIZE
node                                  11.0.0-alpine       5d526f8ba00b        4 months ago        71.1MB
```

Now we'll want to tag that image properly so people know you made it! Use `docker build . -t <yourusername>/node` to rebuild your image.  It'll automatically be tagged with the default `latest` tag because we didn't specify a tag when building. Now check it out with `docker image ls`:

```ssh
REPOSITORY                            TAG                 IMAGE ID            CREATED             SIZE
node                                  11.0.0-alpine       5d526f8ba00b        4 months ago        71.1MB
rkoron/node                           latest              5d526f8ba00b        4 months ago        71.1MB
```

Note the image IDs are the same - that's because we have just re-tagged an existing image. 

Now we'll create a simple Node server - make a new file named `server.js` and insert the following:

```js
var http = require ('http');

http.createServer(function(req, res) {
    res.write("Hello World! It's good to be here.");
    res.end();
}).listen(8000);
```

Awesome...but how do we get this file into Docker? If you start up your container with the image it has now it'll just exit out because we haven't given it the proper command to run when the container starts. Let's fix that by adding a couple of commands to the Dockerfile you created earlier. Our goal is to make sure our container can access the `server.js` file so that it can run it. The first command we'll use is `WORKDIR` - which will either change our current location or create a new directory if the specified location doesn't exist and change our location to that new directory. You'll want to make a new directory for the `server.js` file you'll be transferring over so you'll use the `WORKDIR` command and pass it `/app` to let Docker know you want a new directory to be made for you.

Now that the `/app` directory exists all we need to to is copy our `server.js` file so that it will be in our built image. Do that by utilizing the `COPY` command and the first argument will be the file you want to copy (`server.js`) then the second argument will be where you want to put that file (`/app`). Nice! Now rebuild your image and give it a tag for fun: `docker build . -t <userusername>/node-server`.

Let's check out the change we made in our image by running a container based on that image. We can directly see the file we just add by utilizing the Node image built in shell (located in the image file system under `/bin/sh`).

Run an interactive container based off your image by running `docker container run -it <yourusername>/node-server /bin/sh`. This will open an interactive shell where you can `ls` to see file directories or whatever else you need. You should see an `/app` folder, and when you look inside you'll see `server.js`. 

Nice! Time to put it all together! Run your simple node script locally, without Docker, using `node server.js` and traveling to `http://localhost:80`. Once you've stopped that server let's use your shiny new image to have the exact same behavior.

You'll need to expose a port on your localhost when running your new container, as well as tell your container what command you want it to run(`node server.js`). Remember that `server.js` is listening on port 8000 - so that's the port in the container where traffic should flow. Make sure to start your container in a detached state (using `-d`)! You just want your server running in the background, not taking over your terminal. Go to your localhost on the port you specified and you'll see you server running! Good job!

One last thing, what if we didn't want to specify the `node server.js` command every time we ran a container based on this image? That sounds pretty annoying. Let's utilize the `CMD` command- which will specify what happens every time a container is ran using this image. The `CMD` command should always be at the end of the Dockerfile and it accepts an array with string arguments. For our purposes we want to pass the `CMD` the argument of `["node", "server.js"]`. Now rebuild your Dockerfile one more time and try booting up your container without passing an argument like this:

```ssh
docker container run --name node -d -p 80:8000 rkoron/node:latest
```


Swing over to `http://localhost:80` and you should see your server running! Great job making your first Dockerfile!! Make sure to clean up by removing your running containers. To be extra fastidious you can also remove the image you built using `docker image rm <imageidORname>`.

[dh-node]: https://hub.docker.com/_/node/