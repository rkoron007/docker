## Creating a Dockerfile

As you start developing with Docker you'll find that that most of the time basic docker images won't satisfy your custom or complex image needs. That's where a Dockerfile becomes essential. A Dockerfile is a text file that defines a Docker image. You’ll use a Dockerfile to create your own custom Docker image, in other words- to define your custom environment to be used in a Docker container. Being able to create and customize a Dockerfile is an absolutely essential part of working with Docker.

We'll be exploring more complex Dockerfiles later, but let's start off with something fun. We'll be creating a simple Node server and running it with a Docker container. Create a new file simply named `Dockerfile`. Yep that's it, no extension. In this file, as in all Dockerfiles, the first thing you will write is the `FROM` command. The argument that you'll hand to this command is an image and the version of that image. We'll be using node for our purposes(you can find your node version by using `node --version`). It is **always** a good idea to make sure that whatever image version you plan to use matches up with your own. Again, we'll be using Node so check out the [node][dh-node] image on DockerHub and find the version that corresponds to your own. Once you've found it use the `alpine` tagged version of the image and hand it to your Dockerfile.

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

Okay but how do we go about running this file? If you start up your container with the image it has now it'll just exit out because we haven't given it any command to run on container start. Let's fix that by adding a couple of commands to the Dockerfile you created earlier. Our goal is to make sure our container can access the `server.js` file so that it can run it. The first command we'll use is `WORKDIR` because we want to make sure the file goes in the location we want. You'll want to make a new directory for the file you'll be transferring over so you'll use the `WORKDIR` command and pass it `/app` to let Docker know you want a new directory to be made for you.

Now that directory exists all we need to to is copy our `server.js` file so that it will be in our built image. Do that by utilizing the `COPY` command and the first argument will be the file you want to copy (`server.js`) then the second argument will be where you want to put that file (`/app`). Nice! Now rebuild your image an give it a tag for fun: `docker build . -t rkoron/node:latest-fun`.


Let's check out the change we made in our image directly before we run in to make sure everything is as you specified. We can directly see the file change by inside the image by utilizing the Node image built in shell (located in the image file system under `/bin/sh`).

Try running an interactive container based off your image by running `docker container run -it rkoron/node /bin/sh`. This will open an interactive shell where you can `ls` to see file directories or whatever else your need. You should see an `/app` folder, and when you ook inside you'll see `server.js`. 

Nice! Time to put it all together! Run your simple node script once without Docker using the simple `node server.js`. Once you've stopped that server let's use your image to show you the same behavior.

You'll need to expose a port on your localhost when running your new container, as well as tell your container what command you want it to run(`node server.js`). Remember that `server.js` is listening on port 8000 - so that's the port in the container where traffic should flow. Make sure to start your container in a detached state (using `-d`)! You just want your server running in the background, not taking over your terminal. Go to your localhost on the port you specified and you'll see you server running! Good job!

One last thing, what if we didn't want to specify the `node server.js` every time we ran a container based on this image? That sounds pretty annoying. Let's utilize the `CMD` command- which will specify what happens every time this image is used by a container. The `CMD` command should always be at the end of the Dockerfile and it accepts an array with string arguments. For our purposes we want to pass the `CMD` the argument of `["node", "server.js"]`. Now rebuilt you Dockerfile one more time and try booting up you container with out argument like this:

```ssh
docker container run --name node -d -p 80:8000 rkoron/node:latest
```


Swing over to `localhost:80` and you should see your server running! Great job making your first Dockerfile!! Make sure to clean up by removing your running containers.

[dh-node]: https://hub.docker.com/_/node/