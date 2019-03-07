# Dockerfile Derby!

## Learning Goals
- Learn how to Build a Custom Dockerfile
- User a Dockerfile with different networks, and volumes
- Use a Dockerfile to run Applications

## Overview
A Dockerfile is a text file that defines a Docker image. You’ll use a Dockerfile to create your own custom Docker image, in other words to define your custom environment to be used in a Docker container. You’ll want to create your own Dockerfile when existing images don’t satisfy your project needs. This will actually happen most of the time, which means that learning about the Dockerfile is a pretty essential part of working with Docker.

The Dockerfile contains a list of instructions that Docker will execute when you issue the docker build command. Your workflow should  follow this workflow:

1. Create the Dockerfile and define the steps that build up your images
1. Issue the `docker build` command which will build a Docker image from your Dockerfile
1. Use this image to start containers with the `docker container run` command

## Dockerfile 

The best practice is to structure your Dockerfile according to the following:
1. Install tools that are needed to build your application.
2. Install dependencies, libraries and packages.
3. Build your application.