## Docker Networks

## Main Concepts
- Each container you boot up is connected to a private virtual network "bridge"
- Each virtual network routes through NAT firewall on host IP
- You must manually expose ports via -p, which is better default security! 
- DNS for friendly names is built-in if you use custom networks 
- All containers on a virtual network can talk to each other without -p
- Best practice is to create a new virtual network for each app(we'll talk more about this in Docker Compose):

docker network ls

docker network inspect bridge

docker network ls

docker network create my_app_net

docker network ls

docker cdocker cn network create --help

docker container run -d --name new_nginx --network my_app_net nginx:alpine
docker container run -d --name my_nginx --network my_app_net nginx:alpine

docker container exec -it my_nginx ping new_nginx

docker container exec -it new_nginx ping my_nginx

docker network ls

docker network inspect my_app_net