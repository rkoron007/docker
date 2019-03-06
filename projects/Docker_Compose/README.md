

# Phase: Create A Multi-Service Multi-Node Web App

## Goal: create volumes, and services for a web-based "cats vs. dogs" voting app.

![vting-app](https://assets.aaonline.io/Docker/voting.png)

All of the images you need are on Docker Hub. 

- Docker Compose will take care of creating a network for you.
- The database server should use a named volume for preserving data. Use the new `--mount` format to do this: `--mount type=volume,source=db-data,target=/var/lib/postgresql/data`

### Services (names below should be service names)
- vote
    - dockersamples/examplevotingapp_vote:before
    - web front end for users to vote dog/cat
    - ideally published on TCP 80. Container listens on 80
    - on frontend network
    - 2+ replicas of this container

docker network create frontend

docker service create --replicas 2 -d --name vote -p 80:80  --network frontend dockersamples/examplevotingapp_vote:before

docker create network frontend
docker create network backend

docker container run -d -p 80:80 --name vote --net frontend dockersamples/examplevotingapp_vote:before
docker container run -d -p 81:80 --name vote --net frontend dockersamples/examplevotingapp_vote:before

<!-- docker container run -p 81:80 --name vote1 dockersamples/examplevotingapp_vote:before -->

- redis
    - redis:3.2
    - key/value storage for incoming votes
    - no public ports
    - on frontend network
    - 1 replica NOTE VIDEO SAYS TWO BUT ONLY ONE NEEDED

docker container run -d --name redis --net frontend redis:3.2

docker service create -d --replicas 1 --name redis --network frontend redis:3.2

- worker
    - dockersamples/examplevotingapp_worker
    - backend processor of redis and storing results in postgres
    - no public ports
    - on frontend and backend networks
    - 1 replica

docker container run -d --name worker  --net frontend --net backend dockersamples/examplevotingapp_worker

<!-- docker network create --driver overlay backend

docker service create --replicas 1 --name worker --network frontend  --network backend dockersamples/examplevotingapp_worker -->

- db
    - postgres:9.4
    - one named volume needed, pointing to /var/lib/postgresql/data
    - on backend network
    - 1 replica

docker container run -d --name db --net backend -e POSTGRES_PASSWORD=postgres -v  /var/lib/postgresql/data postgres:9.4

<!-- docker service create --replicas 1 --name db --network backend --mount type=volume,source=db-data,target=/var/lib/postgresql/data -e POSTGRES_PASSWORD=postgres postgres:9.4 -->

- result
    - dockersamples/examplevotingapp_result:before
    - web app that shows results
    - runs on high port since just for admins (lets imagine)
    - so run on a high port of your choosing (I choose 5001), container listens on 80
    - on backend network
    - 1 replica

docker container run -d --name result  -p 5000:80 --net backend dockersamples/examplevotingapp_result:before


<!-- docker service create --replicas 1 --name result -p 5000:80 --network backend dockersamples/examplevotingapp_result:before -->
