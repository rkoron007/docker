# Building Images in a Compose File

Compose can also build custom images for you. Below is an example of Compose being used with image building: 

```yml
version: '3'
services:
  webapp:
    #  the build command tells compose it's building this image
    build: 
        # Will build in the current directory   
        context: .
        dockerfile: whateverthenameis.Dockerfile
        #  by passing a name here you are telling compose to name and tag the built image by this name
    image: whateverImage:whatevertag
    ports: 
        - '80:80'
```

The first time the `docker-compose.yml` file is run the image will be built on the `docker-compose up` command.  However, if you change the `Dockerfile` for that image and use `docker-compose up` again Docker Compose won't know the image has changed. You will need to to tell Compose to explicitly rebuild the image by using the `docker-compose up --build` or the `docker-compose build` command. 