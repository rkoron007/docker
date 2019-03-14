## Learning Goals:
- Also override with docker run -v /path/in/container
- Bypasses Union File System and stores in alt location on host 
- Includes it's own management commands under docker volume
- show named vs. unnamed volume

### show a volume
  - Host filesystem stores volumes but they are complete managed by Docker in `C:\ProgramData\docker\volumes`
  - any files you put into volume will exist until you **manually delete** them   
- when you download an image it'll specify any volumes with `docker image inspect`
- you can view with `docker volume ls`
- can inspect with `docker volume inspect ID`
  - since docker is running a VM on mac can't go to actual location 
- can't see from volume perspective which container it's connected to

docker pull mysql

docker image inspect mysql

docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True mysql

docker container ls

docker container inspect mysql

can't see from volume perspective which container it's connected to:
docker volume ls

docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v mysql-db:/var/lib/mysql mysql

docker volume ls

docker volume inspect mysql-db

docker container rm -f mysql

docker container run -d --name mysql3 -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v mysql-db:/var/lib/mysql mysql

docker volume ls


docker container inspect mysql3

docker volume remove mysql-db