
# Installing Docker

## Quick Breakdown of Docker Benefits
- Docker is all bout Speed (Develop, Build, Test, Deploy, Update, Recovery)
- Docker guarantees Consistency through across devices
- Docker started as, and is mainly still, open source

### Linux Containers vs. Windows Containers
Linux Containers are what we will be dealing with the rest of this course and are generally regarded as the 'default' kind of container in Docker. If you are interested in learning how a windows container could be run check out [this guide][windows-containers].

[windows-containers]: https://blog.docker.com/2016/09/build-your-first-docker-windows-server-container/ 

## Docker CE - Community Edition

First thing to know about the Community Edition of Docker is that it's free! The Community Edition is a open source and aimed towards developers and ops teams and has the **same core features** as the Enterprise edition.  The Community Edition is what we'll be using for the rest of this course.

## Docker EE - Enterprise Edition 

The Docker [Enterprise Edition][enterprise] is a paid edition of Docker with additional support and products. If you are working for a large company that might have need of extra support directly from Docker, or extra vulnerability scans. This may be the edition you use if you start work with a larger company. 
[enterprise]: https://www.docker.com/products/docker-enterprise

### A Quick Word about Edge vs.Stable
The simple differences between the Edge and Stable versions of Docker is the rate at which they are released and the ability to preview new features. The [Edge][edge] version of Docker is released monthly and will include new features the Docker team is currently working on. The current Edge version of Docker won't be fully tested and has a higher probability of encountering bugs and crashes. The Stable version of Docker is released quarterly and is fully backed and tested, and is much  more reliable. To read more about the differences between Docker Edge and Stable see [here][stable-vs-edge].

For this course we will be using the Stable version of Docker, because less bugs means less problems for us! 

[edge]: https://docs.docker.com/edge/
[stable-vs-edge]: https://docs.docker.com/docker-for-mac/faqs/#stable-and-edge-channels

## Installing Docker on Mac
The first thing to note is that the Mac OS does not natively support Docker. In order to get around this Docker creates a tiny Linux virtual machine in order to operate. 

Virtual Machines will take up memory and ram as needed on your local machine and Docker is no different. If you'd like to increase the resources available to Docker while running on your machine you can see how to do so [here][mac-docs] under the `Advanced` heading. 

To start installing Docker visit Dockerhub for the official Docker [download][install-mac-docs]. When scrolling down to the `Installation` tab you'll see the option to download two different version of Docker `Stable` and `Edge`. To reiterate we'll be using the `Stable` version of Docker. Below the installation link the instructions are clear but you can follow along with the guide found [here][docker-install] if you run into any issues.

After you have installed Docker we recommend installing the Docker Command-line completion for Docker Compose[here][compose-completion] and for Docker Machine [here][machine-completion]. The command line completion is always helpful while learning new docker commands as a reminder of what you can input into those commands.  

Once you've installed the above tools run the command `docker --version` in your terminal. If everything is setup correctly this command returns information about the current Docker server version running in the background. Meaning you are all set if this works! If you ever need more information about the specifics of the resources Docker is currently using you can use the `docker info` command. 

[mac-docs]: https://docs.docker.com/docker-for-mac/
[install-mac-docs]: https://docs.docker.com/docker-for-mac/install/
[compose-completion]: https://docs.docker.com/compose/completion/
[machine-completion]: https://docs.docker.com/machine/completion/

## Installing Docker for Windows and Linux

When installing Docker onto Windows you'll be using [`Hyper-V`][hyper-v] and a tiny Linux machine to create and interact with Linux Containers. 
If you'd like an in-depth guide on how to install Docker on different [Windows versions][docker-install-windows] or on [Linux][docker-install-linux] Brett Fisher has a wonderful video guide that can be found [here][docker-install].

[docker-install]:https://www.bretfisher.com/installdocker/
[hyper-v]:https://en.wikipedia.org/wiki/Hyper-V
[docker-install-linux]: https://docs.docker.com/install/linux/docker-ce/ubuntu/
[docker-install-windows]: https://docs.docker.com/docker-for-windows/install/
