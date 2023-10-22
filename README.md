# Express server
This is the demo Node.js project. It was created to demonstrate my base skills in Node.js coding.

## Table of Contents
1. [Environment](#environment)
2. [Deploy](#deploy)
3. [Settings](#settings)
4. [Launch](#launch)
5. [Usage](#usage)
6. [API](#api)
7. [Database](#database)

## Environment

- OS Ubuntu-22.04
- Docker 24.0.2
- Docker-compose 2.18.1
- Node.js 18.16.0
- npm 9.5.1
- mysql 5.7
- fradelg/mysql-cron-backup
- npm-cors 2.8.5
- npm-bcrypt 5.1.0
- npm-jsonwebtoken 9.0.0
- npm-winston 3.8.2
- npm-morgan 1.10.0
- morgan-body 2.6.8
- npm-multer 1.4.5-lts.1
- npm-mysql2 3.2.0 
- dotenv 16.3.1

## Deploy <a id="deploy"></a>

1. Download the project: bash git clone https://github.com/GRD-1/balance-rating.git
2. Install docker + docker-compose to your local operating system
3. Using the terminal go to the project root
4. Build the project using the command [ docker-compose build --no-cache ]
5. After that, run the project using the command [ docker-compose up ]
6. application launched

## Settings

* the environment variables are here: server/config/
* To demonstrate the app abilities I didn't clear the test database and local file storage: /server/public/uploads/
* To simplify deployment, I didn't exclude the .env files from the repository. It is here: /server/config/env/
* The database dump file is here: /database_dump.

## Launch

* if you launch the project for the first time, follow the instructions from the chapter [Deploy](#deploy), 
* to launch the project use the command: [ docker-compose up ]
* to stop the project use the command: [ docker-compose down ]

## Usage

* After the application is launched it is available at http://localhost:3000/api
* This project has no user interface. It is assumed that all actions performed using [API](#api) or Postman

## API <a id="api"></a>

* After the service is launched API map is available on http://localhost:3000/api

## Database

* when the project starts, the database will be automatically restored from the backup: db/backup
* after the project is launched, CRON will create a new database backup every day at 00:00 am
* when the project terminates it also creates a new backup file in db/backup
* if the folder /db/data is empty, docker will restore database from the dump file ./db/backup
* if there is no dump file in ./db/backup, docker will create an empty database
