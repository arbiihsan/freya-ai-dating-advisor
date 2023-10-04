# Rent-Room API Documentation

## Endpoints:
List Of Available Endpoints For Admin/Staff:
- `POST /register`
- `POST /login`
- `POST /glogin`

- `POST /fetch-answer`
- `POST /generate-qr`

## 1. POST /register
Description:
- Create New User and User's data

Request:
- body:

```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "phoneNumber": "string",
    "address": "string"
}
```

### Response (201 - Created)
```json
{
    "id": "integer",
    "email": "string"
}
```

### Response (400 - Bad Request)
```json
{
    "message": "email cannot be empty"
}
OR
{
    "message": "email cannot be null"
}
OR
{
    "message": "this email has been used"
}
OR
{
    "message": "email must be in email format"
}
OR
{
    "message": "password cannot be empty"
}
OR
{
    "message": "password cannot be null"
}
OR
{
    "message": "Minimum Password's Length is 5 Character"
}
```

## 2. POST /login
Description:
- login with created user's data

Request:
- body:

```json
{
    "email": "string",
    "password": "string"
}
```

### Response (200 - OK)
```json
{
    "access_token": "string",
    "username": "string"
}
```

### Response (400 - Bad Request)
```json
{
    "message": "email cannot be empty"
}
OR
{
    "message": "email cannot be null"
}
OR
{
    "message": "password cannot be empty"
}
OR
{
    "message": "password cannot be null"
}
```

### Response (401 - Unauthorized)
```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /fetch-answer
Description:
- Get response from openai API

Request:
- headers:

```json
{
  "access_token": "string"
}
```

### Response (200 - OK)
```json
{
    "answer" : "Hi! how can i assist you today?"
}
```

## Global Error

### Response (401 - Unauthorized)
```json
{
  "message": "Invalid token"
}
```

### Response (500 - Internal Server Error)
```json
{
  "message": "Internal server error"
}
```

