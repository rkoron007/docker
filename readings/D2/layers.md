## Peeling back the Layers


## Image Commands
Every image on the lowest level starts with a first blank layer called 'scrap'. Every set of changes that occurs in the filesystem in the image after that is recorded in a **layer**.  Using the `docker image history <IMAGENAME>` will show you the history of an image's layers. 



```sh
~ docker image history nginx   
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

## Image Layers