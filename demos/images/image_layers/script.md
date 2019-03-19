
## Part One: Image Composition: 15 minutes (2 10 minute videos)
- interact with images already have
- show `inspect`
- inspect and image and it's layers
- talk about the container layer
- -union file system
- show an image visualizer for fun


## Learning Goals
- Not a complete OS. No kernel, kernel modules (e.g. drivers) 
- Images are App binaries and dependencies along with data and how to run image
- Images are made up of file system changes and metadata 
- Each layer is uniquely identified and only stored once on a host 
- A container is just a single read/write layer on top of image 
- Created Using a Dockerfile
- Stored in Docker Engine image cache 
- Can store images remotely on Docker Hub
- Don't store data in an image - use volumes or data mounts on runtime

## DO:

docker image ls

docker pull nginx

docker pull nginx:1.11.9

docker pull nginx:1.11

docker pull nginx:1.11.9-alpine

docker image ls

All using the same tag to point to the same image

docker image ls

docker history nginx:latest
docker image inspect nginx