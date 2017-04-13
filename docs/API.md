# Server API

## Surveys

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
    200 OK only update part of the survey (don't replace the whole thing)
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

## Responses

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

## Users

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

## Authentication

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
