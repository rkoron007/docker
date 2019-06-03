# Becoming a Compose Pro

## Overview

In the words of Docker, `Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.` As you learned in the Compose readings you can define a complex stack in one file and have it running with a single command! This would mean you would no longer have to use separate terminal tabs open for running your server and your front end. No more defining containers by hand! The people at Docker choose to call this gift, Docker Compose.

### Workflow:

Using Compose is basically a three-step process.

1. Define your app's environment with a Dockerfile so it can be reproduced anywhere.
2. Define the services that make up your app in `docker-compose.yml` so they can be run together in an isolated environment.
3. Lastly, run `docker-compose up` and Compose will start and run your entire app.

## Phase 1: Flask and Redis

Time to take on your destiny and write some fantastic Docker Compose files! To start off today you'll be taking a very simple Flask and Redis application and creating a compose file to run it locally. Start off by taking a look at the [skeleton][skeleton].

### Docker-Compose File

Our Flask app will contain the following components:

1. The Flask server that accepts user requests and stores the data in Redis.
2. Redis which will be acting as our database.

We've provided you with the `Dockerfile` that will set up the Flask server for you. Now, what we don't want is one container running both our Flask Server and Redis database. Ideally, we want two containers - one for our Flask server, and one for our database.

**Quick Reminder - indentation is how the YAML file formats group information, so indentation is important.** Start by creating a `docker-compose.yml` file. For the rest of this phase this is where you'll be working. As we previous learned `docker-compose` has many versions, for this project you will use version '3'. Take a look at the [Compose documentation][docs] if you need a syntax reference.

Since we have two main parts in the current architecture for our application (server and database) we'll want to run two `services`: one for the Flask server, and one for the `redis` database. Create two `services`, one called `web` and the other called `redis`. For the future, a simple rule of thumb is to **create one service for each image in your application**.

For our `Flask` app we will need to build the image in the `Dockerfile` in order for it to run properly. If you need a reminder on how that is done check out the [Docker documentation][build-docs] on the subject. Indicate to Docker that you want to `build` and make sure to name your image using the `image` command in your `docker-compose.yml`.

Similarly to how we usually run containers - we can set our exposed ports and environment variables for this image. Set the `FLASK_ENV=development` for your environment. For this service you'll also want to expose ports on localhost and within the container on port `5000`.

We won't need to customize the `redis` image - we are just going to use the image straight from Docker Hub. Use the `image` command to use the `redis:4.0.11-alpine` version.

Now try running it! Use the `docker-compose up` command! It'll take a while to build because it has to pull the necessary images and build from the `Dockerfile`.

You'll see the first thing it does is create a new network for you, before beginning to build your image.

```ssh
Creating network "phase1_default" with the default driver
Building web
Step 1/7 : FROM python:3.7.0-alpine3.8
 ---> cf41883b24b8
```

After it has built your image you'll see a message that both of your containers have been started and attached to the network. Then you'll get some colored logs for each container!

```ssh
Creating phase1_web_1   ... done
Creating phase1_redis_1 ... done
Attaching to phase1_web_1, phase1_redis_1
```

You can use `CTRL+C` to exit the logs and you'll see this message as you exit:

```ssh
Stopping phase1_redis_1 ... done
Stopping phase1_web_1   ... done
```

A quick `docker container ls` will confirm that your container are no longer running, but if you do a `docker container ls -a`? Then you'll see your containers there - just stopped. If you try `docker network ls` you'll also see the network that had been automatically created for you is still there too. Let's try that again shall we? Use `docker-compose down` and Docker Compose will take care of removing not only the containers but the network. So kind! Now try running `docker compose up -d` to run compose in detached mode.

**Reminder:** If you did have to change something in your `Dockerfile` and rebuild your image you'd need to make use `docker-compose up --build` or the `docker compose build` command to rebuild the image. Otherwise Compose won't know about it!

Let's try out the Flask app! Head to `http://localhost:5000` and you should see and empty array. Boooring. You could use Postman to test your app or use the below command to send a 'POST' request:

```ssh
curl --header "Content-Type: application/json" \
--request POST \
--data '{"name":"Jake"}' \
localhost:5000
```

You should get a response with the name input. Now head to `http://localhost:5000`. If you see Jake then you've done it!

I'd like to point out something very cool that is going on in the `app.py` file where Redis is being set up. Namely, **containers on the same docker-compose network can refer to each other by service name.** If you look below you'll see where we set up access from the `web` container to the `redis` container. We can use the service name `redis` as our host name to access the running container.

```python
# host="redis" is referring to the name of your service!!
redis = Redis(host="redis", db=0, socket_timeout=5, charset="utf-8", decode_responses=True)
```

As you can see, the value of the host argument is set to `redis`, because the name of the `Redis` service is `redis` in our Compose file. In this way you can easily connect containers to each other with Docker Compose. You can also specify more complex network setups beyond the default network. Make sure you use `docker-compose down` to clean up you containers and networks and don't forget to use Git from now on to commit your Compose files.

Head to the next phase!

[build-docs]: https://docs.docker.com/compose/compose-file/#build
[docs]: https://docs.docker.com/compose/compose-file/
[skeleton]: https://assets.aaonline.io/Docker/projects/compose_pros/skeleton.zip

## Phase 2: Mongo and Node with Compose

For this next phase you'll be creating a `docker-compose.yml` file for a simple Node and Mongo app. Look inside the 'phase2' folder in your skeleton and you can see our application. For this app you’ll create two services: one for the NodeJS application, and one for the MongoDB database. We've provided you with the `Dockerfile` for the custom node image you'll be creating.

For this Compose file set your version to '3.3'. Create two services one called `app` for your Node application, and one called `db` for your Mongo backend. We'll start by filling out the Mongo `db` service.

Set your image for the `db` service to be `mongo:3.0.15`. We'll also want to set up a volume for our database so our data persists between `docker compose up`s. Name your volume `mongo-db` and have it pointing to where the Mongo image keeps it's volumes `/data/db`. Remember that if you have a named volume you have to name it under the `volumes` key both inside and outside the service.

Next we'll want to create a custom network we can reference by name to connect our database and Node app. Under and outside of the `services` instruction create a new line for `networks`. Name your custom network "nodemernapp" and use the default `bridge` driver. It'll look something like this:

```yaml
networks:
  nodemernapp:
    driver: bridge
```

We'll come back to `db` in just a second, but let's start building the `app` service first. If you need a reminder on building images in compose check out the [Docker documentation][build-docs] on the subject. Build a new image based off the `Dockerfile` we provided you. Name the new image `nodeapp`. By default, NodeJS apps run on port 3000, so expose your local port `80` and use port `3000` in the container. Connect the `app` container to the `nodemernapp` network.

Now we'll do the work of connecting the `app` and `db` services. Your `app` service will need to be passed a connection string that it will get from an environment variable called [“MONGO_URI”][uri-mongo]. We can do this easily utilizing Docker's DNS networking abilities. In your `db` service for Mongo we can create a string alias for the network to be used in the `app` service for connection purposes. You `db` networks should look like this:

```yml
services:
  db:
    networks:
      nodemernapp:
        aliases:
          - "mongo_db"
```

Now whenever we refer to "mongo_db" we'll have access to our custom network. Now let's build out our Node service and connect them together!

In your `app` service you'll create an environment variable for `MONGO_URI` which will point to:

```yaml
# mongodb://(the name of our alias)/nameofimage
mongodb://mongo_db/nodeapp
```

Let's test it out! Use `docker-compose up` to start up your containers. Head to `http://localhost:80` and your should see a greeting. Tour around the App and create a couple of users! You should be able to refresh and your users stay right where they are.

To test that your named volume was installed properly use `docker-compose down` and then use `docker-compose up` again. Your users should still exist on your localhost.

Amazing Job! When you are done looking at your work use `docker-compose down -v` to remove your volume, containers and network. Move on to the next phase!

[uri-mongo]: https://docs.mongodb.com/manual/reference/connection-string/

## Phase 3: The Voting App

We will be creating the `docker-compose.yml` file for a Voting Application for the world's toughest question: "cats or dogs?". Users can cast their votes, which will be saved, and admin users can see the votes cast. This is an application based on micro-services architecture, consisting of 5 individually simple services.

![voting-app](https://assets.aaonline.io/Docker/voting.png)

1. **Voting-App:** The frontend of the application written in Python, used by users to cast their votes.
2. **Redis:** The in-memory database, used as intermediate storage.
3. **Worker:** A .Net service, used to fetch votes from Redis and store in a Postgres database.
4. **DB:** A PostgreSQL database, used as the database.
5. **Result-App:** Frontend of the application written in Node.js which displays the voting results.

All of the images you need are on Docker Hub. We will creating the services including exposing ports, volumes, and connecting containers thorough our own networks. Let's get started!

### Services

Start off by defining your Compose version as '3'. You'll be creating 5 separate services and pulling their images from Docker Hub. The **names of these services do matter** for the images, so make sure you use the names for each service as described below. You'll be creating two [custom networks][compose-custom] "frontend" and "backend".

[compose-custom]: https://docs.docker.com/compose/networking/#specify-custom-networks

### Breakdown of the Five Services

**Service One: vote**

- The frontend of the application written in Python
- The image will be `dockersamples/examplevotingapp_vote:before`
- The locally exposed port should be `5000`.
  - The container's internally exposed port should be `80`
- On the frontend Network

**Service Two: redis**:

- The in-memory key/value storage for incoming votes
- The image will be `redis:3.2`
- No exposed ports
- On the Frontend Network

**Service Three: worker**

- Used to fetch votes from Redis and store in a Postgres database.
- The image is `dockersamples/examplevotingapp_worker`
- No public ports
- On both the frontend and backend networks

**Service Four: db**

- The database, enough said.
- The image will be `postgres:9.4`
- One [named volume][named-v] will be needed, pointing to `/var/lib/postgresql/data` in order to persist data.
- On the backend network

**Service Five: result**

- The node web app that shows results to administrators
- The image is `dockersamples/examplevotingapp_result:before`
- Run this service with the local port of 5001, and the container listening on 80
- On the backend network

Now try it all together! Run `docker-compose up`. Notice that when you specify custom networks Docker Compose doesn't automatically make a network for you, it just makes the networks you specified:

```
Creating network "phase_frontend" with the default driver
Creating network "phase_backend" with the default driver
```

If you use `docker compose down`, then `docker compose up -d` you actually be able to look at the containers running with `docker container ps`. You can also see the networks that compose created for you using `docker network ls`. Go to `http://localhost:5000` and you should be able to vote for either "dogs" or "cats". Once you've cast your vote refresh and make sure your vote persisted. Now checkout `http://localhost:5001` and you'll see the `result` service at work as your can look on the number of votes and who voted for what.

Awesome job! After you've debated about "cats vs. dogs" in your heart move onto the next phase.

[named-v]: https://docs.docker.com/compose/compose-file/#short-syntax-3

## Phase 4: Build Your Own Dockerfile and Compose File

One of the best things about Docker is that you can work with unfamiliar technologies super easily because you don't have to spend hours setting up a development environment. For this next phase we'll be using a service called [Drupal][drupal] a free and open-source content-management framework written in PHP. So even though you've probably never worked with Drupal you can have it up and running quickly.

We'll write a custom `Dockerfile` and start your app with Docker Compose. When configured properly, this will let you build a custom image and start everything with `docker compose up` including storing important `db` and `config` data in volumes so the site will remember your changes across Compose restarts.

[drupal]: https://hub.docker.com/_/drupal/

### Part A: Dockerfile

For this first part, we will be:
1. Creating a custom `Dockerfile` for the `drupal` image
2. Downloading and then using `Git` to install a custom Drupal HTML theme([Bootstrap][bootstrap]).

Start by creating a `.dockerignore` and ignoring the usual things. Then create a `Dockerfile` that will be built from `drupal:8.6`. Now we know we'll need to install Git for the next part but the `drupal:8.6` image doesn't currently have it - meaning we'll need to download it!

Start off by using `RUN` to run the `apt` package manager command to install git: `apt-get update && apt-get install -y git`. Whenever you download anything inside a docker container the installation will almost always leave a lot of extra files which we won't want in our image. Clean up after your installation by adding the command `rm -rf /var/lib/apt/lists/*`. Make sure to use `\` and `&&` properly! Take a look back at the Dockerfile docs if you need a reminder on syntax.

Next step is to change your working directory(`WORKDIR`) within the container to access where Drupal keeps the html templates - `/var/www/html/themes`. Then use git to clone in our chosen theme using the command:

```ssh
git clone --branch 8.x-3.x --single-branch --depth 1 https://git.drupal.org/project/bootstrap.git
```

**Note:** The reason we are telling git `--single-branch --depth 1` is because we only want the most recent version of this one branch. This saves you a **ton** of time over downloading all the branches so it's a handy way to avoid extra bloat in your image.

Now we just need to solve one last problem. Something you might encounter while working with Docker is having to sometimes [change file permissions][file-permissions]. The files we just used Git to download have been put in the directory under the ownership of `root`. However the `drupal` image is expecting all the files it will be running to be under the ownership of the `www-data` user. Meaning we will need to **change the permissions** of these files.

We will use [`chown`][chown] command to change the file ownership of these permissions.  Chain the following command to the last `RUN` statement in your Dockerfile - `chown -R www-data:www-data bootstrap`. When you use `chown -R` you are saying you want to change the owner for all files (including directories) - which will allow `drupal` to access all the files in the `bootstrap` directory properly.

Nicely done! Now let's build it up using Compose.

[chown]: https://linux.die.net/man/1/chown
[bootstrap]: https://git.drupalcode.org/project/bootstrap
[file-permissions]: https://www.hostingadvice.com/how-to/change-file-ownershipgroups-linux/

### Part B: Compose File

So now we will build our custom `drupal` image in a `docker-compose.yml`. This Compose file will be pretty basic so use version '2'. We'll be using one custom Drupal service and one PostgreSQL service.

Build the custom Drupal image using the `Dockerfile` you previously created, and name it `<yourusername>/custom-drupal`. Expose your local port `8080` pointing at port `80` in the container.

For the PostgreSQL service, you'll be using both an environment variable and a volume. Use the image for `postgres:9.6` and set your environment variable for the database password using `POSTGRES_PASSWORD`. Add a named volume for `drupal-data:/var/lib/postgresql/data` so the database will persist across Compose restarts.

### Part C: Putting it Together

Use the `docker-compose up -d` command to start your application. Head to `http://localhost:8080` and you'll see this nice UI to configure `drupal`. At this point all we want to know is if the `HTML` Bootstrap theme we downloaded in our custom `Dockerfile` is available. Click the obvious options, and use the "simple" profile, until you get to the `database` setup page.

Here select `PostgreSQL` because that is obviously what you are using. Now the following list corresponds directly to what you used in your `docker-compose.yml`.

1. `database name` - since we didn't specify the default name is 'postgres'.
2. `Database password` - will be what you set the postgres password environment variable to
3. `Database username` -  defaults to `postgres`
4. Click `Advanced Options` - here the **host** name will be the **name of your postgres service**.

Next drupal will build your site, which will take a moment. On the next page you'll encounter a 'configure site' page which you can just fill in with whatever you please since you won't be checking this site in the future (the email boxes will need an `@` sign). After that you should have access to the main Drupal service.

When the website comes up, click on `Appearance` in the top bar, if you see a theme called `Bootstrap` then we are successful! That was the theme you were attempting to import! That's the one we added with our custom Dockerfile.

Click `Install and set as default`. Then click `Back to site` (in the top left) and the website interface should be different. You've successfully installed and activated a new theme in your own custom image without installing anything on your host other then Docker! If you exit (ctrl-c) and then `docker-compose down` it will delete containers, but not the volumes, so on next `docker-compose up` everything will be as it was. To totally clean up volumes, add `-v` to the `down` command.

Now you have all the tools you need to host your own projects locally! Make sure to add the images you built to Docker Hub, and commit the Compose files you made to Github.

[build-docs]: https://docs.docker.com/compose/compose-file/#build

## Bonuses A: Add Health Checks!

Show how devoted you are to good testing by adding [health checks][health] to all the `docker_compose.yml` files you've written today. Make sure your helath checks work and everything still runs properly.

[health]: https://docs.docker.com/compose/compose-file/#healthcheck

## Bonuses B: Kubernetes Tutorial

Follow this awesome [Kubernetes Tutorial][kubernetes] to start learning about one of the most supported orchestration platforms. Kubernetes is a **very** popular choice for companies looking to deploy containerized applications onto a cluster. Be the best developer you can be by learning about how to scale deployments!

[kubernetes]: https://kubernetes.io/docs/tutorials/kubernetes-basics/
