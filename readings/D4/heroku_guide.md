# Hosting using Docker and Heroku

For hosting we'll be using the [`heroku container registry`][container]. 

<!-- adding database and what this is doing -->


The Registry will allow you to deploy your Docker images on Heroku. You'll deploy each of your custom images to a separate container on Heroku and those containers will together build your application. The steps to pushing up your image to Heroku will of course be different depending on the application you are trying to push up but we'll be covering your Heroku basic flow in this reading.

If you've previously pushed your project to Heroku the first thing decision you'll have to make is whether you'd like to create a new Heroku project or utilize your preexisting one to use Docker instead. Once you deploy your application via the Heroku Container Registry, the stack is set to container. Meaning your application is no longer using a Heroku-curated stack, but instead using your own custom containers. Using your own containers means that pushing your app via `git` will now be disabled. If you no longer wish to deploy your app via Container Registry, you can undo this by running `heroku stack:set heroku-16`. 

After that decision is made you can use the Heroku CLI with the command `heroku container:login` to log into the container registry. (If you receive an error you might have to add on the container registry plugin using `heroku plugins:install heroku-container-registry`). 

At this point the next step is to push your custom image(s). Before you do so we recommend reading [this list][heroku-docker] of things you will need to setup in order to use Docker in production on Heroku. (Pay close attention to the `$PORT` section because this will be how you connect your database to your application). For a current list of `Dockerfile` commands not currently supported in Heroku see [here][dockerfile-heroku].

Now let's talk about pushing up your images! If you have one `Dockerfile` you can use `heroku container:push <process-type> (web, frontend, etc.)`. This command will build your image from a file in the current directory named `Dockerfile` and will push that image to the container registry. 

If you have multiple services (Rails and React for example) you'll need two `Dockerfile`s. The naming format would as follows:

```ruby
ls -R

# Main Directory for the Rails Application
Dockerfile.web

# /frontend - give your Dockerfile endings meaningful names
Dockerfile.frontend
```

Then to build all of your images for Heroku you would run `heroku container:push --recursive` in the root directory of your project. This will build and push all the images necessary for your project to the container registry. The next step is to [release][release] your images using `heroku container:push release`. If you are using multiple images you will have to specify the names of the images to be released (these will be the endings on the Dockerfile you've just built). Using the above example of two Dockerfiles named `Dockerfile.web` and `Dockerfile.frontend` you would run the command `heroku container:release web frontend` to release both images after they had been previously built.

Now if you have a datbase for your project you'll add it on as a Heroku [add-on][addons]. For example if I wanted to add a PostgreSQL database to my application I would go to the page for that add-on and then use the Heroku CLI to add it to my application `heroku addons:create heroku-postgresql`. 



[container]: https://devcenter.heroku.com/articles/container-registry-and-runtime
[release]: https://devcenter.heroku.com/articles/release-phase
[heroku-docker]: https://devcenter.heroku.com/articles/container-registry-and-runtime#dockerfile-commands-and-runtime
[dockerfile-heroku]: https://devcenter.heroku.com/articles/container-registry-and-runtime#unsupported-dockerfile-commands
[addons]: https://elements.heroku.com/addons