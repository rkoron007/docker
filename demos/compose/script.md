## Docker Compose Script
1. Why: configure relationships between containers
1. Why: save our docker container run settings in easy-to-read file
1. Why: create one-liner developer environment startups 

- services - create a docker compose file with two different containers running
  - show that they are colored are colored auto based on which container responds
  - use `d` to run in the background
  - `docker-compose logs`
  -can still use `docker-compose ps` and `docker compose top`
- Go over Compose locally
- have a compose file up
- build an image in that compose file
- show the volume persisting
- use `docker compose up -d` 
- use `docker compose up` and `down`
- talk about it crafting a network for you
- DNS resolution - since all these containers are on the same network you have resolution to the name of the service. 

docker-compose up

docker-compose up -d

docker-compose logs

docker-compose --help

docker-compose ps

docker-compose top

docker-compose down