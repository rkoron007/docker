
## Learning Goals
- Know How to Create, Stop, and Remove Containers
- Know How to Create Networks
- Know how to Create Containers with Network and Environment Variables
- Knowledge of how to Pull Down and Utilize Different Images in your Containers
- Know how to Create Custom Images
- Building a Dockerfile in Order to Create an Image

## Phase 0: Starting Some Containers

Start off by booting up some containers

## Phase 1: The Shell Within

Looking at a container from the outside can be interesting but by now you must be wondering if its possible to see what is happening ***inside*** a container? Which is totally possible using the `Docker CLI`(Command Line Interface). 

```bash
docker container run -it
```

The `-it`  is actually two separate flags you are adding to docker:
* `-t` - simulates a terminal (like what SSH does`)
* `-i` - keeps a session open to receive terminal input


## Creating a Dockerfile

At some point in the future you'll find yourself wanting to build your own images. Dockerfile is just a text file. Docker build will build your image 

## Networking with Containers

• Use different Linux distro containers to check curl cli tool
version
• Use two different terminal windows to start bash in both centos:
7 and ubuntu:14.04, using -it
• Learn the docker container --rm option so you can save
cleanup
• Ensure curl is installed and on latest version for that distro
• ubuntu: apt-get update && apt-get install curl
• centos: yum update curl
• Check curl --version

## Assignment: DNS Round Robin Test
• Ever since Docker Engine 1.11, we can have multiple containers
on a created network respond to the same DNS address
• Create a new virtual network (default bridge driver)
• Create two containers from elasticsearch:2 image
• Research and use --net-alias search when creating them to
give them an additional DNS name to respond to
• Run alpine nslookup search with --net to see the two
containers list for the same DNS name
• Run centos curl -s search:9200 with --net multiple times until you see both "name" fields show

@@