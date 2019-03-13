## Common Docker Container Commands
Since Docker started several years ago there are older and newer ways of running the same command. In this course we'll be using the updated long form version of the Docker CLI commands which will usually follow the format of `docker <COMMAND> <SUBCOMMAND>`. A perfect example of this is `docker container(COMMAND) run(SUBCOMMAND)`.  

Here are the commands you'll find yourself running most often. We recommend also bookmarking this Docker [Cheatsheet][docker-cheat].

- `docker --help` - the most useful command! It will list out all the options available to you. 
- `docker run [OPTIONS] IMAGE[:TAGNUMBER] [COMMAND]` - Check out the Docker [run][run-docs] documentation for a list of options and flags. 
- `docker container ls` - lists all your running containers
- `docker container ls -a` - lists all your containers (running or stopped)
- `docker container stats` - with no provided container name to get live performance data    
- `docker container inspect <CONTAINERNAME>` - Will return json with the metadata about that specific container
- `docker container top <CONTAINERNAME>`- Display the running processes of a container.
- `docker container rm <CONTAINERNAME>` - remove one or more stopped containers
- `docker container rm -f <CONTAINERNAME>` - stop and remove a running container
- `docker container run -it <IMAGENAME> bash` - For running interactive processes (like a shell in this instance). 
- `docker container run exec`- Run a command in a running container

[docker-cheat]: https://www.docker.com/sites/default/files/Docker_CheatSheet_08.09.2016_0.pdf
[run-docs]: https://docs.docker.com/engine/reference/run/