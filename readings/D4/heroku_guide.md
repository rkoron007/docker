# Hosting using Docker and Heroku

For hosting we'll be using the [`heroku container registry`][container]
- you'll be using heroku container registry
- update your database.ynml 
- heroku plugins:install heroku-container-registry
- heroku container:login
- heroku addons:create heroku-postgresql
- heroku run rails db:migrate
- heroku run rails db:seed
- create two dockerfiles, one for your react named frontend and one for your backend named web
- run heroku container:push --recursive  
- then heroku container:release web 

[container]: https://devcenter.heroku.com/articles/container-registry-and-runtime