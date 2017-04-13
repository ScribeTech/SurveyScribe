# Server API

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

## Surveys

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
