
## Common Dockerfile Commands

### FROM
Almost every Dockerfile begins with the `FROM` instruction that will set the Base Image for all subsequent instructions. The only argument that can come before `FROM` is [`ARG`][arg-from] which can be used to declare a variable outside of the build stage, that can be later be used inside the build stage. 

### ENV
This command is the preferred way to inject keys and values into image building. All the variables set using this command can be used in the subsequent instructions in the build stage.

### RUN
The RUN instruction will execute each phrase of commands in a new layer on top of the current image and commit the results. The resulting committed image will be used for the next step in the Dockerfile. Additionally the `RUN` command can run shell scripts or whatever you can use within the container

### WORKDIR 
The `WORKDIR` instruction sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY` and `ADD` instructions that follow it in the Dockerfile. It is best practice to use `WORKDIR` to run commands that rely on being in a certain location in the file tree. The `WORKDIR` instruction can be also be used multiple times in a Dockerfile. If a relative path is provided, it will be relative to the path of the previous `WORKDIR` instruction. 

### EXPOSE
Specify to the image which ports are going to be exposed within that image. 

### CMD
This is the final command will run every time you launch a new container from this image or restart a stopped container of this image. 

### COPY
Will make a copy of the files in the first given location to the second given location. 

[arg-from]: https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact