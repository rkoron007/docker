## Pushing to Heroku Example: Using Rails and React

In this demo we'll be walking through how we Docker-ized an application and then
deployed that application to the Heroku Container Registry. The application
we'll be using for this demo will look pretty familiar - it's
[Pokedex][pokedex](click here to download and view the files we wrote)! We'll
walk through how we created a Dockerfile for the two main services in our
application (Rails and React) and what configuration changes we ended up making
along the way.

[pokedex]:
  https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Docker/demos/pushing_to_heroku/pokedex.zip

## Running the Application Locally Using Docker

### Rails Dockerfile

We'll start by building the Dockerfile for the Rails side of things. We used
this [docker-compose][docker-c] guide to as our starting point to building a
Rails Dockerfile.

The first thing we did was create a new file named `entrypoint.sh` to fix a
Rails-specific Docker issue that prevents the server from restarting when a
`server.pid` file exists:

```sh
#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
# If Rails sees another server.pid it will think another Rails server is already
# runnning and will terminate.
rm -f server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
```

Then we went had to change our database configuration to make sure it would hook
up to the Postgres database we will later be defining in our `docker-compose`
file:

```yml
# config/database.yml
default: &default
  adapter: postgresql
  encoding: unicode
  # Here we make sure we can pass the connection URL for the database
  url: <%= ENV['DATABASE_URL'] %>
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: pokedex_development

test:
  <<: *default
  database: pokedex_test

production:
  <<: *default
  adapter: postgresql
  host: db
  username: postgres
  # we don't need to specify a password
  password:
```

Now we'll want to make sure we include a `.dockerignore` to make sure we don't
include any unnecessary files in our images:

```ruby
# We don't want our entire .git history in the image we are building
.git

# you usually don't want the dockerfile or the compose files in the image either
*docker-compose*
Dockerfile

# for Node.js apps, you want to build the node_modules in the image -> not copy from host
node_modules

# Ignore the bundler config.
/.bundle

# Ignore all logfiles and tempfiles.
/log/*
/tmp/*
!/log/.keep
!/tmp/.keep

# Ignore our byebug history and extra logging files
.DS_Store
npm-debug.log
.byebug_history

# We want to generate our own bundle not use any pre-existing bundles
bundle.js
bundle.js.map


# Ignore master key for decrypting credentials and more.
/config/master.key
```

Finally we created our `Dockerfile`. We used a multi-stage build in order to
first bundle our React assets before moving on to build our Rails application.
Take a look at the comments below and then we will walk through how it works:

```dockerfile
# PHASE ONE:
# Here we are compiling our frontend assets
# Since we only need need Node for generating our bundle
# we will use a multi-stage build to keep our image small

# The below layers will NOT be included in the final image

# setting up our image aliased as build
FROM node:12.2.0-alpine as build

# set working directory inside node
WORKDIR /usr/src/node_app

# environment vars must be included in dockerfile
ARG NODE_ENV=production

# Add our node modules to our path
ENV PATH /usr/src/node_app/node_modules/.bin:$PATH

# copy over our package.json
COPY package.json /usr/src/node_app/package.json

#  install dependencies silently so we don't have to
#  watch the whole thing download every time
RUN npm install --silent

# Copy over the rest of our file so webpack will be able bundle it
COPY . /usr/src/node_app

# this is the most important line of this build process!
# this is where we will create our bundle files that we will copy over later
RUN npm run postinstall
# npm run postinstall will run the command: "webpack --mode=production"


# PHASE TWO:
# this will be the actual base image of the image we are building
# We are going from the alpine version of ruby to save space
FROM ruby:2.5.5-alpine3.9

# We tell the image `--no-cache` so we don't
# clog up our image with the things we are downloading
RUN apk add --no-cache --update build-base \
  linux-headers \
  git \
  postgresql-dev \
  nodejs \
  tzdata


# environment vars must be included in the dockerfile
ARG DATABASE_URL="postgres://postgres@db"
ARG RAILS_ENV=production

# copy over our Gemfile
WORKDIR /my_app
COPY Gemfile /my_app/Gemfile
COPY Gemfile.lock /my_app/Gemfile.lock

# We gem install bundler for a specific issue with bundler 2.0
# then we can bundle install
RUN gem install bundler && bundle install
COPY . /my_app

# Here is where that build stage from earlier comes in. We don't need all the
# Javascript dependencies just the bundle files! So we will copy those over into
# our final image
COPY --from=build /usr/src/node_app/app/assets/javascripts/bundle.js ./app/assets/javascripts/
COPY --from=build /usr/src/node_app/app/assets/javascripts/bundle.js.map ./app/assets/javascripts/

# Add a script to be executed every time the container starts.
# This script will take care of a Rails specific Docker issue with the server
# not starting
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# Expose our port
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
```

Since our Rails application only needs Node in order to bundle our dependencies
we use a multistage build to first build our `bundle.js` and our
`bundle.js.map`. The majority of the layers in Phase One will not be included in
our final image (just the `bundle.js` and the `bundle.map.js`).

Once we start Phase Two we are actually building our final image. So the base
image for our app will be `ruby:2.5.5-alpine3.9`. Then we take care of
installing all our Ruby dependencies. You'll notice two very long `COPY` lines
after we `bundle install`. This is where we will be using the files that we
created earlier with that node image! We take just the `bundle.js` and the
`bundle.js.map` and add them to the `javascripts` folder within the image file
system we are creating (we know these files aren't included in our image already
because of our `.dockerignore`).

Finally we add the script we wrote earlier to take care of the Rails
`server.pid` Docker problem we described earlier. Then we expose our port and
start our server!

## Docker Compose file

Now we can use our nifty new Dockerfile and make sure everything runs locally by
setting up a `docker-compose.yml`:

```yml
version: "3"
services:
  db:
    image: postgres
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
  web:
    build:
      context: .
      dockerfile: Dockerfile
    image: rkoron/pokedex-rails
    volumes:
      - .:/my_app
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres@db
```

Now we can run `docker-compose up -d` and see the application running on
`http://localhost:3000/` (it may take a minute for this to complete). You will
then need to migrate and seed: `docker-compose run web rails db:migrate` &
`docker-compose run web rails db:seed` and you should be up and running.
Amazing! Now anyone can download this project and without having Rails or Node
on their computer they can run `docker-compose up` and they'll have this project
up and running.

[docker-c]: https://docs.docker.com/compose/rails/

## Pushing to Heroku

Once everything is working locally you know it's time to push to the [Heroku
Container Registry][register]!

1. First thing you'll need to do is log in to the Container Registry:
   `heroku container:login`.
2. Then we'll create a new application: `heroku create`
3. We'll then build and push up our images to the registry.
   - We can push up all our Dockerfile and images by running:
     `heroku container:push web -a {NAME_OF_HEROKU_APP}`
     - When we use the name `web` above we are telling Heroku to use this image
       as the web process (the default process)
4. Release your now built Images to Containers on Heroku:
   `heroku container:release web -a {NAME_OF_HEROKU_APP}`
   - Again, when we use the name `web` above we are telling Heroku to release
     this image as the web process (the default process)
5. Now we'll need to add a database `Addon` for our application.
   - On the dashboard for this Heroku application if you look under the
     `Resources` tab you will see the ability to search for and add `Add-ons`.
     - Here is where you can add the `Heroku Postgres` database as an `Add-on`
       for this application
6. Finally we have to migrate and seed our application:
   - Migrations: `heroku run rails db:migrate -a {NAME_OF_APP}`
   - Seeding: `heroku run rails db:seed -a {NAME_OF_APP}`

**Reminder**: We don't have Active Storage on this Application but if we did we
would need add our `master.key` and any configuration keys to our Heroku config
too!

And that is it! We can now use `heroku open` to be able to see the Pokedex
application in all it's glory! If you run into any troubles while you are
following this guide make sure to check the `heroku logs` for your application.

[register]: https://devcenter.heroku.com/articles/container-registry-and-runtime
