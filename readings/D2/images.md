# Docker Images

The official Docker definition of an image is: "An Image is an ordered collection of root filesystem changes and the corresponding execution parameters for use within a container runtime". But what does that mean exactly? 

Just like a class is used to create objects - you can think of an image as the template that Docker uses to spawn containers. Images are created by using a Dockerfile and is built up using a series of layers. Each layer represents an instruction in the image’s Dockerfile. Each layer except the very last layer is read-only.

A typical image contains:

1. **Files:**: which hold data like application binaries, dependencies, libraries and kernel modules
1. **Metadata:** instructions for how the container will behave. For example, which processes it will run, which network ports it will expose, which volumes it will use for persistent storage, among other settings.

#### What Is NOT an Image?

An image is not a complete Virtual Machine, it does not have a complete OS or it's own Kernal. An image can be as small as one file, or as large as a Linux distribution like [Ubuntu][ubuntu] .

[ubuntu]: https://hub.docker.com/_/ubuntu

## Image Composition
Images are composed of metadata and **layers**. Each layer is only a set of differences from the layer before it. The layers are stacked on top of each other. An Image layer is a general term which may be used to refer to one or both of the following:

1. The metadata for the layer formatted in JSON.
1. The filesystem changes described by a layer.

The first type of layer is known as either the `Layer JSON ` or `Layer Metadata`. The latter is referred to as the `Image Diff`.

## Viewing Image MetaData
You can inspect the metadata of an image using the command `docker image inspect IMAGENAME`.  You can see basic info like:

1. The image's id
1. Default environment information
1. Exposed ports
1. Tags associated with that image,
1. The Command the image will run by default when a container is run of that image
1. The hash values for the layers contained within this image
1. And much much more!

## More Image Terminology

#### Image Parent
Layer's will often have a place reserved in their metadata for the `parent` field. An Image's `parent` refers to the Image from which the current image directly descends from. An image's metadata will contain a set of changes relative to the filesystem of its parent image. 

#### Image JSON
Each layer has an associated JSON structure which describes basic information about the image such as the date the layer was created, the author, and the ID of its parent image as well as execution/runtime configuration like its networking, and volumes.

#### Union Filesystem
Each layer has an archive of the files which have been added, changed, or deleted relative to its parent layer. Using a layer-based filesystem, or by computing the diff from filesystem snapshots, the `union Filesystem` can be used to present a series of image layers as if they were one cohesive filesystem.

#### Image ID
Each layer is given an ID upon its creation. It is represented as a hexadecimal encoding of 256 bits, e.g., `a956...`. Image IDs should be sufficiently random so as to be globally unique. 

#### Tag
A tag serves to map a descriptive, user-given name to any single image ID. An image name suffix (the name that comes after the `:`) is often referred to as a tag as well, though it strictly refers to the full name of an image. (Example: `node:8.15-alpine` the `8.15-alpine` is the tag).Tag names should be limited to the set of alphanumeric characters `[a-z, A-Z, 0-9]` and punctuation characters `[._-]`. Tag names **MUST NOT** contain a `:` character.

#### Versions
As an image gets updated overtime newer versions of that image will come out. The important thing to know is that when working in production you **always** want to specify which exact image version you are using (`1.11.9` vs `1.11`). You will rarely want an image to update automatically, so using a consistent image version will help keep code compatibility issues to a minimum. 

#### Repository
A collection of tags grouped under a common prefix (the name component before `:`). For example, in an image tagged with the name `my-app:3.1.4`, `my-app` is the *Repository* component of the name. 

