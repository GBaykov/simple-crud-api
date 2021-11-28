# RS School Simple CRUD API


## Downloading

```
git clone https://github.com/GBaykov/simple-crud-api
```

## Installing NPM modules

```
npm install
```

## Running application

```
Development mode: npm run start:dev
Production mode:  npm run start:prod

```

After starting the app run on port (3000 as default) you can open http://localhost:3000/



## Usage


The CRUD API supports 4 methods:

- GET `/person` or `/person/${personId}` returns all persons or a person with corresponding `personId`
- POST `/person` is used to create a record about a new person and store it in the database
- PUT `/person/${personId}` is used to update a record about an existing person
- DELETE `/person/${personId}` is used to delete a record about an existing person from the database

## Details of the task:

1. The task is solved using only **pure Node.js**. 
2. API path `/person`:
    * **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`
    * **POST** `/person` is used to create record about new person and store it in database
    * **PUT** `/person/${personId}` is used to update record about existing person
    * **DELETE** `/person/${personId}` is used to delete record about existing person from database
3. Persons are stored as `objects` that have following properties:
    * `id` — unique identifier (`string`, `uuid`) generated on server side
    * `name` — person's name (`string`, **required**)
    * `age` — person's age (`number`, **required**)
    * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
4. Requests to non-existing endpoints (e.g. `/some-non/existing/resource`) are handled.
5. Internal server errors should are handled and processed correctly.
6. Value of port on which application is running is stored in `.env` file.
7. There are 2 modes of running application: **development** and **production**
