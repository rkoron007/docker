## Peeling back the Layers

## Image Commands
Every image on the lowest level starts with a first blank layer called `scratch`. Every set of changes that occurs in the filesystem in the image after that is recorded in a **layer**.  Using the `docker image history <IMAGENAME>` will show you the history of an image's layers. 

```sh
$ docker image history nginx   
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
f09fe80eb0e7        3 weeks ago         /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon…   0B                  
<missing>           3 weeks ago         /bin/sh -c #(nop)  STOPSIGNAL SIGTERM           0B                  
<missing>           3 weeks ago         /bin/sh -c #(nop)  EXPOSE 80                    0B                  
<missing>           3 weeks ago         /bin/sh -c ln -sf /dev/stdout /var/log/nginx…   22B                 
<missing>           3 weeks ago         /bin/sh -c set -x  && apt-get update  && apt…   53.9MB              
<missing>           3 weeks ago         /bin/sh -c #(nop)  ENV NJS_VERSION=1.15.8.0.…   0B                  
<missing>           3 weeks ago         /bin/sh -c #(nop)  ENV NGINX_VERSION=1.15.8-…   0B                  
<missing>           3 weeks ago         /bin/sh -c #(nop)  LABEL maintainer=NGINX Do…   0B                  
<missing>           3 weeks ago         /bin/sh -c #(nop)  CMD ["bash"]                 0B                  
<missing>           3 weeks ago         /bin/sh -c #(nop) ADD file:5a6d066ba71fb0a47…   55.3MB              
```

Wait a second, some of these layers are "missing"?! I demand a refund! J.K. what the "missing" is conveying to you is that each of the layers comprising this image are not an image themselves -  so they don't get an image ID. To see the hash for each layer of the image you can use the `docker image inspect <IMAGENAME>` command or you can view the layers on the Docker host in: `/var/lib/docker/aufs`. To read more about digging through layers using the Docker Host check out [this] article.

[layer-find]:https://medium.com/@jessgreb01/digging-into-docker-layers-c22f948ed612

### Building Images Locally
Locally built images on a Docker host are treated slightly differently than images pulled in from another source. The generic content of an image built locally remains the same - it still is composed of metadata and layers. 

However, when a layer is created during an image build on a local Docker host, an 'intermediate' image is created at the same time. Just like all other images, it has a metadata including the layer digests that are to be incorporated as part of the image, and its ID. Intermediate images aren't tagged with a name, but, they do have a 'Parent' key, which contains the ID of their parent image.

The purpose of building images locally using intermediate images is to facilitate the use of Docker's `build cache`. The build cache is an important feature of the Docker platform, and is used to help the Docker Engine make use of pre-existing layer content, rather than regenerating the content over and over for an identical build command. 

When a locally built image is pushed to a registry the intermediate layers aren't needed anymore because the image will no longer be rebuilt and that image. The image effectively becomes read-only, and the components that support the build cache are no longer required. Instead of the image ID, `<missing>` is inserted into the history output. 

## The Cache of Image Layers
So as we saw above images are composed of layers and each layer has a hash associated with it. Layers are neat because they can be re-used by multiple images saving disk space and reducing time to build images while maintaining their integrity. We are never storing the same the layer more than twice in our image cache. 

## Container Layer
Let's talk about what happens when you create a container based off of an image. When a container is run with an image a thin Read/Write layer is created on top of that image.  Meaning that each container is an image with a readable/writeable layer on top of a bunch of read-only layers.

![Cache](https://assets.aaonline.io/Docker/image-cache.png)

For example: say we have two named containers (A and B) initialized with different passwords using the Postgres image. The Storage Driver for Docker would build two thin Read/Write layers on top of the Postgres top most layer. Meaning that the only file space difference between container A and B would be on the differences between the top R/W layers (where the passwords would be kept). 


#### Copy on Write
So that's all fine and dandy, but what if you need to make a change within an image that other containers are running on? In the previous example say that I start Container A and B off Postgres. Then, I make a new container, let's say C, and n C I got into the Postgres image and I change one of the layers. Will that effect my other two running containers? **Nope!** Docker will take the changes that you made to Postgres in container C and store those different changes in the R/W layer in Container C. So all three containers would run no problem. This is the magic of a Union File System. 

## Union File System
Depending on the version of Docker will be using either the [`AUFS`][aufs] or [`OverlayFS`][overlay] storage driver. Both drivers use a Union File System which utilizes a Union Mount in order to combine numerous directories into one directory that looks like it contains the content from all the them. Using a Union filesystem is **super** cool because it merges all the files for each image layer together and presents them as one single read-only directory at the union mount point.

The main advantage to using a Union file system is that each layer that is created can be reused by an unlimited number of images. This saves a ton of disk space and allows images to be built faster since it is just re-using an existing layer. Additionally, the read/write top layer of a container gives the appearance that you can modify the image, but the read-only layers below actually maintain their integrity of the container by isolating the contents of the filesystem.

[aufs]: https://docs.docker.com/storage/storagedriver/aufs-driver/
[overlay]: https://docs.docker.com/storage/storagedriver/overlayfs-driver/


## Image Layer Visualizers:
If you ever want to see a more visual breakdown of the layers an image you can check out the following layer visualizers:

* [MicroBadger][mb] - great visualizer to breakdown image layers
* [Image Layers][layers] - doesn't do as well finding recent images


## References:
* [Digging Into Docker Layers][layer-find]

[layers]: https://imagelayers.io/?images=postgres:9.5.2
[mb]: https://microbadger.com/