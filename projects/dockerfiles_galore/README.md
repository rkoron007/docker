
# Dockerfile Derby!

## Learning Goals
- Learn how to Build a Custom Dockerfile
- User a Dockerfile with different networks, and volumes
- Use a Dockerfile to run Applications

## Overview
A Dockerfile is a text file that defines a Docker image. You’ll use a Dockerfile to create your own custom Docker image, in other words, to define your custom environment to be used in a Docker container. You’ll want to create your own Dockerfile when existing images don’t satisfy your project needs. This will happen most of the time, which means that learning about writing a Dockerfile is a pretty essential part of working with Docker.

The Dockerfile contains a list of instructions that Docker will execute when you issue the docker build command. Your workflow should follow the below:

1. Create the Dockerfile and define the steps that build up your images
1. Issue the `docker build` command which will build a Docker image from your Dockerfile
1. Use this image to start containers with the `docker container run` command
1. Reiterate and Rebuild As Needed

Best practice is to structure your Dockerfile according to the following:
1. Install tools that are needed to build your application.
2. Install dependencies, libraries and packages.
3. Build your application.


If you are ever need help with `Dockerfile` commands the `Dockerfile` [documentation][docker-docs] is your best friend! 

[docker-docs]: https://docs.docker.com/engine/reference/builder/

**Remember**: Each command you use in a Dockerfile(`FROM`, `RUN`, `WORKDIR`, `COPY`, `EXPOSE`, and `CMD`) will each create a new layer. You can string together commands by utilizing the `\`. You can also chain commands so that subsequent commands won't run unless the first command succcess using the `&&` symbol. There is an example of both being used below:

```docker
 RUN apt-get update \
	&& apt-get install --no-install-recommends \
	&& \
	NGINX_GPGKEY=573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62; \
```

## Phase One:
Before you start make sure to stop and remove any containers you have running so they don't interfere with your testing.

We've had a bit of experience with running simple container with the `nginx` image by now. Let's add a little spice on it. Our aim is to replace the default `nginx` html page with our own html. 

Start off by downloading the [skeleton][skeleton] and take a look into the 'phase1' folder. You'll see an `index.html` file and a `Dockerfile`. For all of the exercises today you'll never be changing any file but the `Dockerfile`.

We'll be extending the official `nginx` image - so start off by writing what will come at the top of 99% of `Dockerfile`s - the `FROM` command. For this example we'll be building off the `alpine` tagged version of `nginx:1.15`. 

We'll need to make sure we are copying our html into the correct folder. Change the working directory to `/usr/share/nginx/html`. Now all that's left is to `COPY` our `index.html`. You can keep the same `index.html` name in the image. You won't need to expose any ports because the image you are building off it - `nginx` - already has them built in. 

Cool, now build your image using the [`docker build`][build] command. If you run `docker image ls` you'll see something like this:

```ssh
REPOSITORY                              TAG                 IMAGE ID            CREATED             SIZE
<none>                                  <none>              009808218957        13 seconds ago      16.1MB
```
 This is why tagging is so important! You can still use the image ID to build a container, but a name is so much easier to read. [Tag][tag-docker] your image using the format of `docker build . -t <username/imagename>`. Now let's boot it up in a container! If you've forgotten which ports the `nginx` image exposes you can always use `docker image inspect <imagenameORid>`. Run a detached container with a published port based off this new image you created. If you see the `index.html` you were provided with is on `http://localhost:<yourlocalport>` then success!

 Move onto phase two!

<!-- PUT IN skeleton LINK -->
[build]: https://docs.docker.com/engine/reference/commandline/build/

## Phase Two: Node/Express App
Before you start make sure to stop and remove any containers you have running so they don't interfere with your testing. Take a look in the 'phase3' folder-  for this phase you'll be creating a Dockerfile for an app using Node and Express. We've created a Dockerfile with your instructions, also make sure to take a good **long** look inside the `.dockerignore` file for some good practices that you'll be using later. 

Once you've finished you Dockerfile, test your new image by creating a the container that is launched on port 80, and the internal port your image exposed. Attempt to visit `http://localhost:80` on your computer and you should be a fun surprise waiting for you. Make sure you stop and remove your container after you've confirmed it works. At this point go back to your Dockerfile and make sure your aren't creating any extra unneeded layers, you should only need 7 additional commands after the first `FROM` command. 

Awesome! Now make sure you properly [tag][tag-docker] your image - you can do this easily using the `-t` flag in a command that will look like this: `docker build -t <username/imagename>`. Now push the image you created up to [Docker Hub][dh].  You may need to `docker login` if you get an error. Check your Docker Hub profile and make sure you see it.

Next **delete the image off your computer**. I know, spooky 👻. Don't worry though- your image is safe and sound on DockerHub! You can use the `docker image rm <imagenameORID>` command. Confirm your image has been removed by running `docker image ls`. Now, we are going to pull your image like we've been pulling other images all along. Create a new detached container exposing port 80 on your localhost, and using port 3000 within the container, referencing the name of the image you created on Docker Hub. If everything worked correctly you'll pull your image from Docker Hub and will have the exact same behavior on your localhost. 

Good job! Pat yourself on the back for your fancy new Dockerfile and image then move onto the next phase.

[dh]: https://hub.docker.com/
[tag-docker]: https://docs.docker.com/engine/reference/commandline/build/#tag-an-image--t


## Phase Three: Spot the Flaws!
Okay so you've made a couple of `Dockerfile` by now - let's talk about some common mistakes and how you can avoid them. Check out the `Dockerfile` for a Node app the in the 'phase2' folder. There are some problems with it to say the least. Let's get to fixing!


### Part A: DockerIgnore
One of the first things you should do when you write a `Dockerfile` is write a `.dockerignore`. Sounds familiar right? A `.dockerignore` file ignores the files you don't want to have in your Docker image. It's just like a `.gitignore` - and you can ignore the same sorts of things. For example your `.dockerignore` for this setup should be ignoring:

```ssh
.git/
node_modules/
dist/
```
Nice! Looking more efficient already. 

### Part B: A Container Should Do One Thing Only.
Technically, you CAN start multiple processes inside Docker container. You CAN put your database, frontend, backend, `ssh`, and `supervisor` all into one docker image. But this is **not** good practice because:

1. Your build times will be **long** -remember every time something changes in a Dockerfile everything below that change won't be able to use the image cache.
2. You image will be large and take a while to download and upload.
3. Your container logs will be a mess with so much going on in one container
4. Doesn't scale well at all.

The list goes on! Docker's advice is to prepare separate Docker image for each component of your app. Remove the packages that aren't helping you run a node app from your `Dockerfile`. Make sure to update the `CMD` to only include the command for the package you kept. 

### Part C: Layers
This one was probably the most obvious - Docker is all about layers. Knowledge of how they work is essential. 

Here is a quick reminder:
1. Each command in your Dockerfile will create a new layer
2. Layers are cached and reused
3. Invalidating the cache of a single layer invalidates all subsequent layers
4. Layers are immutable, so if we add a file in one layer, then remove it in the next one, the image STILL contains that file (it's just not available in the container).

Think about what would happen to all subsequent layers whenever something is changed the source code. (**Hint**: what is adding all your current files right now?). You want all layer changes to occur as low as possible in the `Dockerfile`.

Now checkout all those `RUN` commands? Each one of them is currently making a whole new layer. Very inefficient. Squash them together! Look to the beginning of this project for a reminder of how to do multi-line commands.

Remove the `apt-get upgrade` line - as it makes our build non-deterministic. Instead we want to rely on our base image updates. 

### Part D: Be Specific
The `latest` tag will always be the default if no tag is specified. The current instruction of `FROM ubuntu` is equal to `FROM ubuntu:latest`. The problem with this is - say `ubuntu` releases a new version that your build isn't compatible with. So, unless it is your intention to a generic `Dockerfile` that must stay up-to-date with the base image, provide a specific tag.

For this `Dockerfile` use the `16.03` tagged version of `ubuntu`.

### Part E: Use the Proper Base Image
So we mentioned before that this is a `Dockerfile` for a Node app...then why is `ubuntu` our base image? Do we really need a general-purpose base image, when we just want to run a node application?  A Better option is to use a specialized image with node already installed. And while we are it let's use the `alpine` tagged version of node to make sure our image is as small as possible. Change the base image to `node:7-alpine`. 

Now that we have node installed remove all the `apt-get` lines that were originally installing node for you. 

**Note**: If we were to install any packages using the `alpine` distribution we would need to remember to use the `alpine` package system `apk` instead of `apt-get`

### Part F: Prefer COPY Over ADD
Just like the title says - use `COPY` the simple reason being it's simpler. `ADD` has some logic for downloading remote files and extracting archives, which is most scenarios is more inefficient for what you need. Just stick with `COPY`.

Let's `ADD`...uh, `COPY` that into your `Dockerfile`.

### Part G: Changing Directories
There is a specific command in Docker for changing the active directory of the container to a specified location, and that is `WORKDIR`! Following `Dockerfile` best practices, use `WORKDIR` to instead of `RUN` to change directories.  


### Part H: Syntax
Something about that `CMD` looks a bit off. Check out the Docker [`CMD`][cmd] docs and fix that syntax!

[cmd]: https://docs.docker.com/engine/reference/builder/#cmd

And that is it! Look at how much simpler your `Dockerfile` is! Head down to the next phase. 

## Phase Four

For this phase we'll have your run create a `Dockerfile` for a React/Redux app. This app might look a little familiar. Check out the live version [here][todos]. You'll be creating a `Dockerfile` for this application, but we are going to be getting fancy for this one. 

Take a look through the files for this phase and you'll see a simple React/Redux application - strictly frontend. Meaning there is no server for rendering this application - so we'll use `nginx` in order to see this app on localhost. This presents us with a problem - we want to use `node` as a base image in order to bundle our React code, but we also want to use `nginx` as our server to show our code. 

We have two main concerns but we only want to build one image. The way we can get around this is by using [multi-stage builds][ms-b]. Once our code has been built using `node` we don't actually require any `node` functionality anymore. So we can use the files that `node` built and hand them to `nginx` to replace the default html that `nginx` renders.

Think about how you'd ordinarily run this application. You would bundle your script using "npm start" and then render the `index.html` in your browser. That is our aim!

Start off by creating a `.dockerignore` and fill it with what we'll want to ignore in our built image. Then create a `Dockerfile`, for the `FROM` command use a recent node version like `node:8.15-alpine` and name this stage of the build for later reference. 

```
FROM node:8.15-alpine as build-stage
```

Next, navigate to a folder named "/app". Copy over all your files here. Then run the command to install dependencies, and the command to run webpack and create your "bundle.js". 

Here’s the Docker multi-stage trick. Next you'll want to create a second `FROM` with the `nginx` image, version `1.15`. Expose port 80 from the image. Next is a normal COPY, but it has a `--from=build-stage`. That `build-stage` refers to the name we specified above in the `as build-stage`. Here, although we are in a `Nginx` image, starting from scratch, we can copy files from a previous stage. Copy over your `/app` folder into the place 'nginx' keeps its html information - `/usr/share/nginx/html`

For the last step we've provided you with a `nginx.conf` - this file will basically just take care of making sure all your files aren't overwritten by the `nginx` default configuration. Add this last line to your `Dockerfile`:

```
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
```

Thats it for your `Dockerfile`! Build and tag your image and try running it on post 80 on your localhost. 

Congratulations on some amazing Dockerfiles! Push your image up to Docker Hub as proof of your victory!

[todos]: https://aa-todos.herokuapp.com/
[ms-b]: https://docs.docker.com/develop/develop-images/multistage-build/#name-your-build-stages


## Bonus: HealthChecks

Prove you are testing oriented by writing [Healthchecks][health] for all the `Dockerfiles` you've written today. After you've finished make sure you images all fun properly before you re-push your changed images up to Docker Hub. Mody Dock would be proud! 🐳


[health]: https://docs.docker.com/engine/reference/builder/#healthcheck