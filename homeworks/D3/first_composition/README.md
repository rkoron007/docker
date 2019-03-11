# First Composition

Time to take on your first Docker Compose file! Today you'll be taking a very simple Flask and Redis application and creating a compose file to run it locally.  Start off by taking a look at the [skeleton][skeleton]. 

## Docker-Compose File
Our Flask app will contain the following components:

1. The Flask server that accepts user requests and stores the data in Redis.
2. Redis which will be acting as our database.

As we covered before, we don't want one container running both Python and Redis. Each container should be in charge we don't want to have both our Flask Server and our Redis database running in one container. We've provided you with the `Dockerfile` that will set up the Flask server for you. Create a `docker-compose.yml` file. For the rest of this homework this is where you'll be working. As we previous learned `docker-compose` has many versions, for this project you will use version '3'. Take a look at the [compose documentation][docs] if you need a syntax reference.

Since we have two main parts in the current architecture for our application (server and database) we'll want to run two `services`: one for the Flask server, and one for the `redis` database. Create two `services`, one called `web` and the other called `redis`. For the future, a simple rule of thumb is to create one service for each image in your application.

For our `Flask` app we will need to build the image in the `Dockerfile` in order for it to run properly. Check out the reading on build images, or the [Docker documentation][build-docs] on the subject. Indicate to Docker that you want to `build` and make sure to name your image using the `image` command in your `docker-compose.yml`. 

Similarly to how we usually run containers - we can set our exposed ports and environment variables for this image. Set the `FLASK_ENV=development` for your environment. Make sure the image you built is accessible on localhost and within the container on port `5000`. 

We won't need to customize the `redis` image - we are just going to use the image straight from Docker Hub. Use the `image` command to use the `redis:4.0.11-alpine` version. 

Now try running it! Use the `docker-compose up` command! It'll take a while to build because it has to pull the necessary images and build from the `Dockerfile`. 

You'll see the first thing it does is create a new network for you, before beginning to build your image.

```ssh
Creating network "skeleton_default" with the default driver
Building web
Step 1/7 : FROM python:3.7.0-alpine3.8
 ---> cf41883b24b8
```

After it has built your image you'll see a message that both of your containers have been started and attached to the network. Then you'll get some colored logs for each container! 

```ssh
Creating skeleton_web_1   ... done
Creating skeleton_redis_1 ... done
Attaching to skeleton_web_1, skeleton_redis_1
```

As fun as seeing all those logs is, maybe you want that terminal tag back to test your setup? You can use `CTRL+C` to exit the logs and you'll see this message as you exit:

```ssh
Stopping skeleton_redis_1 ... done
Stopping skeleton_web_1   ... done
```
A quick `docker container ls` will confirm that your container are no longer running but if you do a `docker container ls -a`? Then you;ll see your containers there - just stopped. If you try `docker network ls` you'll also see the network that had been automatically created for you is still there too. Let's try that again shall we? Use `docker-compose down` and Docker Compose will take care of removing not only the containers but the network. So kind! Now try running `docker compose up -d` to run compose in detached mode.

**Note:** If you did have to change something in your `Dockerfile` and rebuild your image you'd need to make use to use `docker-compose up --build` or the `docker compose build` command to rebuild the image. Otherwise Compose won't know about it!

Let's try out the Flask app! Head to `http://localhost:5000` and you should see and empty array. Boooring. You could use Postman to test your app or use the below command to send a 'POST' request:

```ssh
curl --header "Content-Type: application/json" \
--request POST \
--data '{"name":"Jake"}' \
localhost:5000
```

You should get a response with the name input. Now head to `http://localhost:5000`. If you see Jake then you've done it!

I'd like to point out something very cool that is going on in the `aap.py` file where Redis is being set up. Namely, **containers on this same docker-compose network can refer each other by service name.**Meaning below where we set up access from the `web` container to the `redis` container we can use the service name `redis` as our host name to access the running container. 

```python
redis = Redis(host="redis", db=0, socket_timeout=5, charset="utf-8", decode_responses=True)
```

As you can see, the value of the host argument is set to `redis`, because the name of the `Redis` service is `redis` in our Compose file. In this way you can easily connect containers to each other with Docker Compose. You can also specify custom, more complex network setups beyond the default network. We'll be getting into that more in tomorrow's project but for tonight be proud of your first Docker Compose file!

[build-docs]: https://docs.docker.com/compose/compose-file/#build

[docs]: https://docs.docker.com/compose/compose-file/


<!-- PUT IN SKELETON -->
[skeleton]:

