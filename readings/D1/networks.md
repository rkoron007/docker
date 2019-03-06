# Networking With Docker


## Docker Networks

So we've talked about how every container should run one process, and one process only. How do we get containers to talk to each other though? Say your app is running in one container but your database is running in another. How do you connect these two containers so they can exchange information? Turn the spotlight onto Docker networks. 

One of the reasons Docker containers and services are so powerful is that you can connect them together, or connect them to non-Docker workloads. Docker containers and services do not even need to be aware that they are deployed on Docker, or whether their peers are also Docker workloads or not. 

A very high-level overview of network usage looks like this: you create a new network, which creates a subnet for this network alone. You start a container and attach it to this network, and all containers attached to the same network will be able to ping each other, as if they were on a LAN. Then you can connect from one service running in one container to a service running in another one, as long as they are on the same network.

## Default Bridge Network
You've actually already been using Docker networks if you've booted up even one container. Every container that is started up is connected to a private virtual network called `bridge`. You can see a list of your current Docker networks 

<!--  -->

## User defined Bridge Network
1. User-defined bridges provide better isolation
Containers connected to the same user-defined bridge network automatically expose all ports to each other, and no ports to the outside world. This allows containerized applications to communicate with each other easily, without accidentally opening access to the outside world.
2. User-defined bridges provide automatic DNS resolution between containers.
3. Containers can be attached and detached from user-defined networks on the fly.
4. Each user-defined network creates a configurable bridge.
5. Linked containers on the default bridge network share environment variables.

## Drivers
For our purposes we will only be using the `bridge` driver, but here is a brief overview of other Docker network drivers:

1. [`bridge`][bridge]: Is the default network driver. If you don’t specify a driver, this is the type of network you will be creating. Bridge networks are best when you need multiple containers to communicate on the same Docker host.
1. [`overlay`][overlay]: Overlay networks connect multiple Docker daemons together and enable Docker Swarm services to communicate with each other. 
1. `host`: This driver is for standalone containers using Docker Swarm. The `host` driver will remove network isolation between the container and the Docker host, and use the host’s networking directly. 
1. `macvlan`: Macvlan networks allow you to assign a MAC address to a container, making it appear as a physical device on your network.
1. `none`: For this container, disable all networking.

[bridge]: https://docs.docker.com/network/bridge/
[overlay]: https://docs.docker.com/network/overlay/