# Dockerfiles


## Overview
The most important thing to know about a Dockerfile is that it is a text file describing the build steps of a development environment. When Docker runs ("builds") a Dockerfile it will build an image which you can then use to start up other containers. [Here][docker-example] are some examples of simple Dockerfile builds and the commands that make them up. 

A Dockerfile is an entirely unique language to Docker though it may resemble scripting. The default name for a Dockerfile is `Dockerfile`, though you can always rename the file as needed. We recommend bookmarking and often referring back to [this][dockerfile-ref] page of the Dockerfile docs.  

[docker-example]: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
## Using a Dockerfile

Here are the Dockerfile basics:

1. A Dockerfile is a text file used to create an image and is comprised of commands you could call in the command line to assemble an image
1. Docker provides a set of standard instructions to be used in the Dockerfile (FROM, COPY, RUN, ENV, EXPOSE, CMD)
1. When a Dockerfile is run (otherwise known as 'built') **each instruction will create an image layer**. 

## Building a Dockerfile

`docker build . -t <NEWIMAGENAME>`

The `docker build .` will allow you to build an image from a Dockerfile and then the `-t` will allow you to tag the newly build image using the common Docker format of `name:tag`. If you are building outside of the directory where your Dockerfile is located you can use: `docker build . -f /path/to/a/Dockerfile`

## Dockerfile Example

One of the common best practices you'll see in Dockerfiles are chained commands using `\` and `&&`. Remember that each instruction in a Dockerfile will become a layer so chaining commands allows you to fit more into each layer saving on space. You'll see an example of this below:

```yml
    FROM node:argon
    # Create app directory
    RUN mkdir -p /usr/src/app \

    # These two stanzas are part of the same created RUN layer
    # you can chain commands like this using '\' and '&&'
        && echo "This is part of the same layer" \
        && echo "and so is this one!"

    # change our current working directory
    WORKDIR /usr/src/app

    # Install app dependencies
    COPY package.json /usr/src/app/
    RUN npm install

    # Bundle app source
    COPY . /usr/src/app

    # expose a port
    EXPOSE 8080

    #  This is the command that will be run
    # each time a container is built using this image
    CMD [ "npm", "start" ]
```

Shown below, when Docker builds the image from the above Dockerfile, each step corresponds to a command run in the Dockerfile. And each layer is made up of the files generated from running that command. Along with each step, the layer created is listed represented by its randomly generated ID. For example, the `layer ID` for step 1 is `530c750a346e`. 

```ssh
$ docker build -t expressapp .
Step 1 : FROM node:argon
argon: Pulling from library/node...
...
Status: Downloaded newer image for node:argon
 ---> 530c750a346e
Step 2 : RUN mkdir -p /usr/src/app     && echo "This is part of the same layer"     && echo "and so is this one!"
 ---> Running in 5090fde23e44
This is part of the same layer
and so is this one!
 ---> 7184cc184ef8
Removing intermediate container 5090fde23e44
Step 3 : WORKDIR /usr/src/app
 ---> Running in 2987746b5fba
 ---> 86c81d89b023
Removing intermediate container 2987746b5fba
Step 4 : COPY package.json /usr/src/app/
 ---> 334d93a151ee
Removing intermediate container a678c817e467
Step 5 : RUN npm install
 ---> Running in 31ee9721cccb
 ---> ecf7275feff3
Removing intermediate container 31ee9721cccb
Step 6 : COPY . /usr/src/app
 ---> 995a21532fce
Removing intermediate container a3b7591bf46d
Step 7 : EXPOSE 8080
 ---> Running in fddb8afb98d7
 ---> e9539311a23e
Removing intermediate container fddb8afb98d7
Step 8 : CMD npm start
 ---> Running in a262fd016da6
 ---> fdd93d9c2c60
Removing intermediate container a262fd016da6
Successfully built fdd93d9c2c60
```

### Rebuilding a Dockerfile
Whenever possible, Docker will re-use the intermediate images (cache), to accelerate the docker build process. So if nothing in the `Dockerfile` changed from the last time you built it, you will see the message `Using Cache` when building.

```ssh
$ docker build -t expressapp .
Sending build context to Docker daemon 15.36 kB
Step 1 : FROM node:argon
 ---> 530c750a346e
Step 2 : RUN mkdir -p /usr/src/app
 ---> Using cache
 ---> 7184cc184ef8
```

Be wary though! If you make a change in a Dockerfile once it's been built, Docker will see that change and then will **no longer use the cache** of image layers it had. That's why it is always a good idea to put any layers that you intend to change as low in the Dockerfile as possible. That way the beginning of your Dockerfile will be able to use the cache until it hits your changes.

## Logging in Dockerfiles
Docker can handle all of our logging for us while building our images - we just need to tell it where to put those logs. You can use `stdout` and `stderr` by adding something like the following `RUN` command to your Dockerfile:

```
# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/IMAGENAME/access.log \
	&& ln -sf /dev/stderr /var/log/IMAGENNAME/error.log
```


[dockerfile-ref]: https://docs.docker.com/engine/reference/builder/