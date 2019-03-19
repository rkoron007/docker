## Main Goals:

- Defining the problem of persistent data
- Key concepts with containers: immutable, ephemeral
- "immutable infrastructure": only re-deploy containers, never change
- This is the ideal scenario, but what about databases, or unique data?
- Volumes: make special location outside of container UFS 
-  Bind Mount: link container path to host path

### show a bind mount
- used at runtime
  - maps host file to container file
  - link container path to host path 
  - two locations pointing to the same file on phyiscal disk
  - use $(pwd):usr/share/nginx/html nginx


docker container run -d --name nginx -p 80:80 -v "$(pwd)":/usr/share/nginx/html nginx 
 docker container run -d -p 80:80 \
  --name nginx \
  --mount type=bind,source="$(pwd)",target=/usr/share/nginx/html \
  nginx

docker container run -d --name nginx2 -p 8080:80 nginx

docker container exec -it nginx bash

look into '/usr/share/nginx/html' - cat your index.html

docker container exec -it nginx2
look into '/usr/share/nginx/html' - cat your index.html