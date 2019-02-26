# Let's Get Started with Docker!

## Let's Run Some Containers


For each of the following containers make sure you are running `--detach` or `-d` and naming each of them with `--name`. **Remember:** containers cannot listen on the same local ports! 

1. **Run one container with the `nginx` image**
    - Have this container listening on `80:80`
2. **Run one container with the `httpd (apache)` image**
    * You'll find the exposed port within the container yourself for the `httpd` image 
        - Start with looking at the [httpd][httpd] image on DockerHub. There you will find and click a link to the Dockerfile for the latest supported version of this image (which will be tagged `latest`) 
        - Once you've followed the link you will be viewing the Dockerfile, we'll be covering Dockerfiles in a lot more detail tomorrow, but what you are specifically looking in this file is the command [`EXPOSE`][expose]. This is where you will find the port that `httpd` is listening for internally.
        - Once you've found the port `httpd` exposes internally set up your container to run using the `p` flag with a localhost port and the exposed `httpd` internal port. 
3. Run one container with the `mysql` image. 
    -  Have this container listening on `3306:3306`
    * One of the common environmental flag arguments passed to images of databases is the flag to set a password.  
        - For this exercise you'll use the `--environment` or `-e` flag and pass in the password you'd like `mysql` to use when it sets itself up `MYSQL_ROOT_PASSWORD=<your-password>`.

Using `docker container inspect mysql` you should now be able to see the password you set under the "Env" key.

The `nginx` and `httpd` images are built so that if you travel to the exposed port on your local machine you'll be able to see a response.
Check that your `nginx` container is running properly by doing either of the following:

1. `curl localhost:80` in your terminal
2. using your browser to navigate to `http://localhost:80`


Do the same for `httpd` on whatever local port you chose to expose. You should see a message from both of those ports and therefore you'll know your containers are running!

When you run `docker container ls -a` you should see something like this:

```ssh
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                               NAMES
0edb7e43d044        mysql               "docker-entrypoint.s…"   5 seconds ago        Up 4 seconds        0.0.0.0:3306->3306/tcp, 33060/tcp   mysql
d558d946c6a0        httpd               "httpd-foreground"       About a minute ago   Up About a minute   0.0.0.0:8080->80/tcp                httpd
4b76779e1da6        nginx               "nginx -g 'daemon of…"   About a minute ago   Up About a minute   0.0.0.0:80->80/tcp                  nginx
```

### Time to Clean Up
Nice job! Now let's clean all those containers up with `docker container stop` and `docker container rm` (both can accept multiple container names or container `ID`'s)
Use `docker container ls -a` to ensure all your containers have been stopped and removed.

Congrats on booting up your first containers - you are on your way to becoming a part of the Docker community!

[httpd]: https://hub.docker.com/_/httpd
[expose]: https://we-are.bookmyshow.com/understanding-expose-in-dockerfile-266938b6a33d
