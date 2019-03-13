### show a volume
  - show named vs. unnamed volume
  - Host filesystem stores volumes but they are complete managed by Docker in `C:\ProgramData\docker\volumes`
  - any files you put into volume will exist in local file sturcture until you **manually delete** them   
- when you download an image it'll specify any volumes with `docker image inspect`
- you can view with `docker volume ls`
- can inspect with `docker volume inspect ID`
  - since docker is running a VM on mac can't go to actual location 
- can't see from volume perspective which container it's connected to