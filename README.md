# Express server

<p style="display: block; width: 100%; text-align:center;">This is the demo Node.js project. It was created to demonstrate my base skills in Node.js coding.</p>
<p style="display: block; width: 100%; text-align:center;">
  <a href="https://nodejs.org/en/about" target="_blank"><img src="https://img.shields.io/badge/Node.js-v18.16.0-blue?logo=nodedotjs" alt="Node.js Version" /></a>
  <a href="https://262.ecma-international.org/" target="_blank"><img src="https://img.shields.io/badge/JavaScript-v9.0-blue?logo=javascript" alt="JavaScript Version" /></a>
  <a href="" rel="nofollow"><img src="https://img.shields.io/badge/istall_size-2.26%20MB-%23ebdb32?style=flat" alt="install size"></a>
</p>

## Contents
1. [Stack](#Stack)
2. [Launch](#launch)
3. [Usage](#usage)
4. [Environment](#environment)
5. [Settings](#settings)
6. [API](#api)
7. [Database](#database)

## Stack

<div>
    <div>
          <div style="display: flex; flex-wrap: wrap; height: 300px;">
            <div style="width: 40%; height: fit-content;"><a href="https://ubuntu.com/" target="_blank"><img src="https://img.shields.io/badge/Linux_Ubuntu-v22.04-blue?style=for-the-badge&logo=ubuntu" alt="Linux Ubuntu Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.docker.com/products/docker-desktop/" target="_blank"><img src="https://img.shields.io/badge/docker-v24.0.2-blue?style=for-the-badge&logo=docker" alt="Docker Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://nodejs.org/en/about" target="_blank"><img src="https://img.shields.io/badge/Node.js-v18.16.0-blue?style=for-the-badge&logo=nodedotjs" alt="Node.js Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/" target="_blank"><img src="https://img.shields.io/badge/npm-v9.5.1-blue?style=for-the-badge&logo=npm" alt="npm Version" /></a></div>
            <br>
            <div style="width: 40%; height: fit-content;"><a href="https://www.mysql.com/" target="_blank"><img src="https://img.shields.io/badge/MySQL-v5.7-blue?style=for-the-badge&logo=mysql" alt="MySQL Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/cors" target="_blank"><img src="https://img.shields.io/badge/npm_cors-v2.8.5-blue?style=for-the-badge" alt="npm-cors Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://github.com/fradelg/docker-mysql-cron-backup" target="_blank"><img src="https://img.shields.io/badge/docker_mysql_cron_backup-v1.13.1-blue?style=for-the-badge" alt="npm docker-mysql-cron-backup Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/bcryptjs" target="_blank"><img src="https://img.shields.io/badge/npm_bcryptjs-v2.4.3-blue?style=for-the-badge" alt="npm Bycriptjs Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://jwt.io/" target="_blank"><img src="https://img.shields.io/badge/npm_jsonwebtoken-v9.0.0-blue?style=for-the-badge&logo=jsonwebtokens" alt="npm jsonwebtoken Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/winston" target="_blank"><img src="https://img.shields.io/badge/npm_winston-v3.8.2-blue?style=for-the-badge" alt="npm winston Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/morgan" target="_blank"><img src="https://img.shields.io/badge/npm_morgan-v1.10.0-blue?style=for-the-badge" alt="npm morgan Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/morgan-body" target="_blank"><img src="https://img.shields.io/badge/npm_morgan_body-v2.6.8-blue?style=for-the-badge" alt="npm morgan-body Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/multer" target="_blank"><img src="https://img.shields.io/badge/npm_multer-v1.4.5-blue?style=for-the-badge" alt="npm multer Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/mysql2" target="_blank"><img src="https://img.shields.io/badge/npm_mysql2-v3.2.0-blue?style=for-the-badge" alt="npm mysql2 Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/dotenv" target="_blank"><img src="https://img.shields.io/badge/npm_dotenv-v16.3.1-blue?style=for-the-badge&logo=dotenv" alt="npm dotenv Version" /></a></div>
        </div>
    </div>
</div>

## Launch

The project is prepared to launch via the docker.You need to install Docker and then run the corresponding command in the terminal.
``` bash
$ docker stop $(docker ps -aq)
$ docker-compose -f devops/docker-compose.yml up -d
```

## Usage

* After the application is launched it is available at http://localhost:3000/api
* This project has no user interface. It is assumed that all actions performed using [API](#api) or Postman

## Environment

Environment variables are here: server/config/env/. Key environment variables are connected to the project using docker-compose files at the [env_file] section.

## Settings

* To demonstrate the app abilities I didn't clear the test database and local file storage: /server/public/uploads/
* To simplify deployment, I didn't exclude the .env files from the repository. It is here: /server/config/env/
* The database dump file is here: /database_dump.

## API

* After the service is launched API map is available on http://localhost:3000/api

## Database

* when the project starts, the database will be automatically restored from the backup: db/backup
* after the project is launched, CRON will create a new database backup every day at 00:00 am
* when the project terminates it also creates a new backup file in db/backup
* if the folder /db/data is empty, docker will restore database from the dump file ./db/backup
* if there is no dump file in ./db/backup, docker will create an empty database
