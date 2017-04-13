# Server API

## Contents

  1. [Surveys](#surveys)
  1. [Responses](#responses)
  1. [Users](#users)
  1. [Authentication](#authentication)
  1. [Objects](#objects)

## Surveys

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
  PUT/PATCH/DELETE
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
  PUT/POST
    405 METHOD NOT ALLOWED

api/surveys/:survey/responses
  GET
    200 OK return all responses where survey=:survey
    401 UNAUTHORIZED if not authenticated
    401 UNAUTHORIZED if not owner
    404 NOT FOUND if survey does not exist
  PUT/PATCH/DELETE
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

### GET api/surveys

#### Response body:

``` json
[
  { "id": "58ee63c65a2d576d5125b4bc", "title": "Example Survey" },
  { "id": "58ee63c65a2d576d5125b4bd", "title": "Intrusive MARKETING Survey" },
  { "id": "58ee63c65a2d576d5125b4bf", "title": "Test Survey" }
]
```

### POST api/surveys

****Request body:** [survey object](#survey-object)

**Response body:** [survey object](#survey-object)

### GET api/surveys/:survey

**Response body:** [survey object](#survey-object)

### PATCH api/surveys/:survey

**Request body:** [survey object](#survey-object)

NOTE: Only send properties that have been changed. Undefined properties will not
be overwritten.

## Responses

```
api/responses
  GET
    200 OK return all responses where user=current or session=current
  POST (response object)
    201 CREATED create a response and return it
    400 BAD REQUEST if invalid input
  PUT/PATCH/DELETE
    405 METHOD NOT ALLOWED

api/responses/:response
  GET
    200 OK return a response object
    404 NOT FOUND if a response does not exist
    401 UNAUTHORIZED if user!=current and session!=current
  PATCH (response object)
    200 OK only update part of the response
    400 BAD REQUEST if invalid input
    401 UNAUTHORIZED if user!=current user and session!=current session
  (?) DELETE
    200 OK delete the response
    404 NOT FOUND if a response does not exist
    401 UNAUTHORIZED if user!=current and session!=current
  PUT/POST
    405 METHOD NOT ALLOWED
```

### GET api/responses

**Response body:**

``` json
[
  <response object>,
  <response object>,
  <response object>,
  <response object>,
]
```

See [<response object>](#response-object).

### POST api/responses

**Request body:** [<response object>](#response-object)

**Response body:** [<response object>](#response-object)

### GET api/responses/:response

**Response body:** [<response object>](#response-object)

### PATCH api/responses/:response

**Request body:** [<response object>](#response-object)

NOTE: Only send properties that have been changed. Undefined properties will not
be overwritten.

## Users

```
api/users
  GET
    200 OK return all users
    401 UNAUTHORIZED if not authenticated
  POST
    201 CREATED create new user and return it
    400 BAD REQUEST if invalid input
    409 CONFLICT if the username already exists
  PUT/PATCH/DELETE
    405 METHOD NOT ALLOWED

api/users/:user
  GET
    200 OK return the user
    401 UNAUTHORIZED if not authenticated
    404 NOT FOUND if user does not exist
  PATCH
    200 OK only update part of the user
    400 BAD REQUEST if invalid input
    401 UNAUTHORIZED if user!=current
  DELETE
    200 OK log out and delete the user
    401 UNAUTHORIZED if not authenticated
    401 UNAUTHORIZED if user!=current
  PUT/POST
    405 METHOD NOT ALLOWED
```

### GET /users

``` json
[
  { "id": "58ee6904fdebd16dfdd99f94", name: "John Doe"},
  { "id": "58ee6904fdebd16dfdd99f95", name: "Jane Smith"}
]
```

### POST /users

**Request body:**

``` json
{
  name: "John Doe"
  password: "CorrectHorseBatteryStaple"
}
```

**Response body:**

``` json
{
  id: "58ee6904fdebd16dfdd99f94"
  name: "John Doe"
}
```



## Authentication

```
api/login
  POST (credentials)
    200 OK authenticate the user
    400 BAD REQUEST if invalid input
  GET/PUT/PATCH/DELETE
    405 METHOD NOT ALLOWED

api/logout
  POST
    200 OK remove user authentication
    401 UNAUTHORIZED if not authenticated
  GET/PUT/PATCH/DELETE
    405 METHOD NOT ALLOWED
```

### POST api/login

**Request body:**

``` json
{
  name: "John Doe"
  password: "CorrectHorseBatteryStaple"
}
```

**Response body:**

``` json
{
  id: "58ee6904fdebd16dfdd99f94"
  name: "John Doe"
}
```

### POST api/logout

**Request body:**  (empty)

## Objects

### User Object

``` json
{
  "id": "58ee6904fdebd16dfdd99f95",
  "name": "Jane Smith"
}
```

### Response Object

``` json
{
  "id": "58ee6904fdebd16dfdd99f91",
  "participant": "58ee6466aa8ac36d6d74fea3",
  "questions": [
    {
      "id": "58ee6466aa8ac36d6d74fe9f",
      "value": 10
    },
    {
      "id": "58ee6466aa8ac36d6d74fe9e",
      "value": "I love them with all my soul!!!"
    },
    {
      "id": "58ee63c65a2d576d5125b4c1",
      "values": ["58ee6466aa8ac36d6d74fe9a"]
    }
  ]
}
```

### Survey Object

``` json
{
  "id": "58ee63c65a2d576d5125b4c5",
  "owners": [
    "58ee63c65a2d576d5125b4c3",
    "58ee63c65a2d576d5125b4c2",
    "58ee63c65a2d576d5125b4c0"
  ],
  "title": "Example Survey",
  "questions": [
    {
      "id": "58ee6466aa8ac36d6d74fe9f",
      "type": "Scale",
      "required": false,
      "title": "How much do you like burritos?",
      "min": 0,
      "max": 10
      "labels": ["Not at All", "Somewhat", "Extremely"]
    },
    {
      "id": "58ee6466aa8ac36d6d74fe9e",
      "type": "Text",
      "required": false,
      "title": "Explain your rating.",
      "max": 1000
    },
    {
      "id": "58ee63c65a2d576d5125b4c1",
      type: "Select",
      required: false,
      title: "What is your favorite color?",
      options: [
        { "id": "58ee6466aa8ac36d6d74fe9a", "label": "Red"},
        { "id": "58ee6466aa8ac36d6d74fe9b", "label": "Green"},
        { "id": "58ee6466aa8ac36d6d74fe9c", "label": "Blue"}
      ]
    }
  ]
}
```
