## Part Two: Build an Image and Dockerhub (10 minute video)
  - have a dockfile ready to go build it, and talk about intermediate images
  - push and pull an image from Dockerhub
  - show the image build cache
  - Basics of Docker Hub (hub.docker.com)
  - Find Official and other good public images
  - Download images and basics of image tags
  - inspect and image and it's layers
  - The Latest Tag 

 ## Images Created us

# DockerTagging
docker login

docker image pull nginx
docker image tag nginx rkoron/nginx
docker image push rkoron/nginx


show them the file and the Dockerfile
docker build . -t rkoron/flask-server

docker container run -p 80:5000 --name flask -d rkoron/flask-server

docker image history rkoron/flask-server

docker image inspect rkoron/flask-server

docker image push rkoron/flask-server

docker image rm rkoron/flask-server

docker container run -p 80:5000 --name flask -d rkoron/flask-server

docker image history rkoron/flask-server