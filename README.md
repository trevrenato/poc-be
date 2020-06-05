# POC-be - 0.0.1

## Requirements
* Node.js  (v12)
* Docker (v19)
* Docker compose (1.17.1)

## Database schema

Follow the steps in order to have the database schema created:

1. Build database docker image running `npm run database:build`
2. Start postgres database running `npm run database:start`

Check additional commands related to database docker on `package.json`


## Instructions

Create an API HTTP REST that expose CRUD endpoints based on a Address Book according to the following criteria:

* Nodejs
* Express - responsible to define the routes
* Sequelize - responsible for the integration with database (ORM)
* Postgres - responsible to persist the data processed by the API
* Jest - responsible to handle unit test
* Follow standards of Clean Architecture
* It's not necessary any AWS service, everything should be locally