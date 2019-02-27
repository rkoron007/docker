## Where to Find Images

[DockerHub][docker-hub] is the best place to find Official and public images for your development purposes. There are many thousands of images to be found on DockerHub (especially for large scale images like `Ubuntu` or `Node`). 


### Official Images vs. User Made Images 
Official images will be denoted as such on their image page like the one here for [nginx][nginx]. You will most often be working with official images because they are well maintained, have good documentation, use good practices, and are kept up to date. Official images are also usually maintained by the software teams who created the official software the image is based on. [Here][official-images] is a list of all the Official Images available on DockerHub.

Another kind of Image you will see on DockerHub is a user made image. These images will follow the naming pattern of `<USERNAME>/ImageName` like the image found [here][user-image]. Just like with `Github` or `npm` libraries, a good indication of the quality of an user made image is the number of stars and pulls for that image. User created images will usually have a link to the Dockerfile the user used to create the image and information about the user who created the image. We will be creating our own images very soon! 

[official-images]: https://github.com/docker-library/official-images/tree/master/library
[user-image]: https://hub.docker.com/r/jwilder/nginx-proxy

#### Versions
The first thing you'll usually see on a the DockerHub repository for an Official image is versioning for that image. As an image gets updated overtime newer versions of that image will come out. The important thing to know is that when working in production you **always** want to specify which exact image version you are using (`1.11.9` vs `1.11`). You will rarely want an image to update automatically, so using a consistent image version will help keep code compatibility issues to a minimum. 

#### Tags

A tag serves to map a descriptive, user-given name to any single image ID. An image name suffix (the name that comes after the `:`) is often referred to as a tag as well, though it strictly refers to the full name of an image. (Example: `node:8.15-alpine` the `8.15-alpine` is the version, then the tag for that version). Tag names should be limited to the set of alphanumeric characters `[a-z, A-Z, 0-9]` and punctuation characters `[._-]`. Tag names also **MUST NOT** contain a `:` character.

**Note**: The `latest` Tag is the default tag applied if you do not define one in your `docker pull <IMAGENAME>` command. It is usually the most recent and stable version of an image. 

In general if you see an image has an `alpine` tag version available it means it using the Linux distribution for `alpine` as it's base image. Remember that `Alpine` is an incredibly small distribution of Linux. The `alpine` version of images are popular for development because they take up less memory. 



[docker-hub]: https://hub.docker.com/
[nginx]: https://hub.docker.com/_/nginx
[priv-nginx]: https://hub.docker.com/r/jwilder/nginx-proxy