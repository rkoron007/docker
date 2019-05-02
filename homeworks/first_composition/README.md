# First Composition

Time to take on your first Docker Compose file! You'll be creating a Compose file for the `nginx` Dockerfile we made in Phase 1 of the Dockerfiles Galore project.

Start off by taking a look at the [skeleton][skeleton]. You've already created the `Dockerfile` so all you'll need to do is create a `docker-compose.yml` file so that you can build your custom image and start a container off of it with a single command. If at anytime you are unsure of syntax or would like to see an example the [Docker Compose][docs] documentation is wonderfully thorough.

**Reminder - indentation is how the YAML file formats group information, so indentation is important.** Check our this quick [YAML][yaml] reference if you need it.

You'll start off, as with every Docker Compose file, by specifying the `version` of Docker Compose you'll be using. For this `docker-compose.yml` use version "2". Next you'll be defining your `services` (the containers you'll be running). Create a `service` named `nginx`. Your file should look like this:

```
version: "2"

services:
    nginx:
```

Now you'll need to tell Compose to `build` a custom image for you. Reference the [build documentation][build-docs] if you need any syntax help. Make sure to name the image you'll be building by adding a `image` command below your `build` command. Finally you'll want to tell Docker Compose which ports you want to expose when it creates the container for you. Expose your local port 80 aiming traffic at port 80 in the container.

Awesome! Use `docker-compose up` and when Compose tells you the container is attached try going to `http://localhost:80`.

Awesome - and make sure to check out the color coded logs that Compose provides you for each container. Now cancel out of the server and use `docker-compose down` to have compose automatically stop and remove the container it started up. Nice huh?

What if you wanted to change the html though? Head into the `index.html` we provided and change the text inside of the `h1` tag. What happens if you use `docker-compose up` again? Wait a second....the text doesn't change!

What we've just encountered is a common error with Compose, so common they even warn you about it in the logs:

```
WARNING: Image for service custom-nginx was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
```

If you change your `Dockerfile` or any source code your `Dockerfile` is using in order to build your image you will need to command Compose to rebuild the image for you. Otherwise Compose will use the previous image it built. You can tell Docker Compose to rebuild your image using `docker-compose up --build` or `docker-compose build`. Now let's try using Compose in detached mode: `docker-compose up -d --build` to re-run your `nginx` server and head to `localhost:80` to see your html change.

Good job! Feel free to commit this file to Github for later use. Make sure to use `docker-compose down` to clean up your container, or you could add the `--rmi` to tell Compose to additionally remove the image it built.

So in this homework you've gotten your feet wet using Docker Compose commands to build an image and run a single container - but this is not the most common use case for Docker Compose. Where Compose really shines is running multiple containers and effectively your whole application with a single command. We'll be getting into more complex Compose files in tomorrow's project but for tonight be proud of your first Docker Compose file!

[build-docs]: https://docs.docker.com/compose/compose-file/#build
[yaml]: https://learnxinyminutes.com/docs/yaml/
[docs]: https://docs.docker.com/compose/compose-file/
[skeleton]: https://assets.aaonline.io/Docker/homeworks/first_composition/skeleton.zip
