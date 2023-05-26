# Commodity price average

## API
### Requirement
To run the application locally using docker compose, you have to install docker on your computer; once you have docker running on your computer follow the steps below.
https://docs.docker.com/engine/install/


### Run
- Navigate to the root of the project
- Create the .env variable
- Run the command below

```sh
docker compose up -d
```
This command will run the application in detach mode on port 3000 and also start the Mongo database in the container, which is also available on port 27017

### Run test
```sh
npm run test
```
### Env
```sh
DB_URI=
PORT=
DB_NAME=
```

## SCRIPT - load database
### Requirement
The `parseAndStoreData()` expect the csv file path

### Run
- Navigate to the script directory
- Open the parseData.js
- Update the file path in parseAndStoreData function
```sh
npm run load
```

### Run test
```sh
npm run test
```

### Env
```sh
DB_URI=
DB_NAME=
```
