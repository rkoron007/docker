
The Commands to create the three containers are as follows:


1. `docker container run --name nginx -d -p 80:80 nginx`

1. `docker container run --name httpd -d -p 8080:80 httpd`

1. `docker container run --name mysql -d -p 3306:3306 --environment MYSQL_ROOT_PASSWORD=my-secret-pw mysql`

