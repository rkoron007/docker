# Non Technical Overview of Docker

## What is Docker?

Docker is an open-source project designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one pretty package. Meaning that a developer can rest assured that the application they ship out will run on any other Linux machine regardless of any customized settings that machine might have from their original machine. 

Not long ago, containers as a technology were only available at tech giants such as Google, but nowadays containers are widely available and used at companies small and large. Major tech corporations down to small start ups use containers to simplify development, testing, deployment, and operation of their software.

## Docker History
![Whale](https://i2.wp.com/blog.docker.com/wp-content/uploads/2013/06/Docker-logo-011.png?resize=300%2C232&ssl=1)

`This is it. Containers are the next once-in-a-decade shift in infrastructure and process that will make or break you` - Bret Fisher (A Docker Captain)

Docker was founded in 2010 by Solomon Hykes. Docker built partnerships with technology giants including Microsoft and Google and in Cluster HQ’s Container Market Adoption Survey 2016 94% of the respondents said that they use Docker. Based on previously available open source technologies Docker created a standard way to deploy Linux applications into containers which then can run in different environments. 

Everyone has seen the adorable whale logo, named Moby Dock, representing Docker - but Docker's official mascot is actually[Gordon the Turtle](https://twitter.com/gordontheturtle?lang=en). 

## Docker Community Edition vs. Enterprise Edition

To host containers in development environments and provide additional developer tools, Docker ships Docker Community Edition (CE) for Windows or for macOS. These products install the necessary Virtual Machine (the Docker host) to host the containers. Docker also makes available Docker Enterprise Edition (EE), which is designed for enterprise development and is used by IT teams who build, ship, and run large business-critical applications in production.

## Concepts

### Docker Containers

From the Docker website:
`A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.  A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.` 

A container can be compared to a process on your computer 

### Docker Linux Containers
Docker image containers can run natively on Linux and Windows. However, Windows images can run only on Windows hosts and Linux images can run on Linux hosts and Windows hosts (using a Hyper-V Linux VM, so far), where host means a server or a VM.


## Dockerfile (Build System)

## Docker Compose

## Docker Machine