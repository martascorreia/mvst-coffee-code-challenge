# Coffee and Tee List - MVST challenge Backend

## Scripts

The following scripts are here to help you get up and running in a development environment as quickly as possible.

### Installation

```bash
$ yarn install
```

### Running the database with docker

The initial values for the database are set in the db/init.sql file. Running the following command, will initiate a Postgres database prefilled. 

```bash
$ yarn start:dev:db
```

### Access the database

To access the database, run the following command. The password is *1234*.

```bash
$ psql -h localhost -U postgres -d mvst-coffee-challenge-db
```

### Running the project in development mode

```bash
# Will run on port 5000
$ yarn start:dev
```