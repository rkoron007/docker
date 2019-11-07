# Creating a Dockerfile for Your Project

**You will be expected to deploy both your Full Stack Project and your MERN
stack projects onto Heroku using Docker.**

Now you'll be putting your new found skills to the test by creating a Dockerfile
for each of the images you'll be needing to run your own projects. You might be
tempted to build one mega image with all of your services and code inside of it
but that defeats the whole purpose of the container model. Meaning you'd have
slow image building, slow image pushing and pulling, and lower efficiency in
running your code locally and in production.

Since each container you are running should only have one single thing it is in
charge of, a good rule of thumb is to have one image for each service your
application will need. For example: if you have a Rails, React, and PostgreSQL
application then you'd have one container running Rails, one running Node to
interpret JavaScript, and one container running PostgreSQL. In that scenario
you'd create a `Dockerfile` for your Rails service **and** a `Dockerfile` for
your React service, and just use the base image for Postgres.

When decided which parts of your application need a custom image think about
whether that service relies on any custom setup. An example of a service that
wouldn't require a custom image is a database. For pretty much all of your
purposes the basic database image will provide everything you need. If you need
to have your code interpreted in any way you'll be building a custom image with
a `Dockerfile`.

Check out the documentation on [Dockerfile building][build] and best Dockerfile
[practices][practice]. If you need examples of Dockerfiles feel free to look
back over the readings and the projects where you utilized them. The internet
will be your best friend in creating your `Dockerfile` but below we have a list
of best practices you'll want to adhere to:

1. Always use the proper base image
   - For example: don't use `ubuntu` as your base image if all you need is
     `node`
   - use the `alpine` tagged version if possible to have a much smaller overall
     image
2. Always write a `.dockerignore`
3. Each container should do one thing - don't try to run everything in one
   container
4. Don't create unnecessary layers (merge multiple RUN commands into one)
5. Do not use 'latest' base image tag (match the version to your local version)
6. Remove unneeded cached files after each RUN step (if installing packages make
   sure to clean up)
7. Utilize the `CMD` instruction to give a command that will run every time a
   container is run based off this image ('npm start', 'node server', etc.)
8. Put lines that will frequently change as low as possible in your Dockerfile
   for more efficient building
9. Specify all your default environment variables, exposed ports and volumes
10. Add a Container `HEALTHCHECK` to ensure your containers are not only
    running, but healthy.

You got this! Once your `Dockerfile` is complete the best way to test it is to
create a `docker-compose.yml` to run all your services at once with minimal
trouble! The Docker documentation has [examples][compose] of how to use Compose
with different frameworks. One last thing - don't forget to push your custom
built images up to [Docker Hub][dh]!

## Examples of Dockerfiles for Different Frameworks

- [Node](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [React](https://github.com/StephenGrider/docker-react)
- [Rails](https://docs.docker.com/compose/rails/)
- [Flask](https://medium.freecodecamp.org/how-to-develop-a-flask-graphql-graphene-mysql-and-docker-starter-kit-4d475f24ee76)

[build]: https://docs.docker.com/engine/reference/builder/
[practice]:
  https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
[dh]: https://hub.docker.com/
[compose]: https://docs.docker.com/compose/samples-for-compose/
