# First Composition

Time to take on your first Docker Compose file! You'll be working with a real life example of working with a simple Node/Express app that uses PostgreSQL as the database. Start off by taking a look at the [skeleton][skeleton]. We've created the `Dockerfile` for you so all you'll be doing is creating a `docker-compose.yml` file. If at anytime yur are unsure of syntax or would like to see an example the [Docker Compose][docs] Documentation is wonderfully thorough. 

**Reminder - indention is how the YAML file formats group information, so indention is important.** Check our this quick [YAML][yaml] reference if you need it.

For this application we'll need two containers, one for our Node/Express server and one for our PostgreSQL database. In Docker Compose we'll call these `services`. Start off by filling in the version of Compose you will be using - for this simple application we'll use `version: '2'`.  Create a service `web` for our Node/Express app, and a service named `db` for our Postgres database.

Your Compose file should look like this:
```yaml
version: '2'
services:
    web:
    db:
```

Let's start off with the `web` service and the first image you'll be building. Since we've provided you with a `Dockerfile` that means you'll need to `build` a custom image. Take a look at the [documentation][build-docs] if you need the syntax for how to build an image in Compose. An important concept to understand is that Docker Compose spans both “buildtime” and “runtime” of your application.  Up until now, we have been building images and then running containers off those images, which is “buildtime.” 

Compose triggers “buildtime” — instructing our images to be built for our containers — but it also populates data to be used at “runtime” (like `environment` and `volume` variables).  Build your `node` image and and give it a tag `<yourusername>:simple_node`. Expose your local port `80` to node's default inner exposed port of `3000`. Awesome job!

Now we'll get started with setting up the `db` service, but before we do take a quick peek inside the `server.js` file. For the purposes of this example we are using the `pg.connect()` function to connect the server and database. We'll show you a better way to do this tomorrow but for this simple example the important thing to know is that when we set up our `db` service the environment variables we set will have to match this string. There is a break down of how the string is structured below:

```js
// pg.connect(`postgres://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/POSTGRES_DB`)
pg.connect('postgres://postgres:password@localhost:5432/postgres_db');
```

So let's get to it! For your `db` service use the `postgres:11.2-alpine` image. Now all we have to do is set up the environment variables. Copy and paste the following into your `db` service:

```yml
    environment:
        - POSTGRES_USER=postgres
        - POSTGRES_PASSWORD=password
        - POSTGRES_DB=postgres_db
```



We'll be getting into that more complex Compose files in tomorrow's project but for tonight be proud of your first Docker Compose file!

[build-docs]: https://docs.docker.com/compose/compose-file/#build
[yaml]: https://learnxinyminutes.com/docs/yaml/

[docs]: https://docs.docker.com/compose/compose-file/


<!-- PUT IN SKELETON -->
[skeleton]:

