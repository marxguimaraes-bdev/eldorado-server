# Eldorado Challenge Sample API

Sample Server API created with NodeJS 14

## Database creation

To create the database from scratch simply set the database info in `config/index.js` and run the script `util/rds.js`.

## How to run locally

Dependencies:
- Docker
- docker-compose
- Make
- Yarn

Howto:
1. Create a file called `.env` in the root of the project, add to that file the database credentials `RDS_USER` and `RDS_PASSWORD`.
2. After installing all dependencies, use the command `make build` to install the project and build its docker image.
3. Use the command `make up` to lift the server's docker container.
4. Optionally, use `make log` to see the server's output.
5. After you're done run `make down` to stop the container.
