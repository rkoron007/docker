# Dockerfiles


## Overview
The most important thing to know about a Dockerfile is that it is a text file describing the build steps of a development environment. When Docker runs ("builds") a Dockerfile Docker will build an image which you can then use to start up other containers. [Here][docker-example] are some examples of simple Dockerfile builds and the commands that make them up.

## Using a Dockerfile

At this point I would like you to understand the following key points based on the example file:

1. The Dockerfile is a text file that (mostly) contains the instructions that you would execute on the command line to create an image.
1. A Dockerfile is a step by step set of instructions.
1. Docker provides a set of standard instructions to be used in the Dockerfile, like FROM, COPY, RUN, ENV, EXPOSE, CMD just to name a few basic ones.
1. Docker will build a Docker image automatically by reading these instructions from the Dockerfile.

## Specific Commands

## FROM
- In the FROM need the images (usually want some sort of package management system)

## ENV
- preferred way to inject key/value to container building and executing

## RUN
- order matters
- can run shell scripts or whatever you can use within the container
- Use `&&` 
- each stanza is it's own layer

### WORKDIR 
  - Best practice

## EXPOSE
- will say which ports are available

## CMD
- final command will run every time you launch a new container from image or restart stopped container

## COPY
- copy our file to be used

[docker-example]: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/