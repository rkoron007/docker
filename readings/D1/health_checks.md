# Docker Container HealthChecks

## Overview
HealthChecks are exactly what they sound like - a way of checking the health of some resource. In the case of Docker, a [`HEALTHCHECK`][hc] is a command used to determine the health of a running container. Docker introduced Container HealthChecks in version 1.12. Docker Container HealthChecks are supported in a Dockerfile, the `docker container run` command, Docker Compose, and in Docker Swarm. 

The `HEALTHCHECK` instruction tells Docker how to test a container to check that it is still working. This can detect cases such as a web server that is stuck in an infinite loop and unable to handle new connections, even though the server process is still running. 

## Why You Should HealthCheck
Well, to be honest, in a small scale development case it may not make that much of a difference because we're just running the development server. Though in production, you could theoretically lose the app you were running, but the container would still be running. So the normal state of the container would be "running" even though we are no longer serving traffic.

So to be specific, Docker HealthChecks are most helpful in a **production** environment. Learning them now will prepare you for that environment!

[hc]: https://docs.docker.com/engine/reference/builder/#healthcheck
## Docker Container Health
When a container has a HealthCheck specified, it has a health status in addition to its normal status. A Docker container can have three health statuses:

  1. starting: This takes up to 30 seconds to run, and is the process on the container booting up
  2. healthy: The container will continue to run the HealthCheck at every specified interval
  3. unhealthy:  After a certain number of consecutive failures the container's status will be unhealthy


## HealthCheck Syntax

### Docker Container Run HealthChecks

You can run HealthChecks on containers in a variety of ways. Below is an example of using a HealthCheck with Postgres for the specific command that the Database is ready for oncoming traffic. 

To ensure a HealthCheck is running properly you will always need your container to fail by `exit 1` or `false` meaning it failed.  

```
docker container run --name p2 -d --health-cmd="pg_isready -U postgres || exit 1" postgres 
```

Now that your HealthCheck is set up you should be able to see it in `docker container ls`:

```
$ docker container ls  
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                   PORTS               NAMES
d68125e29c04        postgres            "docker-entrypoint.s…"   4 minutes ago       Up 4 minutes (healthy)   5432/tcp            p2
```

You can also check the status of your HealthCheck by inspecting your container using:

```
docker container inspect --format='{{json .State.Health}}' your-container-name
```


### Dockerfile HealthChecks
The syntax for using a Container HealthCheck in a Dockerfile is:

```docker
HEALTHCHECK [OPTIONS] CMD command
```

A typical HealthCheck might be to ensure traffic is flowing to our container by using the `curl` command adding something like this to your Dockerfile:

```ssh
HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit 1
```

### Docker Compose Syntax for HealthChecks

The minimum Docker Compose version needed for HealthChecks is 2.1, though to use the `start_period` option the minimum version is 3.4.

Here is the example of using a Compose with a HealthCheck:

```yml
    version: "3.4" 
    services:
        web:
        image: nginx
        healthcheck:
            test: ["CMD", "curl", "-f", "http://localhost"]
            interval: 1m30s
            timeout: 10s
            retries: 3
                start_period: 1m #version 3.4 of DockerCompose would minimum
```