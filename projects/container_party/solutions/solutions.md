## Phase 


## Phase 0: Run Containers

The Commands to create the three containers are as follows:

1. `docker container run --name nginx -d -p 80:80 nginx`

1. `docker container run --name httpd -d -p 8080:80 httpd`

1. `docker container run --name mysql -d -p 3306:3306 --environment MYSQL_ROOT_PASSWORD=my-secret-pw mysql`

## Phase 1: Within the Shell: Phase B

Start up your Ubuntu Shell
`docker container run -it --name ubuntu ubuntu bash`

Install Curl and Test
`apt-get update`
`apt-get install -y curl`
`curl parrot.live`

Exit Out and Remove
`exit`
`docker container rm ubuntu`

## Phase 2: Quote Generator
Run our named, detached container off alpine with our script!

`docker container run -d --name quotes alpine /bin/sh -c "while :; do wget -qO- http://quotesondesign.com/wp-json/posts; printf '\n'; sleep 5; done"`

## Phase 3: Networking:
Create the network
`docker network create funtime`

Run our two Containers 
`docker container run -d --net funtime --net-alias party elasticsearch:2`
`docker container run -d --net funtime --net-alias party elasticsearch:2`

Make sure everything if configured:
`docker container run --net funtime alpine nslookup party`

Now let's query them:
`docker container run --net funtime centos curl -s party:9200`