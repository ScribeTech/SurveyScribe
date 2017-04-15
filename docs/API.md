# API

## Contents

1. [Summary](#summary)
2. [Objects](#objects)
3. [Details](#details)

## Summary
```
api/surveys
  GET
    200 OK return all surveys where owner=current user
    401 UNAUTHORIZED if not authenticated
  POST (survey object)
    201 CREATED create a survey and return it
    400 BAD REQUEST if invalid input
    401 UNAUTHORIZED if not authenticated
    401 UNAUTHORIZED if not owner
  PUT, PATCH, DELETE
    405 METHOD NOT ALLOWED

api/surveys/:survey
  GET
    200 OK return a survey object
    404 NOT FOUND if survey does not exist
  PATCH (survey object)
    200 OK only update part of the survey (don"t replace the whole thing)
    400 BAD REQUEST if invalid input
    401 UNAUTHORIZED if not authenticated
    401 UNAUTHORIZED if not owner
  DELETE
    200 OK delete the survey
    401 UNAUTHORIZED if not authenticated
    401 UNAUTHORIZED if not owner
  PUT, POST
    405 METHOD NOT ALLOWED

api/surveys/:survey/responses
  GET
    200 OK return all responses where survey=:survey
    401 UNAUTHORIZED if not authenticated
    401 UNAUTHORIZED if not owner
    404 NOT FOUND if survey does not exist
  PUT, PATCH, DELETE
    405 METHOD NOT ALLOWED

api/surveys/:survey/responses/:response
  GET
    200 OK return a response object
    401 UNAUTHORIZED if not authenticated
    401 UNAUTHORIZED if not owner
    404 NOT FOUND if survey does not exist
  PUT/PATCH/DELETE
    405 METHOD NOT ALLOWED
```

# Objects

### User Object

``` json
{
  "_id": "H1J73vRal",
  "name": "Jane Smith"
}
```

### Response Object

``` json
{
  "_id": "B1M1X3P0Tg",
  "answers": [
    {
      "_id": "SymJ73PRax",
      "value": 10
    },
    {
      "_id": "rJEymhvApg",
      "value": "I love them with all my soul!!!"
    },
    {
      "_id": "58ee63c65a2d576d5125b4c1",
      "value": ["58ee6466aa8ac36d6d74fe9a"]
    }
  ]
}
```

### Survey Object

``` json
{
  "_id": "B1vy7hwCpl",
  "owners": [
    "H1J73vRal",
    "rydkXhwRTx",
    "H1N7hw06g"
  ],
  "title": "Example Survey",
  "questions": [
    {
      "_id": "SklEQnPRpe",
      "type": "Scale",
      "required": false,
      "title": "How much do you like burritos?",
      "min": 0,
      "max": 10,
      "labels": ["Not at All", "Somewhat", "Extremely"]
    },
    {
      "_id": "BJZV72wRpx",
      "type": "Text",
      "required": false,
      "title": "Explain your rating.",
      "max": 1000
    },
    {
      "_id": "rkf47nwCax",
      "type": "Select",
      "required": false,
      "title": "What is your favorite color?",
      "options": [
        { "_id": "Bk74m2v0Tg", "label": "Red"},
        { "_id": "SJ4VX2wRae", "label": "Green"},
        { "_id": "HyHV7hDATx", "label": "Blue"}
      ],
      "maxSelection": 0
    }
  ]
}
```

## Details

### Surveys

#### GET `api/surveys`

- **200** OK - Return all surveys owned by the current user
  ``` json
  [
    { "_id": "HJ1_AwA6l", "title": "Example Survey" },
    { "_id": "rJx1dCwApe", "title": "Intrusive MARKETING Survey" },
    { "_id": "HJW1dRvAal", "title": "Test Survey" }
  ]
  ```
- **401** UNAUTHORIZED - if not authenticated

#### POST `api/surveys`

- **Request body:** [(survey object)](#survey-object)
- **201** CREATED - create a survey and return its [(survey object)](#survey-object)
- **400** BAD REQUEST - if invalid input
- **401** UNAUTHORIZED - if not authenticated
- **401** UNAUTHORIZED - if not owner

#### PUT, PATCH, DELETE `api/surveys`

- **405** METHOD NOT ALLOWED

#### GET `api/surveys/:survey`

- **200** OK - return a [(survey object)](#survey-object) with the given id
- **404** NOT FOUND - if the survey does not exist

#### PUT `api/surveys/:survey`

- **Request body:** [(survey object)](#survey-object)
- **200** OK - update the survey
- **400** BAD REQUEST - if invalid input
- **401** UNAUTHORIZED - if not authenticated
- **401** UNAUTHORIZED - if not the owner

#### DELETE `api/surveys/:survey`

- **200** OK - delete the survey
- **401** UNAUTHORIZED - if not authenticated
- **401** UNAUTHORIZED - if not the owner

#### PATCH, POST `api/surveys/:survey`

- **405** METHOD NOT ALLOWED

#### GET `api/surveys/:survey/responses`

- **200** OK - return all responses where survey=:survey
  ```
  [
    <response object>,
    <response object>,
    <response object>
  ]
  ```
- **401** UNAUTHORIZED - if not authenticated
- **401** UNAUTHORIZED - if not the owner
- **404** NOT FOUND - if the survey does not exist

#### POST, PUT, PATCH, DELETE `api/surveys/:survey/responses`

- **405** METHOD NOT ALLOWED

#### GET `api/surveys/:survey/responses/:response`

- **200** OK - return a response object
- **401** UNAUTHORIZED - if not authenticated
- **401** UNAUTHORIZED - if not owner
- **404** NOT FOUND - if survey does not exist
  
#### PUT, PATCH, DELETE `api/surveys/:survey/responses/:response`

- **405** METHOD NOT ALLOWED

### Responses

#### GET `api/responses`

**200** OK - return responses that belong to the current user or session
  ``` 
  [
    <response object>,
    <response object>,
    <response object>,
    <response object>
  ]
  ```

#### POST `api/responses`

- **Request body:** [(response object)](#response-object)
- **201** CREATED - create a response and return its [(response object)](#response-object)
- **400** BAD REQUEST - if invalid input

#### PUT, PATCH, DELETE `api/responses`

- **405** METHOD NOT ALLOWED

#### GET `api/responses/:response`

- **200** OK - return a [(response object)](#response-object)
- **404** NOT FOUND - if a response does not exist
- **401** UNAUTHORIZED - if the response does not belong to the current user or session

#### PUT `api/responses/:response`

- **Request body:** [(response object)](#response-object)
- **200** OK - only update part of the response
- **400** BAD REQUEST - if invalid input
- **401** UNAUTHORIZED - if user!=current user and session!=current session

#### PATCH, POST `api/responses/:response`

**405** METHOD NOT ALLOWED

### Users

#### GET `api/users`

- **200** OK - return all users
  ``` json
  [  
    { "_id": "H1J73vRal", "name": "Jane Smith" },
    { "_id": "HyekQ2vRpx", "name": "John Jones" },
    { "_id": "ryW1XhwC6l", "name": "Bob Silver" },
  ]
  ```
- **401** UNAUTHORIZED - if not authenticated

#### POST `api/users`

- **Request body** -
  ``` json
  {
    "name": "Jane Smith",
    "password": "CorrectHorseBatteryStaple"
  }
  ```
- **201** CREATED - create new user and return it
  ``` json
  {
    "name": "Jane Smith",
    "_id": "H1J73vRal"
  }
  ```
- **400** BAD REQUEST - if invalid input
- **409** CONFLICT - if the username already exists

#### PUT, PATCH, DELETE `api/users`

- **405** METHOD NOT ALLOWED

#### GET `api/users/:user`

- **200** OK - return the user
  ``` json
  {
    "name": "Jane Smith",
    "_id": "H1J73vRal"
  }
  ```
- **401** UNAUTHORIZED - if not authenticated
- **404** NOT FOUND - if user does not exist

#### PUT `api/users/:user`

- **Request body**
  ``` json
  {
    "name": "Jane",
    "password": "CorrectHorseBatteryStaple"
  }
  ```
- **200** OK - update the user
- **400** BAD REQUEST - if invalid input
- **401** UNAUTHORIZED - if this is not the current user

#### DELETE `api/users/:user`

- **200** OK - log out and delete the user
- **401** UNAUTHORIZED - if not authenticated
- **401** UNAUTHORIZED - if this is not the current user

#### PATCH, POST `api/users/:user`

- **405** METHOD NOT ALLOWED

### Authentication

#### POST `api/login`
- **Request body**
  ``` json
  {
    "name": "Jane Smith",
    "password": "CorrectHorseBatteryStaple"
  }
  ```
- **200** OK - authenticate the user
  ``` json
  {
    "_id": "H1J73vRal",
    "name": "Jane Smith"
  }
  ```
- **400** BAD REQUEST - if invalid input

#### GET, PUT, PATCH, DELETE `api/login`

- **405** METHOD NOT ALLOWED

#### POST `api/logout`
- **Request body** - (empty)
- **200** OK - remove user authentication
- **401** UNAUTHORIZED - if not authenticated

#### GET, PUT, PATCH, DELETE `api/logout`

- **405** METHOD NOT ALLOWED
