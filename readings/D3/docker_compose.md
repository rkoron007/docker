## Docker Compose
Now that we have started publishing images to Docker Hub, let’s put them to good use. By this point you are probably tired of setting up individual Docker Containers and images. Docker provides an intuitive CLI/terminal tool for setting up an application to use images with committable configuration, which in the case of Docker Compose are referred to as compose files. Docker-compose is a Python-based tool provided by Docker that implements the definition file for a given service using one or a set of containers, networking, and configuration through a `docker-compose.yml` file.

As an example, if we wanted to use our image running redis as an external dependency for a new Node project, we have the option of building an image that includes Redis and the Node runtime with our app or running multiple containers each with a single purpose, one as our database and one as our app. In this case we can start multiple containers that together consist of our application and its dependencies rather easily with Docker Compose. These containers can then connect to each other using networking.

We can define this in a docker-compose using readily available images in Docker Hub or the image we just published:


You can then spin up such containers and their dependencies using:

docker-compose up
Or we can define the build process of a Node app in a Dockerfile:


And run said app:

docker-compose run app npm start
Note it’s up to you to write and run an app using Docker Compose. But we’ve already prepared an example here that also demonstrate the basics of networking setup by Docker Compose. Note that, Docker Compose is shipped by default on Docker for Mac.