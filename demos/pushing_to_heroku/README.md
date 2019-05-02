## Pushing to Heroku Example: Using Rails and React

In this demo we'll be walking through how we Docker-ized an application and then deploy that application to the Heroku Container Registry. The application we'll be using for this demo will look pretty familiar - it's Pokedex! We'll walk through how we created Dockerfiles for the two main services in our application (rails and javascript) and what configuration changes we ended up making along the way.

## Running the Application Locally Using Docker

### Rails Dockerfile

We'll start by building the Dockerfile for the Rails side of things. We used the [docker-compose][docker-c] guide to building a Rails Dockerfile as a general guide for this portion. We created a new file `entrypoint.sh` to fix Rails-specific issue that prevents the server from restarting when a certain `server.pid` file pre-exists:

```sh
#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
```

Then we went had to change our database configuration to make sure it would hook up to the Postgres database we will later define in our `docker-compose` file:

```yml
# config/database.yml
default: &default
  adapter: postgresql
  encoding: unicode
  url: <%= ENV['DATABASE_URL'] %>
  # For details on connection pooling, see Rails configuration guide
  # http://guides.rubyonrails.org/configuring.html#database-pooling
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
  password:
```

Finally we created our `Dockerfile`. Since this application will have more than one `Dockerfile` and we knew Rails would be in charge of our server we followed convention and named this file `Dockerfile.web`:

```dockerfile
# Dockerfile.web

# We are going from the alpine version of ruby to save space
FROM ruby:2.5.5-alpine3.9
# We tell the image to not build a cache of things in our image
RUN apk add --no-cache --update build-base \
  linux-headers \
  git \
  postgresql-dev \
  nodejs \
  tzdata


# environment vars must be included in our dockerfile
ARG DATABASE_URL="postgres://postgres@db"
ARG RAILS_ENV=production

# copy over our Gemfile
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
# We gem install bundler for a specific issue with bundler 2.0
# then we can bundle install
RUN gem install bundler && bundle install
COPY . /myapp

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
```

### Node Dockerfile

Then we need to create a Dockerfile to bundle our React code via Node. We'll call this file `Dockerfile.frontend`:

```dockerfile
# Dockerfile.frontend

# base image
FROM node:11-alpine

# set working directory
WORKDIR /usr/src/app

# environment vars must be included in dockerfile
ARG NODE_ENV=production

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
# silent so we don't have to watch the whole thing start
RUN npm install --silent

# Start application
CMD ["npm", "start"]
```

That's it for React! Now we can build our `docker-compose.yml` using these two Dockerfiles.

## Docker Compose file

Now we can use our nifty new Dockerfiles and make sure everything runs locally by setting up a `docker-compose.yml`:

```yml
# docker-compose.yml
version: '3'
services:
  db:
    image: postgres
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
  web:
    build:
      context: .
      dockerfile: Dockerfile.web
    image: rkoron/pokedex-web
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres@db
    depends_on:
      - db
  frontend:
      build:
        context: .
        dockerfile: Dockerfile.frontend
      image: rkoron/pokedex-frontend
      volumes:
        - '.:/usr/src/app'
        - '/usr/src/app/node_modules'
      ports:
        - "80:3000"
      environment:
        - NODE_ENV=development
```

Now we can run `docker-compose up -d` and see the application running on `http://localhost:3000/`. You will need to migrate and seed: `docker-compose run web rails db:migrate` & `docker-compose run web rails db:seed` and you should be up and running. Amazing! Now anyone can download this project and without having rails or node or anything they can run `docker-container up` and they'll have this project up and running.

[docker-c]: https://docs.docker.com/compose/rails/

## Pushing to Heroku

Once everything is working locally you know it's time to push to the [Heroku Container Registry][register]!

1. First thing you'll need to do is log in to the Container Registry: `heroku container:login`.
2. Then we'll create a new application: `heroku create`
3. We'll then build and push up our images to the registry.
   - We can push up all our Dockerfiles and images by running: `heroku container:push --recursive -a {NAME_OF_HEROKU_APP}`
   - If you only wanted to push one of your Dockerfiles you can run: `heroku container:push {SERVICE_NAME} --recursive -a {NAME_OF_HEROKU_APP}`
4. Release your now build Images to Containers on Heroku: `heroku container:release web frontend -a {NAME_OF_HEROKU_APP}`
5. Now we'll need to add a database `Addon` for this application.
   - On the dashboard for this Heroku application if you look under `Resources` you can search for `Add-on`s.
     - Here is where you can add the `Heroku Postgres` database as an `Add-on` for this application
6. Finally we have to migrate and seed our application:
   - Migrations: `heroku run rails db:migrate -a {NAME_OF_APP}`
   - Seeding: `heroku run rails db:seed -a {NAME_OF_APP}`

And that is it! We can now use `heroku open` to be able to see the Pokedex application in all it's glory!

[register]: https://devcenter.heroku.com/articles/container-registry-and-runtime
