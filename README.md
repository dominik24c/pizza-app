## Pizza App

### Frontend

#### 1. Development

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.\
You will also see any lint errors in the console.

```bash
npm start
```

#### 2. Production

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
```bash
$ npm run build
```
Deploy these files to s3 bucket service

### Backend

Before operations go to backend directory

```bash
$ cd backend
```

#### 1. Development
#### 1.1 Database settings
Create .env file with below configuration 
```bash
$ touch .env
```
```dotenv
FLASK_APP=wsgi.py
FLASK_ENV=development
DB_USERNAME=username
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pizza
```

Connect with postgresql server create user and pizza database

```postgresql
CREATE USER username WITH PASSWORD 'password';
CREATE DATABASE pizza;
GRANT ALL PRIVILEGES ON DATABASE pizza TO username;
```

Create tables by using below commands

```bash
$ flask db upgrade
$ flask create-db
```

#### 1.2 Run application

```bash
$ pipenv shell
$ pipenv install
$ chmod +x ./run.sh
$ ./run.sh
```

#### 2. Tests
Use below commands to run tests
```bash
$ flask shell
$ pytest
```

### 3. Production
Create ec2 instance on aws dashboard (choose ubuntu distro).
Copy directory backend to server example by using sftp client
```bash
$ sftp -i ~/key.pem username@hostname
sftp> put -r /path/to/backend
```
Connect to your virtual machine
```bash
$ ssh -i ~/key.pem username@hostname
```
Update ubuntu
```bash
sudo apt update
```
Next change name backend to app and go to this directory
```bash
$ mv backend app
$ cd app
```

#### 3.1 Database settings
Install postgres server. Next use this same configuration settings,
what you use in development mode, but change FLASK_ENV variable to:
```dotenv
FLASK_ENV=production
```

#### 3.2 Run application
Create virtual environment 
```shell
pipenv shell
pipenv install
```
Update service configuration in ExecStart copy path from result of above command `pipenv shell`: 
```unit file (systemd)
[Service]
User=username
...
WorkingDirectory=/home/username/app
EnvironmentFile=/home/username/app/.env
ExecStart=/home/username/.local/share/virtualenvs/app-aIM2PLqO/bin/gunicorn --workers 1 --bind unix:/home/username/app/pizza_app.sock -m 007 wsgi:app
...
```
Change group access to the application folder 
```bash
$ sudo chgrp www-data /home/username/app
```

Move or copy pizza_app.service to /etc/systemd/system and run service
```bash
$ sudo cp ~/app/pizza_app.service /etc/systemd/system
$ sudo systemctl start pizza_app
$ sudo systemctl enable pizza_app
$ sudo systemctl status pizza_app
```

#### 3.3 Nginx
First change nginx.conf settings. You choose correct path pizza_app.sock and change server_name
```nginx configuration
server {
    server_name hostname;
    ...
    location / {
        ...
        proxy_pass http://unix:/home/ubuntu/pizza_app.sock;
    }
}
```
Next install nginx server.
Move or copy nginx configuration nginx.conf to `/etc/nginx/sites-available`. 
Then remove or unlink default settings in this directory.
Create soft link the file to the `/etc/nginx/sites-enabled` directory

```bash
$ sudo apt install nginx
$ sudo unlink /etc/nginx/sites-enabled/default
$ sudo cp ~/app/nginx.conf /etc/nginx/sites-available/
$ sudo ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled
$ sudo nignx -t
$ sudo systemctl start nginx
$ sudo systemctl enable nginx
$ sudo systemctl status nginx
```

#### 4. Link to website
Pizza application: http://pizza-app-s3.s3-website.eu-central-1.amazonaws.com 

#### 5. Link to api
API: http://ec2-3-64-215-105.eu-central-1.compute.amazonaws.com:5000 \
Restful urls:
* List of sauces
  * GET /api/sauce
* List of ingredients
  * GET /api/ingredient
* List of pizza
  * GET /api/pizza 
* Add a new order of pizza
  * POST /api/order 