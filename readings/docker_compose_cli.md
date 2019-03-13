# Docker Compose CLI

## Simple CLI Commands
Before we start, if you haven't already, we recommend downloading the Docker Compose [Command-line completion][cl-c] especially while you are learning!

One of the **coolest** things about Docker Compose is the intuitive CLI commands. There are a lot of similar commands between the `docker-compose` CLI and the `docker` CLI. Docker Compose basically takes over the role of the Docker CLI by talking to the Docker server API in the background for you. The main `docker-compose` commands to know are:

1. `docker-compose --help` - Because who doesn't need a little help now and again?
2. `docker-compose up` - Which will setup your volumes, networks, and start the specified containers
3. `docker-compose down` - Which will stop and remove all containers and networks.
3. `docker-compose down -v` - Which will stop and remove all volumes, containers and networks.

No more giant multi-line container commands! No more removing containers by hand! Docker Compose cleans all that right up into simple single line commands. Imagine this: If all your projects had a `Dockerfile` and a `docker-compose.yml` all I'd have to do to run your project is:

```ssh
git clone github.com/yourproject
docker-compose up
```

So nifty! 🙌 A complete list of Compose CLI flags can be found [here][compose-cli].

[cl-c]: https://docs.docker.com/compose/completion/
[compose-cli]: https://docs.docker.com/compose/reference/overview/



