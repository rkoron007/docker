# Hosting using Docker and Heroku

Now that you've created your images and can run your project locally it's time to use Heroku to host your images. For this purpose we'll be using the [`heroku container registry`][container]. Before getting started we'll quickly talk about the difference between Heroku and Docker and what the Heroku Container Registry is actually doing for you.


## Heroku and Docker: Similar Concepts

One of the major differences between Heroku and Docker is that Heroku abstracts the container away from the user and puts a sandbox up around what it can do. Heroku runs on `dynos` which can be described as a lightweight containers running a single command. Instead of a `Dockerfile` Heroku uses BuildPacks. When you run a build on Heroku, the BuildPack creates a `Slug`. A slug is similar to an image, in that it contains all the dependencies and can be deployed and starts up very quickly.

So you run your BuildPack and get a `slug`, and that `slug` can then be run on a `Dyno`. These are all very familiar concepts by now - your `Dockerfile` builds an `image` which can be run on a `container`. The biggest difference is Docker is open source and great for local development whereas Heroku is primarily a commercial service provider. For our purposes we'll be deploying our own images to Heroku's `dyno`s in order to run your application.

## Hosting Using the Container Registry

The Container Registry will allow you to deploy your Docker images on to Heroku's `dyno`s. You'll deploy each of your custom images to a separate container on Heroku and those containers will together build your application. The steps to pushing up your image to Heroku will be different depending on the application you are trying to push up but we'll be covering your basic Heroku flow in this reading.

If you've previously pushed your project to Heroku the first thing decision you'll have to make is whether you'd like to create a new Heroku project or utilize your preexisting one to use Docker instead. Once you deploy your application via the Heroku Container Registry, the stack is set to container. Meaning your application is no longer using a Heroku-curated stack, but instead using your own custom containers(`dyno`s). Using your own containers means that pushing your app via `git` will now be disabled. If you no longer wish to deploy your app via the Container Registry, you can undo this by running `heroku stack:set heroku-16`. 

After that decision is made you can use the Heroku CLI with the command `heroku container:login` to log into the container registry. (If you receive an error you might have to add the container registry plugin by running `heroku plugins:install heroku-container-registry`). 

At this point the next step is to push your custom image(s). Before you do so we recommend reading [this list][heroku-docker] of things you will need to setup in order to use Docker in production on Heroku. (Pay close attention to the `$PORT` section because this will be how you connect your database to your application). For a current list of `Dockerfile` commands not currently supported in Heroku see [here][dockerfile-heroku].

Now let's talk about pushing up your images! If you have one `Dockerfile` you can use `heroku container:push <process-type> (web, frontend, etc.)`. This command will build your image from a file in the current directory named `Dockerfile` and will push that image to the container registry. 

If you have multiple services (Rails and React for example) you'll need two `Dockerfile`s. The naming format would as follows:

```ruby
ls -R

# Main Directory for the Rails Application (web is the default name for the service receiving HTTP requests)
Dockerfile.web

# /frontend - give your Dockerfile endings meaningful names
Dockerfile.frontend
```

Then to build all of your images for Heroku you would run `heroku container:push --recursive` in the root directory of your project. This will build and push all the images necessary for your project to the container registry. The next step is to [release][release] your images using `heroku container:push release`. If you are using multiple images you will have to specify the names of the images to be released (these will be the endings on the Dockerfiles you've just built). Using the above example of two Dockerfiles named `Dockerfile.web` and `Dockerfile.frontend` you would run the command `heroku container:release web frontend` to release both images after they had been previously built and pushed.

Now if you have a database, or require an extra service like `redis`, for your project you'll add it on as a Heroku [add-on][addons]. For example if I wanted to add a PostgreSQL database to my application I would go to the page for that add-on and then use the Heroku CLI to add it to my application `heroku addons:create heroku-postgresql`. Once you've setup your database if things don't look quite right you can always check out the `heroku logs` and reiterate through the `heroku container:push` and `heroku container:push release` phases until everything is configured properly. Make sure to use `heroku run` to run all your normal setup commands for a new project(such as seeding, setting up any secrets within the Heroku config, or any other configuration needed).

Once everything is done view your beautiful project and give yourself a huge pat on the back!!

[container]: https://devcenter.heroku.com/articles/container-registry-and-runtime
[release]: https://devcenter.heroku.com/articles/release-phase
[heroku-docker]: https://devcenter.heroku.com/articles/container-registry-and-runtime#dockerfile-commands-and-runtime
[dockerfile-heroku]: https://devcenter.heroku.com/articles/container-registry-and-runtime#unsupported-dockerfile-commands
[addons]: https://elements.heroku.com/addons