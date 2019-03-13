## Where to Find Images

[Docker Hub][docker-hub] is the best place to find Official and public images for your development purposes. There are many thousands of images to be found on Docker Hub (especially for large scale images like `Ubuntu` or `Node`). 


### Official Images vs. User Made Images 
Official images will be denoted as such on their image page like the one here for [nginx][nginx]. You will most often be working with official images because they are well maintained, have good documentation, use good practices, and are kept up to date. Official images are also usually maintained by the software teams who created the official software the image is based on. [Here][official-images] is a list of all the official Images available on Docker Hub.

Another kind of Image you will see on Docker Hub is a user made image. These images will follow the naming pattern of `<USERNAME>/ImageName` like the image found [here][user-image]. Just like with `Github` or `npm` libraries, a good indication of the quality of an user made image is the number of stars and pulls for that image. User created images will usually have a link to the Dockerfile the user used to create the image and information about the user who created the image. We will be creating our own images very soon! 

[official-images]: https://github.com/docker-library/official-images/tree/master/library
[user-image]: https://hub.docker.com/r/jwilder/nginx-proxy

#### Versions
The first thing you'll usually see on a Docker Hub repository for an Official image is versioning for that image. As an image gets updated - newer versions of that image will come out. The important thing to know is that when working in production you **always** want to specify which exact image version you are using (`1.11.9` vs `1.11`). You will rarely want an image to update automatically, so using a consistent image version will help keep code compatibility issues to a minimum. 

#### Tags

A tag serves to map a descriptive, user-given name to any single image ID. An image name suffix (the name that comes after the `:`) is often referred to as a tag as well, though it strictly refers to the full name of an image. (Example: `node:8.15-alpine` the `8.15-alpine` is the version, then the tag for that version). Tag names should be limited to the set of alphanumeric characters `[a-z, A-Z, 0-9]` and punctuation characters `[._-]`. Tag names also **MUST NOT** contain a `:` character.

**Note**: The `latest` tag is the default tag applied when pulling or pushing an image. So if you pull down the `nginx` image (`docker pull nginx`) you are actually pulling down `nginx:latest` since you didn't specify a tag. The `latest` tag of an image is usually the most recent and stable version of an image. 

In general if you see an image has an `alpine` tag version available it means it is using the Linux distribution for `alpine` as it's base image. `Alpine` is a small security-focused distribution of Linux. Like **super** small, it's only about 5MB in size. The `alpine` version of images are popular for development because they use less memory. 

## Pulling Images
Good news! You already have experience pulling images from Docker Hub. When running a container you always have to pass an image:

```ssh
 docker container run nginx
```

This command will first search for that image in the local image cache and it doesn't find it, Docker Hub will be searched. You can additionally pull down an image without running a container by using the `docker pull <IMAGENAME>` command. To see a list of all the images currently on your computer use the `docker image ls` command.


## Pushing to Docker Hub

Pushing up Docker Images is just as easy as pushing up to Github. First you must have an account on [Docker Hub][docker-hub]. Then in your CLI can use the command `docker login`, and enter your credentials to log into your Docker Hub account. If you are using a machine you don't trust make sure to use the `docker logout` command at the end of your session. 

Once you've logged in make sure your image is tagged properly, using the format `<USERNAME>/<IMAGENAME>`. Additionally, you can use the `docker image tag <originalImage> <USERNAME>/<originalImage>` command to re-tag pre existing images (even ones that you didn't make). Then you can use `docker image push <IMAGENAME>`. Check out your Docker Hub page and you should see your new image repository! 🌈

### Creating a Private Image Repository
At some point you may find yourself needing to make a private image for work or for your own projects. The easy way to do this is to go onto [Docker Hub][docker-hub] and create and name a private image repository. Then you can tag your image with the same name as the repository you created and use `docker image push`. 

![Private-Repo](https://assets.aaonline.io/Docker/private-repo.png)



[docker-hub]: https://hub.docker.com/
[nginx]: https://hub.docker.com/_/nginx
[priv-nginx]: https://hub.docker.com/r/jwilder/nginx-proxy