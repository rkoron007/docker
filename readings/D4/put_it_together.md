# Docker Finale! Put it All Together

You've learned the fundamentals of Docker and now it's time to put it all together! You've accrued a couple of projects by now and the assignment for your homework tonight, and for all day tomorrow is create a `Dockerfile`, and a `docker-compose.yml` file for each project you have. Your goal is to have someone be able to download your project from Github and then have it up and running using `docker-compose up` without having to setup any other service. 

Once you've setup your images and Compose file you'll then host your project using the [Heroku Container Registry][heroku-container]. You have the option of either changing your original Heroku site deployment or creating a new Heroku site for your Docker-ized deployment. 

The ability to build your own images and Compose files is an essential part of working with Docker. Your projects may have specific needs and differences that our readings haven't covered and we urge you to use the Heroku and Docker documentation. Remember, you know your project best! Think about the commands and services you use to run your project locally, and translate that into the images and files you'll be creating. 

Once you've successfully created the necessary images, Compose file, and you have your project hosted on Heroku make sure you can make changes on your project and they are reflected correctly in your flow through development to production. 

Once your flow is complete give yourself a solid high five! 🙌 You've added another tool to add to your developer tool belt. From now on you can incorporate Docker in all of your future projects allowing the code you write to be transferred from computer to computer with ease.


## Bonus - Other Container Registries
Once you have your projects up and running on Heroku feel free to setup your project using other Container Registries such as the [Google Cloud][google] or [AWS][ec2]. Other services will take will probably have a more complicated setup, but it'll be good experience to utilize Docker with other hosting providers and something to put on your resume. 😎

[heroku-container]: https://devcenter.heroku.com/articles/container-registry-and-runtime
[google]:https://cloud.google.com/container-registry/
[ec2]: https://aws.amazon.com/ec2/