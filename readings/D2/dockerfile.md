# Dockerfiles


## Overview
The most important thing to know about a Dockerfile is that it is a text file describing the build steps of a development environment. When Docker runs ("builds") a Dockerfile Docker will build an image which you can then use to start up other containers. [Here][docker-example] are some examples of simple Dockerfile builds and the commands that make them up.

## Using a Dockerfile
<!-- 
At this point I would like you to understand the following key points based on the example file:

1. The Dockerfile is a text file that (mostly) contains the instructions that you would execute on the command line to create an image.
1. A Dockerfile is a step by step set of instructions.
1. Docker provides a set of standard instructions to be used in the Dockerfile, like FROM, COPY, RUN, ENV, EXPOSE, CMD just to name a few basic ones.
1. Docker will build a Docker image automatically by reading these instructions from the Dockerfile. -->


## Building a Dockerfile

`docker built -t DOCKERFILENAME`

The `-t` will allow you to Name and optionally the build image using the common Docker format of 'name:tag'.

## Specific Commands

### FROM
Almost every Dockerfile begins with the `FROM` instruction that will set the Base Image for all subsequent instructions. The only argument that can come before `FROM` is [`ARG`][arg-from] which can be used to declare a variable outside of the build stage, that can be later be used inside the build stage. 

### ENV
This command is the preferred way to inject keys and values into image building. All the varibales set using this command can be used in the subsequent instructions in the build stage.

### RUN
The RUN instruction will execute each phrase of commands in a new layer on top of the current image and commit the results. The resulting committed image will be used for the next step in the Dockerfile. Additionally the `RUN` command can run shell scripts or whatever you can use within the container

### WORKDIR 
The `WORKDIR` instruction sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY` and `ADD` instructions that follow it in the Dockerfile. It is best practice to use `WORKDIR` to run commands that rely on being in a certain location in the file tree. The `WORKDIR` instruction can be also be used multiple times in a Dockerfile. If a relative path is provided, it will be relative to the path of the previous `WORKDIR` instruction. 

### EXPOSE
Specify to the image which ports are going to be exposed. 

### CMD
- final command will run every time you launch a new container from image or restart stopped container

### COPY
- copy our file to be used

[docker-example]: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
[arg-from]: https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact

## Dockerfile Example

```yml
FROM node:


```